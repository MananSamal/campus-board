import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CampusBoard — Your campus, in one place',
  description: 'A collaborative college notice board for students and campus communities.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
