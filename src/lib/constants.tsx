import React from 'react';
import { ITConsultingIcon, SoftwareDevelopmentIcon, DigitalMarketingIcon } from '@/components/services/ServiceIcons';

export type ServiceIconType = 'ITConsulting' | 'SoftwareDevelopment' | 'DigitalMarketing';

// Re-export the icons
export { ITConsultingIcon, SoftwareDevelopmentIcon, DigitalMarketingIcon };

export interface ServiceItem {
  title: string;
  description: string;
  iconType: ServiceIconType;
}

export const SERVICE_ITEMS: ServiceItem[] = [
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
