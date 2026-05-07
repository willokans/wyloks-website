import React from 'react';

export default function ServicesHero() {
  return (
    <section
      className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-6 sm:px-14 lg:px-24 py-24 overflow-hidden"
      style={{ backgroundColor: 'var(--ink)' }}
    >
      <div
        className="absolute left-6 sm:left-14 lg:left-24 top-0 bottom-0 w-px"
        style={{ backgroundColor: 'rgba(245,241,234,0.06)' }}
      />
      <div className="relative max-w-7xl mx-auto">
        <p className="label-tag mb-10" style={{ color: 'rgba(245,241,234,0.35)' }}>What We Offer</p>
        <h1
          className="display-hero"
          style={{ fontSize: 'clamp(3rem,9vw,7rem)', color: 'var(--cream)', fontFamily: 'var(--font-display)' }}
        >
          Services built<br />
          for <span style={{ color: 'var(--terra)' }}>results.</span>
        </h1>
        <span className="rule-dark block mt-12 mb-10" />
        <p className="font-body text-base leading-relaxed max-w-lg" style={{ color: 'rgba(245,241,234,0.5)' }}>
          Comprehensive digital solutions to transform your business and accelerate
          growth — built around your goals, not ours.
        </p>
      </div>
    </section>
  );
}
