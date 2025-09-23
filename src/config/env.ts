const env = {
  SITE_NAME: 'Quantus Explorer',
  SITE_SHORT_NAME: 'QE',
  SITE_BASE_URL: import.meta.env.VITE_SITE_URL ?? '',
  GRAPHQL_URL: import.meta.env.VITE_GRAPHQL_URL ?? '',
  COIN_SYMBOL: 'QU'
};

export default env;
