import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Wyloks IT Consultation',
  description: 'Learn about how Wyloks uses cookies and tracking technologies to improve your experience on our website.',
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
        
        <div className="prose prose-purple max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            Last updated: June 1, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">What Are Cookies?</h2>
            <p className="text-gray-600 mb-4">
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
            </p>
            <p className="text-gray-600">
              Different cookies have different lifespans:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-2">
              <li><strong>Session cookies</strong> are temporary and expire when you close your browser</li>
              <li><strong>Persistent cookies</strong> remain on your device for a set period, which can be days, weeks, or months</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Cookies</h2>
            <p className="text-gray-600 mb-4">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>To provide essential website functionality</li>
              <li>To remember your preferences and settings</li>
              <li>To analyze and improve our website performance</li>
              <li>To measure the effectiveness of our marketing campaigns</li>
            </ul>
          </section>            <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Essential Cookies</h3>
                <p className="text-gray-600 mb-2">
                  These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. This includes cookies for our contact form's security features.
                </p>
                <p className="text-gray-600 text-sm">
                  Duration: Most essential cookies are session cookies that expire when you close your browser. Some may persist for up to 24 hours to maintain basic site functionality.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Security & Anti-Spam Cookies</h3>
                <p className="text-gray-600 mb-2">
                  We use Google reCAPTCHA to protect our contact forms from spam and abuse. This service sets cookies to verify that you are a real person when submitting forms. For more information about reCAPTCHA, please visit Google's{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800"
                  >
                    Privacy Policy
                  </a>.
                </p>
                <p className="text-gray-600 text-sm">
                  Duration: reCAPTCHA cookies typically expire after 6 months. Some security tokens may have shorter durations for enhanced protection.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Cache Management</h3>
                <p className="text-gray-600 mb-2">
                  Our website uses browser caching to improve performance. While these are not cookies, they are stored on your device to make our website load faster on subsequent visits.
                </p>
                <p className="text-gray-600 text-sm">
                  Duration: Cache files are typically stored for up to 1 year (31536000 seconds) as configured in our application, but you can clear them at any time through your browser settings.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Managing Cookies</h2>
            <p className="text-gray-600 mb-4">
              Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may affect your experience using our website.
            </p>
            <p className="text-gray-600">
              To learn more about cookies and how to manage them, visit{' '}
              <a
                href="https://www.aboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800"
              >
                www.aboutcookies.org
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about our Cookie Policy, please contact us through our{' '}
              <a href="/contact" className="text-purple-600 hover:text-purple-800">
                Contact Page
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
