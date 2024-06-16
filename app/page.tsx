// page.tsx
'use client'
import React from 'react';
import './globals.css';
import Navbar from '@/src/Components/Navbar';
import Badge from '@/src/Components/Badges/Badges';

export default function Page() {
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-900">
          <Navbar />
          <div className="p-5 ">
            <div className="flex flex-col items-center justify-center gap-5 mt-16">
              <Badge/>
              <h1 className='text-6xl font-semibold text-black dark:text-white'>Build your SaaS in seconds</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
