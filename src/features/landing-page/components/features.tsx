import { Headset, RefreshCw, ShieldCheck, Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Features() {
  const t = useTranslations('features');

  const features = [
    { key: 'freeDelivery', icon: <Truck className="size-6 sm:size-7" strokeWidth={1} /> },
    { key: 'getRefund', icon: <RefreshCw className="size-6 sm:size-7" strokeWidth={1} /> },
    { key: 'safePayment', icon: <ShieldCheck className="size-6 sm:size-7" strokeWidth={1} /> },
    { key: 'support247', icon: <Headset className="size-6 sm:size-7" strokeWidth={1} /> },
  ];

  return (
    <section>
      <div className="bg-ds-subtle grid grid-cols-2 gap-4 rounded-3xl p-3 sm:gap-6 sm:p-4 md:grid-cols-4 md:p-6 lg:gap-8 lg:rounded-4xl lg:p-10">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center justify-center gap-2">
            <div className="bg-ds-primary-saturated text-ds-text-inverse rounded-full p-2 sm:p-2.5 lg:p-3">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-ds-primary-saturated text-sm font-semibold sm:text-base lg:text-xl">
                {t(`${feature.key}.title`)}
              </h3>
              <p className="text-ds-text-soft text-sm">{t(`${feature.key}.description`)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
