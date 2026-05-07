'use client';

import React from 'react';
import Link from 'next/link';

const values = [
  {
    num: '01',
    title: 'Innovation',
    body: 'We constantly evolve and adapt to new technologies to provide cutting-edge solutions for every client.',
  },
  {
    num: '02',
    title: 'Excellence',
    body: 'We strive for excellence in every project, delivering high-quality work that outlasts the engagement.',
  },
  {
    num: '03',
    title: 'Integrity',
    body: 'Honesty and transparency in every conversation — we tell you what you need to hear, not what you want to.',
  },
];

export default function AboutPageContent() {
  return (
    <article className="flex flex-col w-full">

      {/* ── Hero ── */}
      <section className="relative bg-cream min-h-[60vh] flex items-center px-6 sm:px-14 lg:px-24 py-24 overflow-hidden">
        <div className="absolute left-6 sm:left-14 lg:left-24 top-0 bottom-0 w-px bg-ink/6" />
        <div className="relative w-full max-w-7xl">
          <p className="label-tag mb-10 animate-fade-up">About us</p>
          <h1
            className="display-hero text-ink animate-fade-up-d1"
            style={{ fontSize: 'clamp(3rem,9vw,7rem)', fontFamily: 'var(--font-display)' }}
          >
            A consultancy with<br />
            <span style={{ color: 'var(--terra)' }}>genuine expertise.</span>
          </h1>
          <span className="rule block mt-12 mb-10 animate-fade-up-d2" />
          <p
            className="font-body text-base leading-relaxed max-w-xl animate-fade-up-d2"
            style={{ color: 'var(--ink-muted)' }}
          >
            Wyloks is a registered UK company focused on helping businesses succeed online.
            We specialise in IT consultation, software development, and performance-driven
            marketing strategies.
          </p>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section style={{ backgroundColor: 'var(--ink)' }} className="px-6 sm:px-14 lg:px-24 py-24">
        <div className="max-w-7xl mx-auto">
          <p className="label-tag mb-14" style={{ color: 'rgba(245,241,234,0.3)' }}>Our purpose</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: 'rgba(245,241,234,0.08)' }}>
            {[
              {
                label: 'Mission',
                body: 'To empower businesses with innovative digital solutions that drive growth, efficiency, and success in the modern digital landscape.',
              },
              {
                label: 'Vision',
                body: 'To be the trusted technology partner for businesses worldwide — known for delivering excellence in IT consultation and digital transformation.',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="card-dark p-10 sm:p-14"
                style={{ backgroundColor: 'var(--ink)' }}
              >
                <p className="label-tag mb-6" style={{ color: 'rgba(245,241,234,0.3)' }}>{item.label}</p>
                <p
                  className="display-section leading-snug"
                  style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--cream)', fontFamily: 'var(--font-display)' }}
                >
                  &ldquo;{item.body}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section style={{ backgroundColor: 'var(--cream-dark)' }} className="px-6 sm:px-14 lg:px-24 py-24">
        <div className="max-w-7xl mx-auto">
          <p className="label-tag mb-16">Core values</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((v) => (
              <div key={v.num} className="border-t pt-8" style={{ borderColor: 'rgba(22,18,11,0.1)' }}>
                <span
                  className="block mb-6"
                  style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 700, fontSize: '3rem', color: 'var(--terra)', lineHeight: 1 }}
                >
                  {v.num}
                </span>
                <h3 className="font-body font-semibold text-ink text-lg mb-3">{v.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--ink-muted)' }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: 'var(--ink-mid)' }} className="px-6 sm:px-14 lg:px-24 py-28">
        <div className="max-w-7xl mx-auto text-center">
          <p className="label-tag mb-8" style={{ color: 'rgba(245,241,234,0.3)' }}>Work with us</p>
          <h2
            className="display-hero mb-12"
            style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', color: 'var(--cream)', fontFamily: 'var(--font-display)' }}
          >
            Ready to transform<br />
            <span style={{ color: 'var(--terra)' }}>your business?</span>
          </h2>
          <Link href="/contact" style={{ backgroundColor: 'var(--terra)', color: 'var(--cream)' }} className="btn-ink">
            Get in touch
          </Link>
        </div>
      </section>

    </article>
  );
}
