import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Wyloks',
  description: 'Terms of Service and Cookie Policy for Wyloks IT Consultation services',
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}