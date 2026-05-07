'use client';

import React from 'react';
import Link from 'next/link';
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
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 600,
              fontSize: '1.35rem',
              color: 'var(--ink)',
              letterSpacing: '-0.01em',
              textDecoration: 'none',
            }}
          >
            Wyloks<span style={{ color: 'var(--terra)' }}>.</span>
          </Link>
          <Navigation />
        </div>
      </div>
      <div className="rule" />
    </header>
  );
};

export default Header;
