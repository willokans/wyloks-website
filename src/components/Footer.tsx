'use client';

import Link from 'next/link';

const navLinks = [
  { name: 'Home',     href: '/' },
  { name: 'About',    href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact',  href: '/contact' },
];

const legalLinks = [
  { name: 'Privacy Policy',   href: '/privacy' },
  { name: 'Terms of Service', href: '/terms-of-service' },
  { name: 'Cookie Policy',    href: '/cookie-policy' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: 'var(--ink)' }} role="contentinfo">
      <div className="px-6 sm:px-14 lg:px-24 pt-16 pb-10">

        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 mb-16">
          {/* Brand */}
          <div className="max-w-xs">
            <div
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 600, fontSize: '1.5rem', color: 'var(--cream)', letterSpacing: '-0.01em' }}
            >
              Wyloks<span style={{ color: 'var(--terra)' }}>.</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: 'rgba(245,241,234,0.45)' }}>
              A UK-based consultancy helping businesses build better digital products and grow online.
            </p>
            <a
              href="mailto:info@wyloksltd.com"
              className="mt-4 inline-block text-sm transition-colors duration-200"
              style={{ color: 'var(--terra)', textDecoration: 'none' }}
            >
              info@wyloksltd.com
            </a>
          </div>

          {/* Links */}
          <div className="flex gap-16 sm:gap-24">
            <div>
              <p className="label-tag mb-5" style={{ color: 'rgba(245,241,234,0.3)' }}>Navigation</p>
              <ul className="space-y-3">
                {navLinks.map((l) => (
                  <li key={l.name}>
                    <Link
                      href={l.href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: 'rgba(245,241,234,0.5)', textDecoration: 'none' }}
                      onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--cream)'; }}
                      onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(245,241,234,0.5)'; }}
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label-tag mb-5" style={{ color: 'rgba(245,241,234,0.3)' }}>Services</p>
              <ul className="space-y-3">
                {['IT Consultation', 'Software Dev', 'Digital Marketing', 'Affiliate Marketing'].map((s) => (
                  <li key={s} className="text-sm" style={{ color: 'rgba(245,241,234,0.5)' }}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="rule-dark" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8">
          <p className="text-xs" style={{ color: 'rgba(245,241,234,0.3)' }}>
            © {currentYear} Wyloks Ltd. Registered in England &amp; Wales. N13 4BS.
          </p>
          <nav aria-label="Footer legal links">
            <ul className="flex flex-wrap gap-6">
              {legalLinks.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="text-xs transition-colors duration-200"
                    style={{ color: 'rgba(245,241,234,0.3)', textDecoration: 'none' }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'rgba(245,241,234,0.6)'; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(245,241,234,0.3)'; }}
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
