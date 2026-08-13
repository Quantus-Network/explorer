import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import { SEARCH_PREVIEW_RESULTS_LIMIT } from '@/constants/search-preview-results-limit';
import type { SearchAllResponse } from '@/schemas';
import type DataFetcher from '@/utils/fetcher';
import { getGqlString } from '@/utils/get-gql-string';

export type SearchShape = 'hex' | 'numeric' | 'text';

const EMPTY_SEARCH: SearchAllResponse = {
  transactions: [],
  accounts: [],
  blocks: [],
  highSecuritySets: [],
  errorEvents: []
};

/** Classify search input so we only hit the indexed fields for that shape. */
export function classifySearchKeyword(oriKeyword: string): SearchShape {
  if (oriKeyword.startsWith('0x') || oriKeyword.startsWith('0X')) {
    return 'hex';
  }
  if (/^\d+$/.test(oriKeyword)) {
    return 'numeric';
  }
  return 'text';
}

export const getSearchVariables = (oriKeyword: string) => {
  const shape = classifySearchKeyword(oriKeyword);
  let keyword_number = -1;
  if (shape === 'numeric') {
    keyword_number = Number(oriKeyword);
  }

  let keyword = oriKeyword;
  if (shape === 'hex') {
    // Hashes are stored lowercase; case-sensitive _like needs a normalized prefix.
    keyword = oriKeyword.toLowerCase();
  }
  if (keyword.length > 0) {
    keyword = `${keyword}%`;
  }

  return {
    shape,
    keyword,
    keyword_number,
    limit: SEARCH_PREVIEW_RESULTS_LIMIT
  };
};

/** Only include variables declared by the query for this shape. */
function graphqlVariablesForShape(
  variables: ReturnType<typeof getSearchVariables>
) {
  const { shape, keyword, keyword_number, limit } = variables;
  if (shape === 'numeric') {
    return { keyword, keyword_number, limit };
  }
  return { keyword, limit };
}

const SEARCH_HEX = gql`
  query SearchHex($keyword: String, $limit: Int) {
    transactions: unified_transaction(
      limit: $limit
      where: {
        _or: [{ hash: { _like: $keyword } }, { detail_id: { _like: $keyword } }]
      }
    ) {
      id
      type
      hash
      detail_id
      block {
        height
        hash
      }
    }
    blocks: block(limit: $limit, where: { hash: { _like: $keyword } }) {
      height
    }
    highSecuritySets: high_security_set(
      limit: $limit
      where: { extrinsic: { id: { _like: $keyword } } }
    ) {
      extrinsic {
        id
        pallet
        call
      }
    }
  }
`;

const SEARCH_NUMERIC = gql`
  query SearchNumeric($keyword: String, $keyword_number: Int, $limit: Int) {
    transactions: unified_transaction(
      limit: $limit
      where: { detail_id: { _like: $keyword } }
    ) {
      id
      type
      hash
      detail_id
      block {
        height
        hash
      }
    }
    blocks: block(limit: $limit, where: { height: { _eq: $keyword_number } }) {
      height
    }
  }
`;

const SEARCH_TEXT = gql`
  query SearchText($keyword: String, $limit: Int) {
    accounts: account(limit: $limit, where: { id: { _like: $keyword } }) {
      id
    }
    errorEvents: error_event(
      limit: $limit
      where: {
        _or: [
          { error_type: { _ilike: $keyword } }
          { error_name: { _ilike: $keyword } }
        ]
      }
    ) {
      extrinsic {
        id
        pallet
        call
      }
    }
  }
`;

function documentForShape(shape: SearchShape) {
  if (shape === 'hex') return SEARCH_HEX;
  if (shape === 'numeric') return SEARCH_NUMERIC;
  return SEARCH_TEXT;
}

function operationNameForShape(shape: SearchShape) {
  if (shape === 'hex') return 'SearchHex';
  if (shape === 'numeric') return 'SearchNumeric';
  return 'SearchText';
}

function normalizeSearchResponse(
  data: Partial<SearchAllResponse> | null | undefined
): SearchAllResponse {
  return {
    transactions: data?.transactions ?? [],
    accounts: data?.accounts ?? [],
    blocks: data?.blocks ?? [],
    highSecuritySets: data?.highSecuritySets ?? [],
    errorEvents: data?.errorEvents ?? []
  };
}

function searchQueryData(
  data: SearchAllResponse | undefined,
  keyword: string
): SearchAllResponse | undefined {
  if (data) return normalizeSearchResponse(data);
  if (keyword) return EMPTY_SEARCH;
  return undefined;
}

export const search = (fetcher: DataFetcher) => ({
  all: () => {
    return {
      query: async (keyword: string) => {
        const variables = getSearchVariables(keyword);
        const document = documentForShape(variables.shape);
        const result = await fetcher.graphql<Partial<SearchAllResponse>>(
          {
            query: getGqlString(document),
            variables: graphqlVariablesForShape(variables),
            operationName: operationNameForShape(variables.shape)
          },
          {
            retries: 0
          }
        );

        return {
          ...result,
          data: normalizeSearchResponse(result.data)
        };
      },
      useQuery: (
        keyword: string,
        config?: QueryHookOptions<SearchAllResponse>
      ) => {
        const variables = getSearchVariables(keyword);
        const document = documentForShape(variables.shape);
        const result = useQuery<SearchAllResponse>(document, {
          ...config,
          variables: graphqlVariablesForShape(variables)
        } as QueryHookOptions<SearchAllResponse>);

        return {
          ...result,
          data: searchQueryData(result.data, keyword)
        };
      }
    };
  }
});
