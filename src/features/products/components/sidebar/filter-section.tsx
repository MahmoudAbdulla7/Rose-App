import type { HoveredLinkProps } from '@/shared/components/hovered-link';
import FilterClear from './filter-clear';

type FilterSectionProps = {
  title: string;
  clearLinkProps?: HoveredLinkProps & { text: string };
  children: React.ReactNode;
};

export default function FilterSection({ title, clearLinkProps, children }: FilterSectionProps) {
  const showClear = Boolean(clearLinkProps);

  return (
    <section className="flex flex-col gap-2.5 border-b border-zinc-100 py-2.5 pb-5 dark:border-zinc-800">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg leading-none font-semibold text-zinc-800 dark:text-zinc-100">
          {title}
        </h2>
        {showClear ? (
          <span className="animate-in fade-in-0 zoom-in-95 duration-200 ease-out">
            <FilterClear {...clearLinkProps!} />
          </span>
        ) : null}
      </div>
      {children}
    </section>
  );
}
