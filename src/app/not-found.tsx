import { routing } from '@/i18n/routing';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <html lang={routing.defaultLocale}>
      <body>
        <div className="bg-background flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="relative mb-8 select-none">
            <span className="text-[10rem] leading-none font-black tracking-tight text-rose-100 dark:text-rose-950">
              404
            </span>
            <span className="absolute inset-0 flex items-center justify-center text-[10rem] leading-none font-black tracking-tight text-rose-400/30 blur-sm">
              404
            </span>
          </div>

          <div className="mb-2 flex items-center gap-2">
            <span className="text-2xl">🌹</span>
            <h1 className="text-foreground text-2xl font-bold">Page Not Found</h1>
          </div>

          <p className="text-muted-foreground mb-10 max-w-md">
            Oops! The page you&apos;re looking for has wilted away. Let&apos;s get you back to the
            garden.
          </p>

          <Link
            href={`/${routing.defaultLocale}`}
            className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/30 transition-all hover:-translate-y-0.5 hover:bg-rose-600 hover:shadow-rose-600/40 active:translate-y-0"
          >
            🌸 Back to Home
          </Link>
        </div>
      </body>
    </html>
  );
}
