# Wyloks Website

A modern, performant website for Wyloks IT Consultation company built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.17.0
- npm (comes with Node.js)
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wyloks-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🛠️ Tech Stack

### Core Technologies
- **Next.js 14**: React framework with App Router for server-side rendering and static site generation
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For utility-first styling
- **React 18**: For building user interfaces

### Development Tools
- **ESLint**: For code linting
- **Prettier**: For code formatting
- **Jest**: For unit testing
- **React Testing Library**: For component testing

### Performance & SEO
- Next.js App Router with server components
- Optimized image loading with next/image
- SEO optimization with metadata API
- Google Analytics integration
- Google reCAPTCHA for form security

## 📁 Project Structure

```
src/
├── app/                  # Next.js 14 App Router pages
├── components/           # React components
│   ├── services/        # Service-related components
│   └── __tests__/       # Component tests
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and constants
├── styles/              # Global styles
└── types/              # TypeScript type definitions
```

### Key Components
- `app/`: Contains all page components and API routes
- `components/`: Reusable UI components
- `lib/`: Shared utilities and constants
- `types/`: TypeScript type definitions

## 🔧 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Run production server
- `npm test`: Run tests
- `npm run lint`: Run ESLint
- `npm run type-check`: Check TypeScript types

## 🌐 Environment Variables

Create a `.env.local` file with the following:

```env
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
```

## 🏗️ Architecture

### Routing
- Uses Next.js 14 App Router
- Server Components by default
- Client Components marked with 'use client'
- API routes in `app/api` directory

### State Management
- React hooks for local state
- Server components for data fetching
- Form state managed with controlled components

### Performance Features
- Server-side rendering for initial page loads
- Static page generation where possible
- Dynamic imports for code splitting
- Image optimization with next/image
- Font optimization with next/font

### Testing Strategy
- Unit tests with Jest
- Component tests with React Testing Library
- Integration tests for API routes
- E2E tests (planned)

## 🚀 Deployment

### Vercel Deployment
1. Push to GitHub
2. Connect to Vercel
3. Configure environment variables
4. Deploy

### Manual Deployment
1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## 🔒 Security Features

- reCAPTCHA integration for forms
- CORS policies
- Security headers
- Input validation
- Type safety with TypeScript

## 🧪 Testing

Run tests with:
```bash
npm test               # Run all tests
npm test -- --watch   # Run tests in watch mode
```

## 📚 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, contact support@wyloksltd.com or open an issue.

## 🍪 Cookie Policy Implementation

### Overview
The website implements a comprehensive cookie consent management system that respects user privacy and complies with data protection regulations.

### Key Features
- **Granular Cookie Control**: Users can:
  - Accept all cookies
  - Reject non-essential cookies
  - Customize their preferences
  - Change preferences at any time
  
- **Cookie Types**:
  - Essential: Always enabled, required for basic functionality
  - Analytics: Optional, for website usage analysis
  - Marketing: Optional, for targeted advertising

### Implementation Details

#### 1. Cookie Consent Hook (`useCookieConsent.ts`)
```typescript
// Manages cookie preferences and provides utilities
interface CookiePreferences {
  essential: boolean;  // Always true
  analytics: boolean;  // Optional
  marketing: boolean;  // Optional
}
```

#### 2. Cookie Consent Banner (`CookieConsent.tsx`)
- First-time visitors see a consent banner
- Clear options for accepting, rejecting, or customizing
- Preferences stored in localStorage
- Responsive design for all devices

#### 3. Analytics Integration (`SiteAnalytics.tsx`)
- Respects user preferences
- Only loads if analytics cookies are accepted
- Automatically removes analytics cookies when rejected

#### 4. Cookie Policy Page (`/cookie-policy`)
- Detailed information about cookie usage
- Clear explanations of each cookie type
- Instructions for managing cookie preferences

### User Privacy Protection
- Essential cookies are limited to necessary functionality
- Non-essential cookies require explicit consent
- Analytics and marketing features are disabled by default
- User preferences are preserved between sessions
- Clear instructions for managing cookies through browser settings

### Technical Implementation
```typescript
// Example of conditional analytics loading
if (canUseAnalytics) {
  // Load analytics scripts
} else {
  // Remove analytics cookies
  removeAnalyticsCookies();
}
```

### Testing Cookies
To test cookie functionality:
1. Clear browser cookies and localStorage
2. Visit the website in a fresh session
3. Verify cookie banner appears
4. Test different consent options
5. Confirm analytics load only with consent

### Cookie Expiration
- Essential Cookies: Session-based or up to 24 hours
- Analytics Cookies: 6 months (if accepted)
- Marketing Cookies: 6 months (if accepted)
- Cache Files: Up to 1 year (31536000 seconds)

## 🍪 Cookie Policy Implementation

### Overview
Our cookie management system provides users with granular control over their cookie preferences while ensuring compliance with privacy regulations. The implementation uses React hooks and local storage for persistent preferences.

### Features
- Essential cookies (always enabled for core functionality)
- Optional analytics cookies for site improvement
- Optional marketing cookies for personalized content
- Persistent user preferences via local storage
- Clear consent UI with granular controls
- Easy preference restoration

### Key Components

#### `useCookieConsent` Hook
Located in `src/hooks/useCookieConsent.ts`, this custom hook manages cookie preferences:
```typescript
interface CookiePreferences {
  essential: boolean;  // Always true, required for site function
  analytics: boolean;  // User-configurable
  marketing: boolean;  // User-configurable
}
```

#### `CookieConsent` Component
Located in `src/components/CookieConsent.tsx`, provides the UI for:
- Initial consent prompt
- Granular preference controls
- Accept/Reject all buttons
- Preference restoration

#### Integration with Analytics
The `SiteAnalytics` component respects user preferences:
- Loads analytics only with user consent
- Handles preference changes dynamically
- Maintains essential functionality when analytics are rejected

### Usage
```typescript
// In your component:
const { preferences, updatePreferences, loaded } = useCookieConsent();

// Check if specific cookie types are allowed:
if (preferences.analytics) {
  // Load analytics
}
```

### Best Practices
1. Always check cookie consent before loading optional features
2. Keep essential cookies to a minimum
3. Respect user preferences immediately upon changes
4. Provide clear documentation of cookie purposes
5. Include obvious UI for updating preferences
