import { applyExplorerIndexing } from '../src/lib/indexing-policy';

interface PagesMiddlewareContext {
  request: Request;
  next: () => Promise<Response>;
}

export function onRequest(context: PagesMiddlewareContext): Promise<Response> {
  return applyExplorerIndexing(context.request.url, () => context.next());
}
