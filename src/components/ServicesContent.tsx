'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { type ServiceItem } from '@/lib/constants.tsx';
import ServiceCard from './services/ServiceCard';
import ServicesHero from './services/ServicesHero';
import { getServices } from './services/ServicesList';

export default function ServicesContent() {
  const [services, setServices] = useState<ServiceItem[]>([]);
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
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <ServicesHero />

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full flex justify-center">
              <div className="animate-pulse text-lg">Loading services...</div>
            </div>
          ) : (
            services.map((service: ServiceItem) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                iconType={service.iconType}
              />
            ))
          )}
        </div>

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
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <ServicesHero />

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service: ServiceItem) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              iconType={service.iconType}
            />
          ))}
        </div>

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
      </div>
    </div>
  );
}