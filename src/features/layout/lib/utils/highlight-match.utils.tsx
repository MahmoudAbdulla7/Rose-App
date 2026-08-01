import type { ReactNode } from 'react';

/** Highlights the first case-insensitive match of `query` inside `text`. */
export function highlightMatch(text: string, query: string): ReactNode {
  const trimmed = query.trim();
  if (!trimmed) return text;

  const lowerText = text.toLowerCase();
  const lowerQuery = trimmed.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) return text;

  const before = text.slice(0, index);
  const match = text.slice(index, index + trimmed.length);
  const after = text.slice(index + trimmed.length);

  return (
    <>
      {before}
      <mark className="bg-ds-primary-faint text-ds-primary-saturated rounded-sm px-0.5">
        {match}
      </mark>
      {after}
    </>
  );
}
