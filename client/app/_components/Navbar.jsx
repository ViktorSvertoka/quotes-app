'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import navIcon from '@public/navIcon.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const MenuButton = () => (
    <button
      onClick={toggleMenu}
      className="ml-auto text-gray-800 dark:text-white focus:outline-none md:hidden"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
        />
      </svg>
    </button>
  );

  const menuItems = [
    { href: '/', text: 'Random' },
    { href: '/search', text: 'Search' },
    { href: '/quotes/create', text: 'Create New' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex items-center">
        <Link href="/">
          <div className="flex items-center gap-7">
            <Image
              className="ml-5 -m-2 w-16"
              src={navIcon}
              alt="Quotes App Icon"
            />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Quotes App
            </h1>
          </div>
        </Link>

        {/* Hamburger Button for Mobile */}
        <MenuButton />

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-3/4 transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-500 ease-in-out z-40 bg-gradient-to-r from-transparent to-white dark:from-transparent dark:to-gray-800`}
        >
          <div className="flex pr-5 pt-7 flex-col items-end justify-center space-y-6 text-2xl">
            <MenuButton />
            {menuItems.map((menuItem) => (
              <Link
                key={menuItem.text}
                href={menuItem.href}
                className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400"
                onClick={() => setIsOpen(false)}
              >
                {menuItem.text}
              </Link>
            ))}
          </div>
        </div>

        {/* Background Overlay for Mobile Menu */}
        {
          <div
            className={`${
              isOpen ? 'opacity-80 w-full' : 'opacity-0 w-0 '
            } transition-all duration-200 fixed h-full left-0 top-0 z-30 bg-black md:hidden`}
            onClick={toggleMenu}
          />
        }

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 pl-20 text-xl">
          {menuItems.map((menuItem) => (
            <Link
              key={menuItem.text}
              href={menuItem.href}
              className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400"
            >
              {menuItem.text}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
