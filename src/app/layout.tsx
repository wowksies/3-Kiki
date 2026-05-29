import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import './globals.css';

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: '3 Kirwan · Three years at Coláiste na Mí',
  description:
    'A celebration of three years of Junior Cycle at Coláiste na Mí — class photos, memories, and everything in between.',
  openGraph: {
    title: '3 Kirwan · Three years at Coláiste na Mí',
    description: 'Three years of Junior Cycle, told in photos.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#070713] font-sans text-white">{children}</body>
    </html>
  );
}
