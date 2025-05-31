'use server';

import { SERVICE_ITEMS } from '@/lib/constants';

export async function getServices() {
  // Simulate async loading of services
  await new Promise((resolve) => setTimeout(resolve, 100));
  return SERVICE_ITEMS;
}
