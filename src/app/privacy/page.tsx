import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Wyloks',
  description: 'Privacy Policy and data protection information for Wyloks IT Consultation services',
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Introduction</h2>
        <div className="prose prose-purple max-w-none">
          <p className="mb-4">
            At Wyloks, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Information We Collect</h2>
        <div className="prose prose-purple max-w-none">
          <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Information You Provide</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Contact information (name, email address, phone number)</li>
            <li>Business information when using our services</li>
            <li>Communications with us through our contact form</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Automatically Collected Information</h3>
          <p className="mb-4">When you visit our website, we automatically collect:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Device information (browser type, operating system)</li>
            <li>Usage information (pages visited, time spent)</li>
            <li>IP address and location information</li>
            <li>Cookie data as detailed in our <Link href="/cookie-policy" className="text-purple-600 hover:text-purple-700 underline">Cookie Policy</Link></li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. How We Use Your Information</h2>
        <div className="prose prose-purple max-w-none">
          <p className="mb-4">We use the collected information to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Provide and improve our services</li>
            <li>Communicate with you about our services</li>
            <li>Monitor and analyze website usage</li>
            <li>Protect against fraud and unauthorized access</li>
            <li>Comply with legal obligations</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Cookie Usage</h2>
        <div className="prose prose-purple max-w-none">
          <p className="mb-4">
            Our website uses cookies and similar tracking technologies. For detailed information about 
            our cookie usage and your choices regarding cookies, please see our{' '}
            <Link href="/cookie-policy" className="text-purple-600 hover:text-purple-700 underline">
              Cookie Policy
            </Link>.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Your Rights</h2>
        <div className="prose prose-purple max-w-none">
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Access your personal data</li>
            <li>Correct inaccurate personal data</li>
            <li>Request deletion of your personal data</li>
            <li>Object to our use of your personal data</li>
            <li>Request data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Data Security</h2>
        <div className="prose prose-purple max-w-none">
          <p className="mb-4">
            We implement appropriate security measures to protect your personal information. 
            However, please note that no method of transmission over the internet is 100% secure.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Contact Us</h2>
        <div className="prose prose-purple max-w-none">
          <p className="mb-4">
            If you have questions about this Privacy Policy, please{' '}
            <Link href="/contact" className="text-purple-600 hover:text-purple-700 underline">
              contact us
            </Link>.
          </p>
        </div>
      </section>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Last updated: June 1, 2025. This Privacy Policy may be updated from time to time.
        </p>
      </div>
    </div>
  );
}
