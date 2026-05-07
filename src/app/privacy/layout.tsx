import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Wyloks',
  description: 'Privacy Policy and data protection information for Wyloks IT Consultation services',
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
