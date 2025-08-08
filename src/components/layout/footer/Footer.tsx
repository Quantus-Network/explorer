import { Copyright } from './Copyright';

export interface FooterProps {}

export const Footer = () => {
  return (
    <footer className="mt-auto flex items-center justify-center px-4 py-12">
      <Copyright className="text-center" />
    </footer>
  );
};
