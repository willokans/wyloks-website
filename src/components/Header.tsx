'use client';

import React from 'react';
import Link from 'next/link';
import Navigation from './Navigation';

const Header: React.FC = () => {
  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">Wyloks</span>
            <span className="text-xl sm:text-2xl font-light text-purple-600">Ltd</span>
          </Link>

          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header;