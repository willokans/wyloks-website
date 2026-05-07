'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/LoadingSpinner';
import { type ServiceItem } from '@/lib/constants';

type ServiceCardProps = ServiceItem;

// Dynamically import icons
const icons = {
  ITConsulting: dynamic(() => import('./ServiceIcons').then(mod => mod.ITConsultingIcon), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  SoftwareDevelopment: dynamic(() => import('./ServiceIcons').then(mod => mod.SoftwareDevelopmentIcon), {
    loading: () => <LoadingSpinner />,
    ssr: false
  }),
  DigitalMarketing: dynamic(() => import('./ServiceIcons').then(mod => mod.DigitalMarketingIcon), {
    loading: () => <LoadingSpinner />,
    ssr: false
  })
} as const;

export default function ServiceCard({ title, description, iconType }: ServiceCardProps) {
  const Icon = icons[iconType];

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow">
      <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
        <Icon />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
