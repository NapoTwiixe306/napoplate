'use client'
import Link from 'next/link';
import { useState } from 'react';
import { FaSun, FaCat } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900">
      <div className="flex items-center justify-between w-full h-20 p-5 mx-auto">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-white">JMCorp/Boilerplate</h1>
        </div>
        <div className="hidden space-x-6 md:flex">
          <Link href="/documentation">
            <span className="text-lg font-bold text-white cursor-pointer">Documentation</span>
          </Link>
          <Link href="/figma">
            <span className="text-lg font-bold text-white cursor-pointer">Figma</span>
          </Link>
        </div>
        <div className="items-center hidden space-x-4 md:flex">
          <FaSun className="w-6 h-6 text-white" />
          <FaCat className="w-6 h-6 text-white" />
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="bg-gray-900 md:hidden">
          <div className="flex flex-col items-start p-5 space-y-2">
            <Link href="/documentation">
              <span className="text-lg text-white cursor-pointer" onClick={() => setIsOpen(false)}>Documentation</span>
            </Link>
            <Link href="/figma">
              <span className="text-lg text-white cursor-pointer" onClick={() => setIsOpen(false)}>Figma</span>
            </Link>
          </div>
          <div className="flex items-center justify-end p-5 space-x-4">
            <FaSun className="w-6 h-6 text-white" />
            <FaCat className="w-6 h-6 text-white" />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
