import * as Switch from '@radix-ui/react-switch';
import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/components/common/theme-provider/theme-provider';

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  const isDarkTheme =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  const toggleTheme = (isDark: boolean) => {
    setTheme(isDark ? 'dark' : 'light');
  };

  return (
    <Switch.Root
      checked={isDarkTheme}
      onCheckedChange={toggleTheme}
      className="relative flex h-8 w-16 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
    >
      <Switch.Thumb asChild>
        <div className="absolute flex size-7 items-center justify-center rounded-full border bg-secondary shadow-md transition-transform duration-300 ease-in-out data-[state=checked]:translate-x-8">
          {isDarkTheme ? <Moon /> : <Sun />}
        </div>
      </Switch.Thumb>
    </Switch.Root>
  );
};
