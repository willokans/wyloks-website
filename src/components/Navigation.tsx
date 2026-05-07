'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routes = [
  { name: 'Home',     path: '/' },
  { name: 'About',    path: '/about' },
  { name: 'Services', path: '/services' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-8">
      {/* Desktop */}
      <div className="hidden lg:flex items-center gap-8">
        {routes.map((r) => (
          <Link
            key={r.path}
            href={r.path}
            className={`nav-link${pathname === r.path ? ' active' : ''}`}
          >
            {r.name}
          </Link>
        ))}
        <Link
          href="/contact"
          className="btn-ink"
          style={{ padding: '0.45rem 1.25rem', fontSize: '0.75rem' }}
        >
          Contact
        </Link>
      </div>

      {/* Mobile toggle */}
      <button
        type="button"
        className="lg:hidden p-1"
        style={{ color: 'var(--ink-soft)' }}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Toggle menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open
            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      {/* Mobile drawer */}
      {open && (
        <div
          className="lg:hidden absolute top-[65px] left-0 right-0 px-6 py-6 flex flex-col gap-5"
          style={{ backgroundColor: 'var(--cream)', borderBottom: '1px solid var(--border)' }}
        >
          {routes.map((r) => (
            <Link
              key={r.path}
              href={r.path}
              className={`nav-link${pathname === r.path ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {r.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-ink self-start"
            style={{ padding: '0.6rem 1.5rem', fontSize: '0.75rem' }}
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
