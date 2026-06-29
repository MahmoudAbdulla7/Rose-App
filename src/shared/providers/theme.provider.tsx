'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

import type { ThemeProviderProps } from 'next-themes';

/**
 * ThemeProvider — wraps the app to enable light/dark/system theme switching.
 *
 * Built on top of `next-themes`. It writes the active theme to the
 * `data-theme` attribute on the `<html>` element so CSS can react to it.
 *
 * Defaults:
 * - `attribute="data-theme"` — theme is applied as `<html data-theme="...">`.
 * - `defaultTheme="system"` — follows the OS preference until the user picks one.
 * - `enableSystem` — allows the "system" theme option.
 * - `disableTransitionOnChange` — prevents color-flash/transition when switching.
 *
 * Place this near the root (e.g. in `layout.tsx`) so every page can read the theme.
 *
 * @param children - The app tree that should have access to the theme context.
 * @param props - Any other `next-themes` `ThemeProviderProps` (override the defaults above).
 *
 * @example
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 */
export default function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      // Execute the theme script on the server only.
      // On the client, use `text/plain` to prevent React 19 / Next 16 warnings.
      // Hydration mismatch is handled by `suppressHydrationWarning`.
      scriptProps={{ type: typeof window === 'undefined' ? 'text/javascript' : 'text/plain' }}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
