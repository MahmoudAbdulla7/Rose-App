'use client';
import { Link } from '@/i18n/navigation';
import { useState, type ComponentProps } from 'react';

export type HoveredLinkProps = ComponentProps<typeof Link>;

export default function HoveredLink({ href, children, ...props }: HoveredLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      prefetch={isHovered ? undefined : false}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </Link>
  );
}
