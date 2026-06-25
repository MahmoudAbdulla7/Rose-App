import '@/app/globals.css';

import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props): ReactNode {
  return children;
}
