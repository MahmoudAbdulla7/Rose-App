'use client';
import Link from 'next/link';
import type { LinkProps } from 'next/link';
import { useState, type AnchorHTMLAttributes } from 'react';

export interface HoveredLinkProps
  extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {}

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
