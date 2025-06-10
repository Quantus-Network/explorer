import type { Metadata } from 'next';

import env from './env';

const siteName = env.SITE_NAME;
const title = {
  template: `%s | ${siteName}`,
  default: `${siteName}` // a default is required when creating a template
};
const description = 'Site description'; // TODO: update meta description
const images = {
  url: `${env.SITE_BASE_URL}/images/next.svg`,
  alt: siteName,
  width: 226,
  height: 100
};

const metadata: Metadata = {
  title,
  metadataBase: new URL(env.SITE_BASE_URL),
  description,
  alternates: {
    canonical: env.SITE_BASE_URL
  },
  icons: {
    apple: '/apple-touch-icon.png'
  },
  openGraph: {
    title: siteName,
    description,
    url: env.SITE_BASE_URL,
    siteName,
    images,
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    title,
    description,
    images,
    card: 'summary_large_image'
  }
};

export default metadata;
