import React from 'react';
import { ITConsultingIcon, SoftwareDevelopmentIcon, DigitalMarketingIcon } from '@/components/services/ServiceIcons';
import { type ServiceProps } from '@/types/services';

// Re-export the icons
export { ITConsultingIcon, SoftwareDevelopmentIcon, DigitalMarketingIcon };

export const SERVICE_ITEMS: ServiceProps[] = [
  {
    title: "IT Consultation",
    description: "Expert guidance for your technology needs and digital transformation journey.",
    iconType: "ITConsulting"
  },
  {
    title: "Software Development",
    description: "Custom software solutions built with modern technologies and best practices.",
    iconType: "SoftwareDevelopment"
  },
  {
    title: "Digital Marketing",
    description: "Strategic marketing solutions to boost your online presence and reach.",
    iconType: "DigitalMarketing"
  }
];
