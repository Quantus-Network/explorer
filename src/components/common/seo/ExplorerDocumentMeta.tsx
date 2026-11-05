import { useLocation } from '@tanstack/react-router';

import env from '@/config/env';
import { indexableMeta } from '@/lib/indexing-policy';

import { SEO } from './SEO';

export function ExplorerDocumentMeta() {
  const { pathname } = useLocation();
  const meta = indexableMeta(pathname, env.SITE_BASE_URL);

  if (!meta) {
    return <SEO noIndex />;
  }

  return (
    <SEO
      title={meta.shortTitle}
      canonical={meta.canonical}
      openGraph={{ url: meta.canonical }}
    />
  );
}
