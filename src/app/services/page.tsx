import React, { Suspense } from 'react';
import { type Metadata } from 'next';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/LoadingSpinner';

// Use dynamic import with no SSR for the content component
const ServicesContent = dynamic(() => import('@/components/ServicesContent'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

export const metadata: Metadata = {
  title: 'Our Services | Wyloks',
  description: 'Explore our comprehensive IT consultation services, software development solutions, and digital marketing strategies.',
};

export default function ServicesPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ServicesContent />
    </Suspense>
  );
}
