import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { Navigation } from '@/components/ui/Navigation';
import { headers } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "SwipeTasks - Task Management Made Fun",
  description: "A Tinder-style task management app that makes productivity engaging and fun",
};

// Disable caching for this layout
export const revalidate = 0;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body>
        <Theme appearance="light" accentColor="blue" radius="large">
          <div className="pb-16 min-h-screen"> 
            {children}
          </div>
          <Navigation />
        </Theme>
      </body>
    </html>
  );
}
