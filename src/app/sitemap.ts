import type { MetadataRoute } from 'next';

import env from '@/config/env';

interface SiteMapParams {
  entity: { slug: string; updatedAt: string };
  path: string;
  priority?: number;
}

export const dynamic = 'force-dynamic';
// revalidate every day
export const revalidate = 24 * 60 * 60;

const createSiteMapEntry = ({
  entity,
  path,
  priority = 0.8
}: SiteMapParams) => ({
  url: `${env.SITE_BASE_URL}/${path}/${entity.slug}`,
  lastModified: new Date(entity.updatedAt),
  priority
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: env.SITE_BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    }
  ];
}
