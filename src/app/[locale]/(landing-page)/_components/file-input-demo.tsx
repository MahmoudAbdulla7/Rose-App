'use client';

import { FileInput } from '@/shared/ui/file-input';
import { useState } from 'react';

export function FileInputDemo() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="grid w-full grid-cols-4 items-center justify-center gap-2">
      <FileInput label="Label" value={file} onChange={setFile} accept="image/*" />
    </div>
  );
}
