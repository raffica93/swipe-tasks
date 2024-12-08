import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { Navigation } from '@/components/ui/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "SwipeTasks - Task Management Made Fun",
  description: "A Tinder-style task management app that makes productivity engaging and fun",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Theme appearance="light" accentColor="blue" radius="large">
          <div className="pb-16"> 
            {children}
          </div>
          <Navigation />
        </Theme>
      </body>
    </html>
  );
}
