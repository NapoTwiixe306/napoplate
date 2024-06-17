'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaSun, FaCat } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <nav className="bg-white border-b border-gray-300 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center justify-between w-full h-20 p-5 mx-auto">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-black dark:text-gray-100">JMCorp/Boilerplate</h1>
        </div>
        <div className="hidden space-x-6 md:flex">
          <Link href="/pages/Docs">
            <span className="text-lg font-bold text-black cursor-pointer dark:text-gray-100">Docs</span>
          </Link>
          <Link href="/pages/service">
            <span className="text-lg font-bold text-black cursor-pointer dark:text-gray-100">Service</span>
          </Link>
          <Link href="/pages/Price">
            <span className="text-lg font-bold text-black cursor-pointer dark:text-gray-100">Price</span>
          </Link>
        </div>
        <div className="items-center hidden space-x-4 md:flex">
          <div className="hidden space-x-6 md:flex">
            <Link href="/auth/signin">
              <span className="p-2 px-5 text-lg font-bold text-black border-2 rounded-full cursor-pointer dark:text-gray-100">Sign In</span>
            </Link>
            <Link href="/auth/register">
              <span className="p-2 px-5 text-lg font-bold text-white bg-black rounded-full cursor-pointer dark:text-black dark:bg-white">Sign Up</span>
            </Link>
          </div>
          <button onClick={toggleDarkMode}>{darkMode ? <FaSun className="w-6 h-6 text-black dark:text-gray-100" /> : <FaCat className="w-6 h-6 text-black dark:text-gray-100" />}</button>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-black dark:text-gray-100 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="bg-gray-100 dark:bg-gray-900 md:hidden">
          <div className="flex flex-col items-start p-5 space-y-2">
            <Link href="/pages/Docs">
              <span className="text-lg text-black cursor-pointer dark:text-gray-100" onClick={() => setIsOpen(false)}>Docs</span>
            </Link>
            <Link href="/pages/service">
            <span className="text-lg text-black cursor-pointer dark:text-gray-100" onClick={() => setIsOpen(false)}>Service</span>
            </Link>
            <Link href="/pages/Price">
              <span className="text-lg text-black cursor-pointer dark:text-gray-100" onClick={() => setIsOpen(false)}>Price</span>
            </Link>
          </div>
          <div className="flex flex-col items-start p-5 space-y-2">
            <Link href="/auth/signin">
              <span className="text-lg text-black cursor-pointer dark:text-gray-100" onClick={() => setIsOpen(false)}>Sign In</span>
            </Link>
            <Link href="/auth/register">
              <span className="text-lg text-black cursor-pointer dark:text-gray-100" onClick={() => setIsOpen(false)}>Sign Up</span>
            </Link>
          </div>
          <div className="flex items-center justify-start p-5 space-x-4">
            <button onClick={toggleDarkMode}>{darkMode ? <FaSun className="w-6 h-6 text-black dark:text-gray-100" /> : <FaCat className="w-6 h-6 text-black dark:text-gray-100" />}</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
