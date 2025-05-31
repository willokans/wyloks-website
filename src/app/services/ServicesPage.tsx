'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ServicesContent = dynamic(() => import('@/components/ServicesContent'), {
  ssr: true,
  loading: () => (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="space-y-8">
          <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto" />
          <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
                <div className="h-12 w-12 bg-gray-200 rounded-lg mb-6" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-20 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
});

const ServicesPage: React.FC = () => {
  return <ServicesContent />;
};

export default ServicesPage;
