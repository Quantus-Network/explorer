const env = {
  SITE_NAME: 'Quantus Explorer',
  SITE_SHORT_NAME: 'QE',
  SITE_BASE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? '',
  GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL ?? ''
};

export default env;
