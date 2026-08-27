import Skeleton from '@/shared/ui/skeleton';

export default function ComingSoonPageSkeleton() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-3 px-4 py-16" aria-hidden="true">
      <Skeleton className="h-8 w-48 rounded-md" />
      <Skeleton className="h-5 w-72 max-w-full rounded-md" />
    </section>
  );
}
