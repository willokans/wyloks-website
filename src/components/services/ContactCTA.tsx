'use client';

import React from 'react';
import Link from 'next/link';

export default function ContactCTA() {
  return (
    <div className="mt-20 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Ready to Transform Your Business?
      </h2>
      <div className="mt-8">
        <Link
          href="/contact"
          className="inline-block rounded-lg bg-purple-600 px-6 py-3 text-lg font-medium text-white shadow-sm hover:bg-purple-700 transition-colors"
        >
          Get Started Today
        </Link>
      </div>
    </div>
  );
}
