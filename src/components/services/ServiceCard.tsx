'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { type ServiceProps, type IconType } from '@/types/services';

const icons: Record<IconType, React.ComponentType> = {
  ITConsulting: dynamic(() => import('./ServiceIcons').then(mod => mod.ITConsultingIcon), { ssr: false }),
  SoftwareDevelopment: dynamic(() => import('./ServiceIcons').then(mod => mod.SoftwareDevelopmentIcon), { ssr: false }),
  DigitalMarketing: dynamic(() => import('./ServiceIcons').then(mod => mod.DigitalMarketingIcon), { ssr: false }),
};

const iconIndexMap: Record<IconType, string> = {
  ITConsulting: '01',
  SoftwareDevelopment: '02',
  DigitalMarketing: '03',
};

export default function ServiceCard({ title, description, iconType }: ServiceProps) {
  const Icon = icons[iconType];

  return (
    <div
      className="card-editorial group relative"
      style={{ cursor: 'default' }}
    >
      <div className="flex items-start justify-between mb-8">
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: '2rem',
            color: 'var(--terra)',
            lineHeight: 1,
          }}
        >
          {iconIndexMap[iconType]}
        </span>
        <div
          className="w-9 h-9 flex items-center justify-center"
          style={{ color: 'var(--ink-muted)' }}
        >
          <Icon />
        </div>
      </div>
      <h3 className="font-body font-semibold text-ink text-base mb-3">{title}</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--ink-muted)' }}>
        {description}
      </p>
    </div>
  );
}
