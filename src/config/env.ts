const env = {
  SITE_NAME: 'Start Next.js',
  SITE_SHORT_NAME: 'SN.js',
  SITE_BASE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? '',
  GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL ?? ''
};

export default env;
