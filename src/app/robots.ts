import type { MetadataRoute } from 'next';

import env from '@/config/env';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/*',
      disallow: ['/not-found', '/error']
    },
    sitemap: `${env.SITE_BASE_URL}/sitemap.xml`
  };
}
