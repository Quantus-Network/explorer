import './globals.css';

import { Footer } from '@/components/layout/footer/Footer';
import { Header } from '@/components/layout/header/Header';
import { inter, jetBrains } from '@/config/font';
import defaultMetadata from '@/config/metadata';
import { cn } from '@/lib/utils';

import Providers from './providers';

export const metadata = defaultMetadata;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, inter.variable, jetBrains.variable)}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
