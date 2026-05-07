import Link from 'next/link';

export const metadata = {
  title: 'Home | Wyloks',
  description: 'A UK-based consultancy helping businesses build better digital products.',
};

const services = [
  {
    num: '01',
    title: 'IT Consultation',
    description:
      'Strategic technology guidance — from architecture reviews to digital transformation roadmaps built around your business goals.',
  },
  {
    num: '02',
    title: 'Software Development',
    description:
      'End-to-end engineering for web applications, APIs, and internal tools. Built to last, not just to ship.',
  },
  {
    num: '03',
    title: 'Digital Marketing',
    description:
      'SEO, performance marketing, and affiliate programmes that turn traffic into measurable revenue.',
  },
];

const reasons = [
  { title: 'End-to-end ownership',  body: 'From scope to deployment, we take full responsibility for the outcome.' },
  { title: 'Measurable results',    body: 'Every decision is tied back to a metric that matters to your business.' },
  { title: 'Custom strategies',     body: "No off-the-shelf playbooks. Everything is built around your specific context." },
  { title: 'UK expertise',          body: 'Based in London, fully registered, aligned with UK compliance requirements.' },
];

export default function HomePage() {
  return (
    <div className="flex-grow">

      {/* ── Hero ── */}
      <section className="relative bg-cream min-h-[90vh] flex items-center px-6 sm:px-14 lg:px-24 py-24 overflow-hidden">
        <div className="absolute left-6 sm:left-14 lg:left-24 top-0 bottom-0 w-px bg-ink/6" />
        <div className="relative w-full max-w-7xl">
          <p className="label-tag mb-10 animate-fade-up">
            Wyloks — IT Consultation &amp; Digital Growth — London, UK
          </p>
          <h1 className="display-hero text-[clamp(3.5rem,10vw,8rem)] text-ink mb-12 animate-fade-up-d1">
            We Turn<br />
            Technology<br />
            <span style={{ color: 'var(--terra)' }}>Into Growth.</span>
          </h1>
          <span className="rule block mb-12 animate-fade-up-d2" />
          <div className="flex flex-col sm:flex-row sm:items-end gap-10 animate-fade-up-d2">
            <p className="font-body text-base leading-relaxed max-w-sm" style={{ color: 'var(--ink-muted)' }}>
              A UK-based consultancy helping forward-thinking businesses build better digital
              products — from the first line of code to the first page of results.
            </p>
            <div className="flex items-center gap-4 sm:ml-auto flex-shrink-0">
              <Link href="/services" className="btn-ink">View Services</Link>
              <Link href="/contact" className="btn-outline">Start a project</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section style={{ backgroundColor: 'var(--ink)' }} className="px-6 sm:px-14 lg:px-24 py-24">
        <div className="max-w-7xl mx-auto">
          <p className="label-tag mb-14" style={{ color: 'rgba(245,241,234,0.35)' }}>What We Do</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: 'rgba(245,241,234,0.08)' }}>
            {services.map((s) => (
              <div
                key={s.num}
                className="card-dark p-10"
                style={{ backgroundColor: 'var(--ink)' }}
              >
                <span className="num-display text-4xl block mb-6">{s.num}</span>
                <h3
                  className="display-section text-2xl mb-4"
                  style={{ color: 'var(--cream)', fontFamily: 'var(--font-display)' }}
                >
                  {s.title}
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(245,241,234,0.5)' }}>
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── Why Wyloks ── */}
      <section className="bg-cream px-6 sm:px-14 lg:px-24 py-24">
        <div className="max-w-7xl mx-auto">
          <span className="rule block mb-20" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="label-tag mb-6">Why Wyloks</p>
              <h2
                className="display-section text-ink"
                style={{ fontSize: 'clamp(2rem,4.5vw,3.5rem)', fontFamily: 'var(--font-display)' }}
              >
                We don&apos;t just build things.<br />
                We make them <em>work</em>.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {reasons.map((item) => (
                <div key={item.title} className="border-t pt-5" style={{ borderColor: 'rgba(22,18,11,0.1)' }}>
                  <h4 className="font-body font-semibold text-ink text-sm mb-2">{item.title}</h4>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--ink-muted)' }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
          <span className="rule block mt-20" />
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: 'var(--ink-mid)' }} className="px-6 sm:px-14 lg:px-24 py-28">
        <div className="max-w-7xl mx-auto text-center">
          <p className="label-tag mb-8" style={{ color: 'rgba(245,241,234,0.3)' }}>Let&apos;s talk</p>
          <h2
            className="display-hero mb-12"
            style={{ fontSize: 'clamp(2.5rem,7vw,5.5rem)', color: 'var(--cream)', fontFamily: 'var(--font-display)' }}
          >
            Ready to build something<br />
            <span style={{ color: 'var(--terra)' }}>remarkable?</span>
          </h2>
          <Link href="/contact" style={{ backgroundColor: 'var(--terra)', color: 'var(--cream)' }} className="btn-ink">
            Start the conversation
          </Link>
        </div>
      </section>

    </div>
  );
}
