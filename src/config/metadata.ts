// src/lib/metadata.ts
import env from './env';

const siteName = env.SITE_NAME;
const baseUrl = env.SITE_BASE_URL;
const description = 'Site description'; // TODO: update meta description

export const defaultMetadata = {
  siteName,
  title: {
    template: `%s | ${siteName}`,
    default: siteName
  },
  description,
  baseUrl,
  canonical: baseUrl,
  images: {
    url: `${baseUrl}/images/next.svg`,
    alt: siteName,
    width: 226,
    height: 100
  },
  openGraph: {
    title: siteName,
    description,
    url: baseUrl,
    siteName,
    locale: 'en_US',
    type: 'website' as const
  },
  twitter: {
    card: 'summary_large_image' as const
  },
  icons: {
    apple: '/apple-touch-icon.png'
  }
};

// Helper function to generate page metadata
export function generatePageMetadata({
  title,
  description: pageDescription,
  canonical,
  openGraph,
  twitter,
  noIndex = false
}: {
  title?: string;
  description?: string;
  canonical?: string;
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
  noIndex?: boolean;
} = {}) {
  const finalTitle = title
    ? defaultMetadata.title.template.replace('%s', title)
    : defaultMetadata.title.default;

  const finalDescription = pageDescription || defaultMetadata.description;
  const finalCanonical = canonical || defaultMetadata.canonical;

  return {
    title: finalTitle,
    description: finalDescription,
    canonical: finalCanonical,
    noIndex,
    openGraph: {
      title: openGraph?.title || title || defaultMetadata.openGraph.title,
      description: openGraph?.description || finalDescription,
      url: openGraph?.url || finalCanonical,
      siteName: defaultMetadata.siteName,
      locale: defaultMetadata.openGraph.locale,
      type: defaultMetadata.openGraph.type,
      image: openGraph?.image || defaultMetadata.images.url
    },
    twitter: {
      title: twitter?.title || title || defaultMetadata.openGraph.title,
      description: twitter?.description || finalDescription,
      card: defaultMetadata.twitter.card,
      image: twitter?.image || defaultMetadata.images.url
    }
  };
}
