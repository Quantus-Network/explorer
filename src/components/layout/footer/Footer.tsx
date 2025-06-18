'use client';

import { Copyright } from './Copyright';

export interface FooterProps {}

export const Footer = () => {
  return (
    <footer className="mt-auto flex items-center justify-center py-12">
      <Copyright />
    </footer>
  );
};
