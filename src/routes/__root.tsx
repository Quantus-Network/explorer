import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { ExplorerDocumentMeta } from '@/components/common/seo/ExplorerDocumentMeta';
import { Footer } from '@/components/layout/footer/Footer';
import { Header } from '@/components/layout/header/Header';
import NotFound from '@/not-found';
import Providers from '@/providers';

export const Route = createRootRoute({
  // Renders inside <Outlet /> so Header/Footer stay visible
  notFoundComponent: NotFound,
  component: () => (
    <>
      <ExplorerDocumentMeta />

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
