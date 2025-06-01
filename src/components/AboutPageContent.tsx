'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPageContent() {
  return (
    <article className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-purple-50 opacity-80" />
        <div className="container relative mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            About <span className="text-purple-600">Wyloks</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Wyloks is a registered UK company focused on helping businesses succeed online. 
            We specialize in IT consultation, software development, and performance-driven marketing strategies.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <div className="bg-purple-50 rounded-2xl p-8 sm:p-10 transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To empower businesses with innovative digital solutions that drive growth, efficiency, 
                and success in the modern digital landscape.
              </p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-8 sm:p-10 transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To be the trusted technology partner for businesses worldwide, known for delivering 
                excellence in IT consultation and digital transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                We constantly evolve and adapt to new technologies to provide cutting-edge solutions.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                We strive for excellence in every project, delivering high-quality solutions.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Integrity</h3>
              <p className="text-gray-600 leading-relaxed">
                We maintain the highest standards of honesty and transparency in all our dealings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600 to-purple-700">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            Ready to Transform Your Business?
          </h2>
          <Link
            href="/contact"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold text-lg 
                     hover:bg-purple-50 transform hover:scale-105 transition-all duration-200 
                     shadow-lg hover:shadow-xl"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </article>
  );
}
