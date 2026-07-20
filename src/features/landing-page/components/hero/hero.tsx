import { getLandingPageOccasions } from '@/features/landing-page/lib/services/occasions.service';
import LoadErrorBoundary from '@/shared/components/load-error-boundary';
import { getLocale } from 'next-intl/server';

import Banner from './banner';
import Occasions from './occasions';
import { OCCASIONS_OPTIONS } from '@/shared/lib/apis/occasions/occasions.options';

export default function Hero() {
  return (
    <LoadErrorBoundary entity="occasions">
      <HeroContent />
    </LoadErrorBoundary>
  );
}

async function HeroContent() {
  const locale = await getLocale();
  const occasions = await getLandingPageOccasions({ locale });

  return (
    <div className="space-y-6.25">
      <Banner />
      <Occasions occasions={occasions?.slice(0, OCCASIONS_OPTIONS.HERO_LIMIT)} />
    </div>
  );
}
