import LanguageSwitcherComponent from '@/shared/components/language-switcher';

export default function Header() {
  return (
    <header className="flex items-center justify-end">
      <LanguageSwitcherComponent />
    </header>
  );
}
