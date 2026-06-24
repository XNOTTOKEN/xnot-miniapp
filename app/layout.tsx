import './style.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'XNOT Mini App',
  description: 'XNOT holder growth mini app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ko"><body>{children}</body></html>;
}
