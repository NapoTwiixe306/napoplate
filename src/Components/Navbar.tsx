"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRight, FaSun, FaMoon } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className=" bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between w-full h-20 p-5 mx-auto">
        <div className="flex items-center">
          <h1 className="flex gap-2 space-x-2 text-2xl font-bold text-black dark:text-gray-100">
            DSM
          </h1>
        </div>

        <div className="items-center hidden space-x-6 md:flex">
          <ul className="flex space-x-6">
            <li>
              <Link href="/pages/Price">
                <span className="text-lg font-bold text-black cursor-pointer dark:text-gray-100">
                  Price
                </span>
              </Link>
            </li>
            <li>
              <Link href="pages/Dashboard">
                <span className="text-lg font-bold text-black cursor-pointer dark:text-gray-100">
                  Dashboard
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden gap-10 lg:flex">
          
          <button onClick={toggleDarkMode}>
            {darkMode ? (
              <FaSun className="w-6 h-6 text-black dark:text-gray-100" />
            ) : (
              <FaMoon className="w-6 h-6 text-black dark:text-gray-100" />
            )}
          </button>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-black dark:text-gray-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="bg-gray-100 dark:bg-gray-900 md:hidden">
          <ul className="flex flex-col items-start p-5 space-y-2">
            <li>
              <Link href="/pages/Docs">
                <span
                  className="text-lg text-black cursor-pointer dark:text-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Price
                </span>
              </Link>
            </li>
            <li>
              <Link href="pages/Dashboard">
                <span
                  className="text-lg text-black cursor-pointer dark:text-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </span>
              </Link>
            </li>
          </ul>
          <ul className="flex flex-col items-start p-5 space-y-2">
            <li>
              <Link href="/auth/signin">
                <span
                  className="text-lg text-black cursor-pointer dark:text-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
