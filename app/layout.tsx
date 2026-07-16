import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400','500','700'],
  variable: '--font-orbitron',
});

export const metadata: Metadata = {
  title: 'RollingRover Productions',
  description: 'Web Design & Digital Experiences from the South African Bush',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${orbitron.variable} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
