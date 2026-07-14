'use client';
import { Link } from '@/i18n/navigation';
import { Badge } from '@/shared/ui/badge';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Occasions() {
  const t = useTranslations('hero.occasions');
  const occasions = t.raw('occasion') as Array<{
    image: string;
    title: string;
    badge: string;
    slug: string;
  }>;
  return (
    <div className="grid grid-cols-3 gap-5">
      {occasions.map((occasion, index) => (
        <Link key={index} href={`/products?occassion=${occasion.slug}`} aria-label={occasion.title}>
          <div className="relative aspect-1.5/1 size-full">
            <Image
              src={occasion.image}
              alt={occasion.title}
              fill
              className="z-0 rounded-4xl object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 from-0% via-15% to-transparent to-80%" />
            <div className="absolute bottom-0 left-0 space-y-2.5 p-6">
              <Badge className="bg-maroon-50 text-maroon-600">{occasion.badge}</Badge>
              <h2 className="text-2xl font-semibold">{occasion.title}</h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
