import { useTranslations } from 'next-intl';

import OccasionRowActions from './occasion-row-actions';
import type { IOccasion } from '@/shared/lib/types/occasions';

type Props = {
  occasions: IOccasion[];
};

export default function OccasionsTable({ occasions }: Props) {
  // Translation
  const t = useTranslations('dashboard.occasions.table');

  return (
    <div className="border-ds-border-muted w-full overflow-x-auto rounded-lg border">
      <table className="w-full min-w-md table-fixed">
        <thead>
          <tr className="bg-ds-subtle border-ds-border-muted h-10 border-b">
            <th className="text-ds-text-plain px-5 text-start text-[13px] font-medium">
              {t('name')}
            </th>
            <th className="w-40 px-5">
              <span className="sr-only">{t('actions')}</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {occasions.map((occasion) => (
            <tr
              key={occasion.id}
              className="border-ds-border-muted hover:bg-ds-primary-fade h-15 border-b last:border-b-0"
            >
              <td className="text-ds-text-plain truncate px-5 text-sm font-semibold">
                {occasion.title}
              </td>

              <td className="px-5">
                <div className="flex items-center justify-end md:justify-start">
                  <OccasionRowActions occasionId={occasion.id} occasionTitle={occasion.title} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
