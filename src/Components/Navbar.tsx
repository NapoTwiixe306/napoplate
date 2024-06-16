// navbar.tsx
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
    <nav className="bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between w-full h-20 p-5 mx-auto">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-black dark:text-gray-100">JMCorp/Boilerplate</h1>
        </div>
        <div className="hidden space-x-6 md:flex">
          <Link href="/documentation">
            <span className="text-lg font-bold text-black cursor-pointer dark:text-gray-100">Documentation</span>
          </Link>
          <Link href="/figma">
            <span className="text-lg font-bold text-black cursor-pointer dark:text-gray-100">Figma</span>
          </Link>
        </div>
        <div className="items-center hidden space-x-4 md:flex">
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
            <Link href="/documentation">
              <span className="text-lg text-black cursor-pointer dark:text-gray-100" onClick={() => setIsOpen(false)}>Documentation</span>
            </Link>
            <Link href="/figma">
              <span className="text-lg text-black cursor-pointer dark:text-gray-100" onClick={() => setIsOpen(false)}>Figma</span>
            </Link>
          </div>
          <div className="flex items-center justify-end p-5 space-x-4">
            <button onClick={toggleDarkMode}>{darkMode ? <FaSun className="w-6 h-6 text-black dark:text-gray-100" /> : <FaCat className="w-6 h-6 text-black dark:text-gray-100" />}</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
