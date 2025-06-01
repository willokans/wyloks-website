export type IconType = 'ITConsulting' | 'SoftwareDevelopment' | 'DigitalMarketing';

export interface ServiceProps {
  title: string;
  description: string;
  iconType: IconType;
}
