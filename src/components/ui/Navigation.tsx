'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, PersonIcon, TargetIcon } from '@radix-ui/react-icons';

export const Navigation = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around items-center">
          <Link
            href="/"
            className={`flex flex-col items-center p-2 ${
              isActive('/') ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>

          <Link
            href="/tasks"
            className={`flex flex-col items-center p-2 ${
              isActive('/tasks') ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <TargetIcon className="w-6 h-6" />
            <span className="text-xs mt-1">Tasks</span>
          </Link>

          <Link
            href="/dashboard"
            className={`flex flex-col items-center p-2 ${
              isActive('/dashboard') ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <PersonIcon className="w-6 h-6" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
