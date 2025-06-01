import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Wyloks',
  description: 'Learn about Wyloks - Our mission, vision, and values in IT consultation and digital services.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
