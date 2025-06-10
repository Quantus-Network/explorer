import type { MetadataRoute } from 'next';

import metadata from '@/config/metadata';
import env from '@/config/env';

export default function manifest(): MetadataRoute.Manifest {
  const description = metadata.description!;

  return {
    name: env.SITE_NAME,
    short_name: env.SITE_SHORT_NAME,
    description,
    start_url: '/',
    scope: '/',
    id: env.SITE_SHORT_NAME,
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    theme_color: '#FFEF00',
    background_color: '#F1F1F1',
    display: 'standalone'
  };
}
