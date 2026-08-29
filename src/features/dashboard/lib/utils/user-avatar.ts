const AVATAR_FALLBACK_PALETTE = [
  { bg: 'bg-rose-100', text: 'text-rose-800' },
  { bg: 'bg-sky-100', text: 'text-sky-800' },
  { bg: 'bg-amber-100', text: 'text-amber-800' },
  { bg: 'bg-emerald-100', text: 'text-emerald-800' },
  { bg: 'bg-violet-100', text: 'text-violet-800' },
  { bg: 'bg-orange-100', text: 'text-orange-800' },
  { bg: 'bg-teal-100', text: 'text-teal-800' },
  { bg: 'bg-fuchsia-100', text: 'text-fuchsia-800' },
] as const;

/** Stable hash → palette index. Same seed always yields the same color. */
export function getAvatarFallbackColor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  const index = Math.abs(hash) % AVATAR_FALLBACK_PALETTE.length;
  return AVATAR_FALLBACK_PALETTE[index];
}

export function getUserInitials(firstName?: string | null, lastName?: string | null) {
  const first = firstName?.trim().charAt(0) ?? '';
  const last = lastName?.trim().charAt(0) ?? '';
  const initials = `${first}${last}`.toUpperCase();
  return initials || '?';
}
