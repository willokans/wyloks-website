'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { type ServiceProps } from '@/types/services';
import ServiceCard from './services/ServiceCard';
import ServicesHero from './services/ServicesHero';
import { getServices } from './services/ServicesList';

export default function ServicesContent() {
  const [services, setServices] = useState<ServiceProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices().then(data => {
      setServices(data);
      setLoading(false);
    }).catch(error => {
      console.error('Failed to load services:', error);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--cream)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ServicesHero />

        <div className="py-16 lg:py-20">
          {loading ? (
            <div className="flex justify-center py-20">
              <div
                className="h-7 w-7 animate-spin rounded-full border-2"
                style={{ borderColor: 'rgba(22,18,11,0.1)', borderTopColor: 'var(--terra)' }}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: 'rgba(22,18,11,0.08)' }}>
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  iconType={service.iconType}
                />
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mb-20">
          <div
            className="px-10 sm:px-16 py-16 text-center"
            style={{ backgroundColor: 'var(--ink-mid)' }}
          >
            <p className="label-tag mb-8" style={{ color: 'rgba(245,241,234,0.3)' }}>Let&apos;s talk</p>
            <h2
              className="display-section mb-10"
              style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: 'var(--cream)', fontFamily: 'var(--font-display)' }}
            >
              Ready to get started?
            </h2>
            <Link href="/contact" style={{ backgroundColor: 'var(--terra)', color: 'var(--cream)' }} className="btn-ink">
              Start the conversation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
