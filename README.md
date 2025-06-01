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
