import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact Us | Wyloks',
  description: 'Get in touch with Wyloks for IT consultation and services.',
};

export default function ContactPage() {
  return (
    <div className="flex flex-col" style={{ backgroundColor: 'var(--cream)' }}>

      {/* Hero */}
      <section
        className="relative px-6 sm:px-14 lg:px-24 py-24 overflow-hidden"
        style={{ backgroundColor: 'var(--ink)' }}
      >
        <div
          className="absolute left-6 sm:left-14 lg:left-24 top-0 bottom-0 w-px"
          style={{ backgroundColor: 'rgba(245,241,234,0.06)' }}
        />
        <div className="relative max-w-7xl mx-auto">
          <p className="label-tag mb-10" style={{ color: 'rgba(245,241,234,0.35)' }}>
            Get in touch
          </p>
          <h1
            className="display-hero"
            style={{ fontSize: 'clamp(3rem,9vw,7rem)', color: 'var(--cream)', fontFamily: 'var(--font-display)' }}
          >
            Let&apos;s build<br />
            <span style={{ color: 'var(--terra)' }}>something great.</span>
          </h1>
          <span className="rule-dark block mt-12 mb-10" />
          <p className="font-body text-base leading-relaxed max-w-lg" style={{ color: 'rgba(245,241,234,0.5)' }}>
            Tell us about your project and we&apos;ll get back to you within 48 hours.
            No hard sell — just a straight conversation.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="px-6 sm:px-14 lg:px-24 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* Contact details sidebar */}
            <div className="lg:col-span-1 pt-2">
              <p className="label-tag mb-8">Contact</p>
              <div className="space-y-6">
                <div className="border-t pt-5" style={{ borderColor: 'rgba(22,18,11,0.1)' }}>
                  <p className="font-body text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--ink-muted)' }}>Email</p>
                  <a
                    href="mailto:info@wyloks.com"
                    className="link-terra font-body text-sm"
                  >
                    info@wyloks.com
                  </a>
                </div>
                <div className="border-t pt-5" style={{ borderColor: 'rgba(22,18,11,0.1)' }}>
                  <p className="font-body text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--ink-muted)' }}>Location</p>
                  <p className="font-body text-sm text-ink">London, UK — N13 4BS</p>
                </div>
                <div className="border-t pt-5" style={{ borderColor: 'rgba(22,18,11,0.1)' }}>
                  <p className="font-body text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--ink-muted)' }}>Response time</p>
                  <p className="font-body text-sm text-ink">Within 48 hours</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
