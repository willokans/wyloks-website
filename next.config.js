/** @type {import('next').NextConfig} */

const csp = [
  "default-src 'self'",
  // Next.js needs unsafe-inline for its runtime; reCAPTCHA needs unsafe-eval
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://www.gstatic.com",
  // reCAPTCHA widget runs in an iframe
  "frame-src 'self' https://www.google.com https://recaptcha.google.com",
  "connect-src 'self' https://www.google.com",
].join('; ');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['wyloksltd.com', 'wyloks.com'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ];
  },
}

module.exports = nextConfig
