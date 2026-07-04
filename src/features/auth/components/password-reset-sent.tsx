'use client';

import { Separator } from '@/shared/ui/separator';
import { useFormContext } from 'react-hook-form';

type PasswordResetSentProps = {
  instruction: string;
  spamHint: string;
};

export default function PasswordResetSent({ instruction, spamHint }: PasswordResetSentProps) {
  const { getValues } = useFormContext();
  const email = getValues('email');

  return (
    <>
      <p className="text-ds-info">{email || '-'}</p>
      <Separator className="mt-4 mb-6" />
      <p className="text-ds-text-plain mb-4">{instruction}</p>
      <p className="text-ds-text-default">{spamHint}</p>
    </>
  );
}
