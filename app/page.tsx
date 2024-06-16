// page.tsx
'use client'
import React from 'react';
import './globals.css';
import Navbar from '@/src/Components/Navbar';
import Footer from '@/src/Components/Footer';

export default function Page() {
  return (
    <>
      <div>
        <div className="bg-white dark:bg-black">
          <Navbar />
          <h1 className="text-blue-500 dark:text-red-500">Hello World</h1>
        </div>
      </div>
    </>
  );
}
