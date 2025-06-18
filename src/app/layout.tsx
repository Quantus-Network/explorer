import './globals.css';

import { Footer } from '@/components/layout/footer/Footer';
import { Header } from '@/components/layout/header/Header';
import { inter } from '@/config/font';
import defaultMetadata from '@/config/metadata';

import Providers from './providers';

export const metadata = defaultMetadata;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
