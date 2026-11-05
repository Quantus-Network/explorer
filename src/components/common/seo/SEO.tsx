import { useEffect } from 'react';

import { defaultMetadata } from '../../../config/metadata';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  noIndex?: boolean;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  };
  twitter?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export function SEO({
  title,
  description,
  canonical,
  noIndex = false,
  openGraph,
  twitter
}: SEOProps) {
  const finalTitle = title
    ? defaultMetadata.title.template.replace('%s', title)
    : defaultMetadata.title.default;

  const finalDescription = description || defaultMetadata.description;
  const finalCanonical = canonical;

  const ogTitle = openGraph?.title || title || defaultMetadata.openGraph.title;
  const ogDescription = openGraph?.description || finalDescription;
  const ogImage = openGraph?.image || defaultMetadata.images.url;
  const ogUrl = openGraph?.url || finalCanonical;

  const twitterTitle =
    twitter?.title || title || defaultMetadata.openGraph.title;
  const twitterDescription = twitter?.description || finalDescription;
  const twitterImage = twitter?.image || defaultMetadata.images.url;

  useEffect(() => {
    document.title = finalTitle;
    syncHeadLink('canonical', finalCanonical);
    syncMeta('property', 'og:url', ogUrl);
    syncMeta('name', 'robots', noIndex ? 'noindex' : undefined);
  }, [finalCanonical, finalTitle, noIndex, ogUrl]);

  return (
    <>
      {/* Basic Meta Tags */}
      <meta name="description" content={finalDescription} />

      {/* Apple Touch Icon */}
      <link rel="apple-touch-icon" href={defaultMetadata.icons.apple} />

      <meta property="og:type" content={defaultMetadata.openGraph.type} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:site_name" content={defaultMetadata.siteName} />
      <meta property="og:locale" content={defaultMetadata.openGraph.locale} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={defaultMetadata.images.alt} />
      <meta
        property="og:image:width"
        content={defaultMetadata.images.width.toString()}
      />
      <meta
        property="og:image:height"
        content={defaultMetadata.images.height.toString()}
      />

      {/* Twitter Card */}
      <meta name="twitter:card" content={defaultMetadata.twitter.card} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:image" content={twitterImage} />

      {/* Font Preload */}
      {/* <link
        rel="preload"
        as="font"
        type="font/woff2"
        href={inter}
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        href={jetBrains}
        crossOrigin="anonymous"
      /> */}
    </>
  );
}

function syncHeadLink(rel: string, href: string | undefined) {
  const selector = `link[rel="${rel}"]`;
  const existing = document.head.querySelector<HTMLLinkElement>(selector);
  if (!href) {
    existing?.remove();
    return;
  }

  const link = existing ?? document.createElement('link');
  link.setAttribute('rel', rel);
  link.setAttribute('href', href);
  if (!existing) document.head.appendChild(link);
}

function syncMeta(
  attribute: 'name' | 'property',
  key: string,
  content: string | undefined
) {
  const selector = `meta[${attribute}="${key}"]`;
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  if (!content) {
    existing?.remove();
    return;
  }

  const meta = existing ?? document.createElement('meta');
  meta.setAttribute(attribute, key);
  meta.setAttribute('content', content);
  if (!existing) document.head.appendChild(meta);
}
