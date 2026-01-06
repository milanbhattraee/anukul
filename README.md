# Anukul E-commerce Store

A modern, single-store e-commerce website built with Next.js, React, and Tailwind CSS.

## Features

- 🛍️ Product listing with grid layout
- 🎨 Modern and responsive design
- 🌙 Dark mode support
- 📱 Mobile-friendly interface
- 🏷️ Product categories and pricing
- 📦 Stock availability indicators
- 🖼️ High-quality product images

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **Fonts:** Geist Sans & Geist Mono

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout component
│   ├── page.tsx        # Home page with product listing
│   └── globals.css     # Global styles
├── components/         # React components
│   └── ProductCard.tsx # Product card component
├── lib/               # Utilities and data
│   ├── types.ts       # TypeScript type definitions
│   └── products.ts    # Product data
└── public/            # Static assets
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

