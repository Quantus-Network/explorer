import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { SEO } from '@/components/common/seo/SEO';
import { Footer } from '@/components/layout/footer/Footer';
import { Header } from '@/components/layout/header/Header';
import NotFound from '@/not-found';
import Providers from '@/providers';

export const Route = createRootRoute({
  // Renders inside <Outlet /> so Header/Footer stay visible
  notFoundComponent: NotFound,
  component: () => (
    <>
      <SEO />

      <Providers>
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
