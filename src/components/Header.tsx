'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from './Navigation';

const Header: React.FC = () => {
  return (
    <header
      className="fixed w-full z-50"
      style={{
        backgroundColor: 'rgba(245,241,234,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="px-6 sm:px-14 lg:px-24">
        <div className="flex justify-between items-center h-16">
          <Link href="/" aria-label="Wyloks — home">
            <Image
              src="/logo.svg"
              alt="Wyloks"
              width={148}
              height={32}
              priority
              style={{ height: '32px', width: 'auto' }}
            />
          </Link>
          <Navigation />
        </div>
      </div>
      <div className="rule" />
    </header>
  );
};

export default Header;
