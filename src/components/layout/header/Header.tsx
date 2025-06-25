'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ContentContainer } from '@/components/ui/content-container';
import env from '@/config/env';
import { cn } from '@/lib/utils';

import { DesktopMenu } from './DesktopMenu';
import { MobileMenu } from './MobileMenu';

export interface HeaderProps {}

export const Header = (props: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="relative z-10 w-full border-b border-solid bg-neutral-50/80">
      <ContentContainer
        className={cn(
          'flex h-16 items-center justify-between',
          isOpen && 'border-b border-solid'
        )}
      >
        <Link href="/" className="flex items-center gap-2 no-underline">
          <div className="size-8 rounded-lg bg-primary" />
          <span className="text-xl font-bold text-primary">
            {env.SITE_NAME}
          </span>
        </Link>

        <DesktopMenu />

        <Button
          variant="ghost"
          size="icon"
          className="flex items-center justify-center md:hidden"
          onClick={toggleMenu}
        >
          {isOpen ? <X className="!size-6" /> : <Menu className="!size-6" />}
        </Button>
      </ContentContainer>

      <MobileMenu isOpen={isOpen} />
    </header>
  );
};
