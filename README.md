# Patriot Disposal Phoenix Website

An immersive, high-contrast dark theme website for Patriot Disposal Phoenix featuring the iconic phoenix logo and desert color palette.

## Tech Stack

- **Next.js 15** with Turbopack for blazing-fast development
- **React 19** for modern UI components
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for smooth, immersive animations
- **Lucide React** for beautiful icons

## Color Palette

- **Desert Tones**: Tan (#E8DCC4), Sand (#D4C5A9)
- **Phoenix Gradient**: Coral (#FF8C69) → Orange (#FF6B45) → Flame (#FF5733)
- **Patriot Navy**: Dark Navy (#0F1A2E), Navy (#1A2B4A), Blue (#2C4875)

## Getting Started

### Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Deploy to Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com).

### Quick Deploy

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Click "Deploy"

### Deploy via Vercel CLI

\`\`\`bash
npm i -g vercel
vercel
\`\`\`

## Features

- **Immersive Hero Section** with animated phoenix gradient and floating particles
- **Smooth Scroll Animations** powered by Framer Motion
- **Responsive Design** works on all devices
- **High Contrast** for excellent readability
- **Interactive Elements** with hover effects and micro-animations
- **Contact Form** with quote request functionality
- **Service Cards** showcasing all disposal services
- **SEO Optimized** with proper metadata

## Project Structure

\`\`\`
patriot-disposal-website/
├── app/
│   ├── globals.css      # Global styles and animations
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main homepage
├── components/
│   ├── Hero.tsx         # Hero section with phoenix animations
│   ├── Services.tsx     # Services showcase
│   ├── Contact.tsx      # Contact form and info
│   ├── Navbar.tsx       # Navigation bar
│   └── Footer.tsx       # Footer section
├── public/              # Static assets
└── tailwind.config.ts   # Tailwind configuration with custom colors
\`\`\`

## Customization

### Update Contact Information

Edit the phone number and email in:
- `components/Hero.tsx`
- `components/Navbar.tsx`
- `components/Contact.tsx`
- `components/Footer.tsx`

### Modify Colors

Update the color palette in `tailwind.config.ts`:
\`\`\`typescript
colors: {
  desert: { tan: '#E8DCC4', sand: '#D4C5A9' },
  phoenix: { coral: '#FF8C69', orange: '#FF6B45', flame: '#FF5733' },
  patriot: { navy: '#1A2B4A', darkNavy: '#0F1A2E', blue: '#2C4875' }
}
\`\`\`

## Performance

- **Turbopack** for ultra-fast Hot Module Replacement (HMR)
- **Image Optimization** via Next.js Image component
- **Code Splitting** automatic with Next.js app router
- **Font Optimization** using Next.js font system

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

Built with honor and dedication. Rising above in web design.
