import { GALLERY_COLUMNS } from '@/features/landing-page/lib/constants/home/gallery.constant';
import Skeleton from '@/shared/ui/skeleton';

export default function GallerySkeleton() {
  return (
    <section className="w-full" aria-hidden="true">
      <Skeleton className="h-9 w-48 rounded-md" />

      <div className="mt-10 w-full columns-1 gap-3.5 sm:columns-2 lg:columns-3">
        {GALLERY_COLUMNS.flat().map((image) => (
          <Skeleton
            key={image.id}
            className="mb-3.5 block w-full break-inside-avoid rounded-none"
          // style={{ aspectRatio: image.aspect }}
          />
        ))}
      </div>
    </section>
  );
}
