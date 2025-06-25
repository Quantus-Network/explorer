import DataFetcher from '@/utils/fetcher';

import env from './env';

const fetchClient = new DataFetcher(env.GRAPHQL_URL);

export default fetchClient;
