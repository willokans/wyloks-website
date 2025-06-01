import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Wyloks',
  description: 'Terms of Service and Cookie Policy for Wyloks IT Consultation services',
};

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Terms of Service</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Cookie Usage</h2>
        <div className="prose prose-purple max-w-none">
          <p className="mb-4">
            Our website uses cookies and similar technologies to provide you with the best possible user experience. 
            By continuing to use our website, you agree to our use of cookies in accordance with this Terms of Service 
            and our <Link href="/cookie-policy" className="text-purple-600 hover:text-purple-700 underline">Cookie Policy</Link>.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">1.1 Types of Cookies We Use</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly 
              and cannot be switched off. They are usually only set in response to actions made by you, such as 
              setting your privacy preferences, logging in, or filling in forms.
            </li>
            <li>
              <strong>Analytics Cookies:</strong> These cookies help us understand how visitors interact with our 
              website by collecting and reporting information anonymously. This helps us improve our website&apos;s 
              structure and content.
            </li>
            <li>
              <strong>Marketing Cookies:</strong> These cookies may be set through our website by our advertising 
              partners. They may be used to build a profile of your interests and show you relevant advertisements 
              on other sites.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">1.2 Cookie Management</h3>
          <p className="mb-4">
            You can manage your cookie preferences at any time by clicking the &quot;Cookie Settings&quot; button in our 
            cookie consent banner. While essential cookies cannot be disabled as they are necessary for the 
            website&apos;s basic functions, you have full control over analytics and marketing cookies.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">1.3 Third-Party Cookies</h3>
          <p className="mb-4">
            Some cookies are set by third-party services that appear on our pages. We use these services to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Analyze site traffic and user behavior</li>
            <li>Improve our marketing efforts</li>
            <li>Enhance website functionality</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Privacy and Data Protection</h2>
        <div className="prose prose-purple max-w-none">
          <p className="mb-4">
            We are committed to protecting your privacy and handling your data transparently. For more detailed 
            information about how we handle your data, please refer to our Privacy Policy.
          </p>
        </div>
      </section>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Last updated: June 1, 2025. For any questions regarding our Terms of Service or cookie usage, please{' '}
          <Link href="/contact" className="text-purple-600 hover:text-purple-700 underline">
            contact us
          </Link>.
        </p>
      </div>
    </div>
  );
}
