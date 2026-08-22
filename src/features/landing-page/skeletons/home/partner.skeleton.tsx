import { PARTNER_LOGOS } from '@/features/landing-page/lib/constants/home/partner.constant';
import Skeleton from '@/shared/ui/skeleton';

export default function PartnerSkeleton() {
  return (
    <section className="w-full" aria-hidden="true">
      <div className="bg-maroon-50 space-y-10 rounded-[20px] px-6 py-10 dark:bg-zinc-700">
        <Skeleton className="mx-auto h-9 w-72 max-w-full rounded-md md:h-10" />

        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-10 xl:gap-x-18">
          {PARTNER_LOGOS.map((logo) => (
            <li key={logo.id} className="w-full">
              <Skeleton className="mx-auto h-12.75 w-full max-w-36.5 rounded-md" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
