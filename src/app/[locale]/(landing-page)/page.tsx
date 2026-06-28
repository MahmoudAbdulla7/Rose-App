import Header from '@/features/landing-page/components/header';
import ThemeToggle from '@/shared/components/theme-toggle';
import { Input } from '@/shared/ui/input';
import { SearchInput } from '@/shared/ui/search-input';
import { getTranslations } from 'next-intl/server';
export default async function LandingPage() {
  const t = await getTranslations('common');
  return (
    <>
      <Header />
      <h1 className="bg-ds-plain text-ds-text-plain ring-ds-ring-danger mx-10 my-10 rounded-lg ring">
        {t('landing-page.title')}
      </h1>
      <ThemeToggle />
      <div className="h-screen w-full p-4">
        {/* text input */}
        <div className="mt-4 grid w-full grid-cols-4 items-center justify-center gap-2">
          <Input label="Label" placeholder="Placeholder" />
        </div>
        {/* search input */}
        <div className="mt-4 grid w-full grid-cols-4 items-center justify-center gap-2">
          <SearchInput label="Label" placeholder="Search..." />
        </div>
        {/* number input */}
        <div className="mt-4 grid w-full grid-cols-4 items-center justify-center gap-2">
          <Input label="Label" placeholder="Placeholder" type="number" />
        </div>

        {/* file input */}
        <div className="w-full">
          <FileInputDemo />
        </div>
        {/* phone input */}
        <div className="mt-4 grid w-full grid-cols-4 items-center justify-center gap-2">
          <PhoneInput label="Label" placeholder="Placeholder" defaultCountry="EG" />
        </div>
        {/* input OTP */}
        <div className="mt-4 grid w-full grid-cols-4 items-center justify-center gap-2">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              {Array.from({ length: 6 }).map((_, i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* password input */}
        <div className="mt-4 grid w-full grid-cols-4 items-center justify-center gap-2">
          <PasswordInput label="Label" placeholder="Placeholder" />
        </div>
      </div>
    </>
  );
}
