// Types and Interfaces
export interface DataFetcherOptions extends Omit<RequestInit, 'signal'> {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  retryDelayMultiplier?: number;
  retryOn?: number[];
  retryCondition?: (response: Response, error?: Error) => boolean;
  signal?: AbortSignal;
}

export interface DefaultOptions {
  timeout: number;
  retries: number;
  retryDelay: number;
  retryDelayMultiplier: number;
  retryOn: number[];
  retryCondition: ((response: Response, error?: Error) => boolean) | null;
}

export type HTTPMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'HEAD'
  | 'OPTIONS';

export interface GraphQLRequest<T = any> {
  query: string;
  variables?: T;
  operationName?: string;
}

export interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: Array<string | number>;
    extensions?: Record<string, any>;
  }>;
  extensions?: Record<string, any>;
}

// Custom Error Classes
export class FetchError extends Error {
  public readonly response: Response | null;

  public readonly code: string | null;

  constructor(
    message: string,
    response: Response | null = null,
    code: string | null = null
  ) {
    super(message);
    this.name = 'FetchError';
    this.response = response;
    this.code = code;

    // Maintain proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }
  }
}

export class TimeoutError extends FetchError {
  public readonly timeout: number;

  constructor(timeout: number) {
    super(`Request timed out after ${timeout}ms`, null, 'TIMEOUT');
    this.name = 'TimeoutError';
    this.timeout = timeout;
  }
}

export class AbortError extends FetchError {
  constructor() {
    super('Request was aborted', null, 'ABORTED');
    this.name = 'AbortError';
  }
}

export class RetryError extends FetchError {
  public readonly attempts: number;

  public readonly lastError: Error;

  constructor(attempts: number, lastError: Error) {
    super(
      `Request failed after ${attempts} attempts. Last error: ${lastError.message}`,
      null,
      'MAX_RETRIES_EXCEEDED'
    );
    this.name = 'RetryError';
    this.attempts = attempts;
    this.lastError = lastError;
  }
}

class DataFetcher {
  private readonly baseUrl: string;

  private readonly defaults: DefaultOptions;

  constructor(baseUrl: string, defaultOptions: Partial<DefaultOptions> = {}) {
    this.baseUrl = baseUrl;
    this.defaults = {
      timeout: 10000, // 10 seconds
      retries: 3,
      retryDelay: 2000, // 2 second
      retryDelayMultiplier: 2,
      retryOn: [408, 429, 500, 502, 503, 504], // HTTP status codes to retry on
      retryCondition: null, // Custom retry condition function
      ...defaultOptions
    };
  }

  /**
   * Helper for forming request body
   */
  private _formRequestBody(data: any): string {
    if (typeof data === 'string') return data;

    return JSON.stringify(data);
  }

  /**
   * Enhanced fetch with abort, timeout, and retry capabilities
   */
  async fetch(
    resourceUrl: string = '',
    options: DataFetcherOptions = {}
  ): Promise<Response> {
    const url = `${this.baseUrl}${resourceUrl}`;
    const config = { ...this.defaults, ...options };
    const {
      timeout,
      retries,
      retryDelay,
      retryDelayMultiplier,
      retryOn,
      retryCondition,
      signal,
      ...fetchOptions
    } = config;

    // Create abort controller if not provided
    const requestSignal = signal || new AbortController().signal;

    let lastError: Error | null = null;
    let attempt = 0;

    while (attempt <= retries) {
      try {
        const response = await this._fetchWithTimeout(
          url,
          { ...fetchOptions, signal: requestSignal },
          timeout
        );

        // Check if we should retry based on status code or custom condition
        if (
          attempt < retries &&
          this._shouldRetry(response, retryOn, retryCondition)
        ) {
          throw new FetchError(
            `HTTP ${response.status}: ${response.statusText}`,
            response,
            'HTTP_ERROR'
          );
        }

        return response;
      } catch (error) {
        lastError = error as Error;
        attempt++;

        // Don't retry on abort or if we've exhausted attempts
        if ((error as Error).name === 'AbortError' || attempt > retries) {
          break;
        }

        // Don't retry if it's not a retryable error
        if (!this._shouldRetryError(error as Error, retryOn, retryCondition)) {
          break;
        }

        // Wait before retrying (exponential backoff)
        if (attempt <= retries) {
          const delay = retryDelay * retryDelayMultiplier ** (attempt - 1);
          await this._delay(delay);
        }
      }
    }

    // If we got here, we've exhausted all retries
    if (attempt > retries && lastError) {
      throw new RetryError(retries, lastError);
    }

    throw (
      lastError ?? new FetchError('Unknown fetch error', null, 'UNKNOWN_ERROR')
    );
  }

