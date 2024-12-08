import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import '@radix-ui/themes/styles.css';
import "./globals.css";
import { Theme } from '@radix-ui/themes';
import { Navigation } from '@/components/ui/Navigation';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

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
        <link rel="preload" href={inter.url} as="font" crossOrigin="" />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <Theme appearance="light" accentColor="blue" radius="large" className="min-h-screen">
          <div className="pb-16"> 
            {children}
          </div>
          <Navigation />
        </Theme>
      </body>
    </html>
  );
}
