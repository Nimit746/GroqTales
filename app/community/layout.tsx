import Link from 'next/link';
import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { metadata } from './metadata';

export { metadata };

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold gradient-heading px-2 sm:px-0">Community</h1>
        <div className="flex bg-muted/50 p-1 rounded-lg w-full sm:w-auto">
          <Link href="/community" className="flex-1 sm:flex-none">
            <div className="px-3 sm:px-4 py-2 rounded-md hover:bg-background text-center text-xs sm:text-sm font-bold transition-all">
              Main Feed
            </div>
          </Link>
          <Link href="/community/creators" className="flex-1 sm:flex-none">
            <div className="px-3 sm:px-4 py-2 rounded-md hover:bg-background text-center text-xs sm:text-sm font-bold transition-all">
              Creators
            </div>
          </Link>
        </div>
      </div>

      {children}
    </div>
  );
}
