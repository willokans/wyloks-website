import React from 'react';

export default function Loading() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center mb-12 animate-pulse">
          <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto mb-4" />
          <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto" />
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg animate-pulse">
              <div className="h-12 w-12 bg-gray-200 rounded-lg mb-6" />
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-20 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

        <div className="mt-20 text-center animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-6" />
          <div className="h-12 bg-gray-200 rounded-lg w-48 mx-auto" />
        </div>
      </div>
    </div>
  );
}
