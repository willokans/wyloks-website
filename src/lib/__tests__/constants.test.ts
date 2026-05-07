import { SERVICE_ITEMS } from '@/lib/constants';

describe('SERVICE_ITEMS', () => {
  it('has exactly 3 services', () => {
    expect(SERVICE_ITEMS).toHaveLength(3);
  });

  it('every service has a non-empty title', () => {
    SERVICE_ITEMS.forEach(s => expect(s.title).toBeTruthy());
  });

  it('every service has a non-empty description', () => {
    SERVICE_ITEMS.forEach(s => expect(s.description).toBeTruthy());
  });

  it('every service has a valid iconType', () => {
    const validTypes = ['ITConsulting', 'SoftwareDevelopment', 'DigitalMarketing'];
    SERVICE_ITEMS.forEach(s => expect(validTypes).toContain(s.iconType));
  });

  it('contains IT Consultation', () => {
    expect(SERVICE_ITEMS.find(s => s.iconType === 'ITConsulting')).toBeDefined();
  });

  it('contains Software Development', () => {
    expect(SERVICE_ITEMS.find(s => s.iconType === 'SoftwareDevelopment')).toBeDefined();
  });

  it('contains Digital Marketing', () => {
    expect(SERVICE_ITEMS.find(s => s.iconType === 'DigitalMarketing')).toBeDefined();
  });

  it('icon types are unique', () => {
    const types = SERVICE_ITEMS.map(s => s.iconType);
    expect(new Set(types).size).toBe(types.length);
  });
});
