import { Headset, RefreshCw, ShieldCheck, Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Features() {
  const t = useTranslations('features');

  const features = [
    { key: 'freeDelivery', icon: <Truck size={40} strokeWidth={1} /> },
    { key: 'getRefund', icon: <RefreshCw size={40} strokeWidth={1} /> },
    { key: 'safePayment', icon: <ShieldCheck size={40} strokeWidth={1} /> },
    { key: 'support247', icon: <Headset size={40} strokeWidth={1} /> },
  ];

  return (
    <section>
      <div className="bg-ds-subtle grid grid-cols-2 gap-8 rounded-4xl p-4 md:p-8 lg:grid-cols-4 lg:p-10">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center justify-center gap-2">
            <div className="bg-ds-primary-saturated text-ds-text-inverse rounded-full p-3">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-ds-primary-saturated text-xl font-semibold">
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
