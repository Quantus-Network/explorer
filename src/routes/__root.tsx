import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import * as React from 'react';

import { SEO } from '@/components/common/seo/SEO';
import { Footer } from '@/components/layout/footer/Footer';
import { Header } from '@/components/layout/header/Header';
import Providers from '@/providers';

export const Route = createRootRoute({
  component: () => (
    <>
      <Providers>
        <SEO />

        <Header />

        <main>
          <Outlet />
        </main>

        <Footer />
      </Providers>

      <TanStackRouterDevtools />
    </>
  )
});
