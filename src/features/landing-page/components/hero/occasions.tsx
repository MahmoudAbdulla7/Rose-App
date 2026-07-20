import { Link } from '@/i18n/navigation';
import type { IOccasion } from '@/shared/lib/types/occasions';
import { Badge } from '@/shared/ui/badge';
import Image from 'next/image';

type OccasionsProps = {
  occasions: IOccasion[];
};

export default function Occasions({ occasions }: OccasionsProps) {
  if (!occasions?.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {occasions.map((occasion) => (
        <Link
          key={occasion.id}
          href={`/products?occasion=${occasion.id}`}
          aria-label={occasion.title}
        >
          <div className="relative aspect-4/3 size-full overflow-hidden rounded-4xl sm:aspect-1.5/1">
            <Image src={occasion.image} alt={occasion.title} fill className="z-0 object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 from-0% via-15% to-transparent to-80%" />
            <div className="absolute bottom-0 left-0 space-y-2 p-4 sm:space-y-2.5 sm:p-6">
              <Badge className="bg-maroon-50 text-maroon-600">{occasion.title}</Badge>
              <h2 className="line-clamp-2 text-xl font-semibold sm:text-2xl">
                {occasion.description}
              </h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
