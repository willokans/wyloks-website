# Copilot Instructions for Wyloks App

Welcome to **Wyloks App** – the official website for our IT consultation company. This project is built using [Next.js](https://nextjs.org/) (with the App Router), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/). If you're a junior developer, this guide will help you understand the tools, how we use them, and how to contribute confidently to the codebase.

---

## 🚀 Project Overview

**Wyloks App** is a fast, modern, and SEO-optimized static website. It showcases our services, expertise, and contact information to potential clients. The tech stack ensures maintainability, great developer experience, and fast performance for users.

---

## 🛠️ Tech Stack: Why and How

### 1. Next.js (App Router)

**Why?**
- Built-in static site generation (SSG) and performance optimizations.
- Clean, scalable file-based routing with the App Router (`app/` directory).
- Native support for SEO features and metadata configuration.

**How?**
- Routes are defined in the `app/` directory.
- Static pages are generated at build time.
- Use Server Components by default.
- For interactive elements (e.g., navbar toggles), use `'use client'`.

**Best Practices:**
- Organize routes using folders and `page.tsx` files.
- Use `layout.tsx` for consistent page layouts.
- Use `metadata` exports for SEO on each page.
- Keep logic out of components—use helper functions or services.

---

### 2. TypeScript

**Why?**
- Adds static typing for safer and more predictable code.
- Improves developer experience with better autocomplete and error checking.

**How?**
- All files use `.ts` or `.tsx`.
- Define component props and reusable types in `types/` or `lib/types.ts`.

**Best Practices:**
- Always type props and functions explicitly.
- Use `type` for unions and aliases, `interface` for object shapes.
- Keep types organized and reusable.
- Use `zod` if runtime validation becomes necessary later.

---

### 3. Tailwind CSS

**Why?**
- Utility-first styling framework for rapid and consistent UI development.
- Reduces need for custom CSS.
- Mobile-first and responsive design baked in.

**How?**
- Tailwind is configured in `tailwind.config.ts`.
- Global styles are in `app/globals.css`.
- Apply styling via class names in your components:
  ```tsx
  <section className="py-12 bg-gray-100 text-center">
    <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
  </section>
