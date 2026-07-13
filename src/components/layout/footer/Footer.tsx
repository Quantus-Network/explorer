import { Copyright } from './Copyright';

export interface FooterProps {}

export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-border-subtle px-6 py-4 text-center font-mono text-[11px] text-muted-text-2">
      <Copyright />
    </footer>
  );
};