  /**
   * Fetch with timeout functionality
   */
  private async _fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeout: number
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    // If there's already a signal, we need to listen to both
    if (options.signal) {
      const originalSignal = options.signal;
      if (originalSignal.aborted) {
        clearTimeout(timeoutId);
        throw new AbortError();
      }

      const abortHandler = () => {
        clearTimeout(timeoutId);
        controller.abort();
      };

      originalSignal.addEventListener('abort', abortHandler, { once: true });

      // Clean up the listener when we're done
      const cleanup = () =>
        originalSignal.removeEventListener('abort', abortHandler);
      controller.signal.addEventListener('abort', cleanup, { once: true });
    }

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);

      if ((error as Error).name === 'AbortError') {
        // Check if this was a timeout or user abort
        if (
          controller.signal.aborted &&
          options.signal &&
          !options.signal.aborted
        ) {
          throw new TimeoutError(timeout);
        }
        throw new AbortError();
      }

      throw error;
    }
  }

  /**
   * Check if we should retry based on response
   */
  private _shouldRetry(
    response: Response,
    retryOn: number[],
    retryCondition: ((response: Response, error?: Error) => boolean) | null
  ): boolean {
    if (retryCondition && typeof retryCondition === 'function') {
      return retryCondition(response);
    }

    return retryOn.includes(response.status);
  }

  /**
   * Check if we should retry based on error
   */
  private _shouldRetryError(
    error: Error,
    retryOn: number[],
    retryCondition: ((response: Response, error?: Error) => boolean) | null
  ): boolean {
    if (error.name === 'AbortError') return false;
    if (error.name === 'TimeoutError') return true;

    if (error instanceof FetchError && error.response) {
      return this._shouldRetry(error.response, retryOn, retryCondition);
    }

    // For network errors, use retry condition if provided
    if (retryCondition) {
      return retryCondition(null as any, error);
    }

    // Retry on network errors by default
    return true;
  }

  /**
   * Delay helper for retry backoff
   */
  private _delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  /**
   * Convenience method for GET requests
   */
  async get(
    url?: string,
    options: Omit<DataFetcherOptions, 'method' | 'body'> = {}
  ): Promise<Response> {
    return this.fetch(url, { ...options, method: 'GET' });
  }

  /**
   * Convenience method for POST requests
   */
  async post(
    url?: string,
    data?: any,
    options: Omit<DataFetcherOptions, 'method'> = {}
  ): Promise<Response> {
    const body = this._formRequestBody(data);
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    return this.fetch(url, {
      ...options,
      method: 'POST',
      body,
      headers
    });
  }

  /**
   * Convenience method for PUT requests
   */
  async put(
    url?: string,
    data?: any,
    options: Omit<DataFetcherOptions, 'method'> = {}
  ): Promise<Response> {
    const body = this._formRequestBody(data);
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    return this.fetch(url, {
      ...options,
      method: 'PUT',
      body,
      headers
    });
  }

  /**
   * Convenience method for PATCH requests
   */
  async patch(
    url?: string,
    data?: any,
    options: Omit<DataFetcherOptions, 'method'> = {}
  ): Promise<Response> {
    const body = this._formRequestBody(data);
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    return this.fetch(url, {
      ...options,
      method: 'PATCH',
      body,
      headers
    });
  }

  /**
   * Convenience method for DELETE requests
   */
  async delete(
    url?: string,
    options: Omit<DataFetcherOptions, 'method' | 'body'> = {}
  ): Promise<Response> {
    return this.fetch(url, { ...options, method: 'DELETE' });
  }

  /**
   * JSON response helper
   */
  async json<T = any>(
    url?: string,
    options: DataFetcherOptions = {}
  ): Promise<T> {
    const response = await this.fetch(url, options);

    if (!response.ok) {
      throw new FetchError(
        `HTTP ${response.status}: ${response.statusText}`,
        response,
        'HTTP_ERROR'
      );
    }

    return response.json();
  }

  /**
   * Text response helper
   */
  async text(url?: string, options: DataFetcherOptions = {}): Promise<string> {
    const response = await this.fetch(url, options);

    if (!response.ok) {
      throw new FetchError(
        `HTTP ${response.status}: ${response.statusText}`,
        response,
        'HTTP_ERROR'
      );
    }

    return response.text();
  }

  /**
   * GraphQL request helper
   */
  async graphql<T = any, U = any>(
    request: GraphQLRequest<U>,
    options: Omit<DataFetcherOptions, 'method' | 'body'> = {}
  ): Promise<GraphQLResponse<T>> {
    const response = await this.post('', request, {
      ...options,
      retryOn: [500, 502, 503, 504] // Only retry on server errors for GraphQL
    });

    if (!response.ok) {
      throw new FetchError(
        `GraphQL request failed: ${response.statusText}`,
        response,
        'GRAPHQL_HTTP_ERROR'
      );
    }

    const result: GraphQLResponse<T> = await response.json();

    if (result.errors && result.errors.length > 0) {
      throw new FetchError(
        `GraphQL errors: ${result.errors.map((e) => e.message).join(', ')}`,
        response,
        'GRAPHQL_ERROR'
      );
    }

    return result;
  }
}

export default DataFetcher;
