# Patriot Disposal Phoenix Website - Codebase Overview

## Tech Stack
- **Next.js 15** with App Router + Turbopack
- **React 19** + **TypeScript 5**
- **Tailwind CSS 3.4** + **Framer Motion** for animations
- **Prisma 6.19** + **PostgreSQL**
- **External Backend API** at `http://5.78.98.98:4000`

## Project Structure
```
├── app/                    # Next.js pages
│   ├── api/                # API routes (contact, tracking, proxy)
│   ├── blog/               # Blog pages
│   └── system/             # Protected dashboard (16 pages)
├── components/             # React components (20+)
│   └── dashboard/          # Dashboard-specific components
├── contexts/               # AuthContext, APIConnectionsContext
├── lib/                    # API client (537 lines), Prisma
└── prisma/                 # Database schema
```

## Key Features

| Area | Details |
|------|---------|
| **Public Site** | Hero, About, Services, Blog, Contact form |
| **Dashboard** | Drivers, Fleet, Routes, Customers, Tickets, Billing |
| **Analytics** | Visitor tracking, SEO tools, Competitor intel |
| **Auth** | JWT tokens, middleware protection, Google OAuth ready |
| **Integrations** | 18 external services (SEMrush, GA4, Hotjar, etc.) |

## Database Models (Prisma)
- **Visitor** - IP tracking, geolocation, device detection, VPN detection
- **PageView** - Page visit tracking with duration
- **Event** - Click/scroll/form tracking
- **CompetitorIP** - Competitor identification
- **AnalyticsSummary** - Daily aggregated metrics

## Architecture
```
UI → Context/Hooks → API Client → /api/proxy → External VPS Backend → PostgreSQL
```

## Key Files
- `lib/api-client.ts` - Main API client (537 lines), handles all backend communication
- `contexts/AuthContext.tsx` - Authentication state, JWT handling, login/logout
- `contexts/APIConnectionsContext.tsx` - Third-party service integrations (18 services)
- `middleware.ts` - Protects /system/* routes with JWT validation
- `components/DashboardLayout.tsx` - Main dashboard layout (345 lines)
- `prisma/schema.prisma` - Database models

## Dashboard Pages (/system/*)
- `/system` - Overview with stats, alerts, live operations
- `/system/drivers` - Driver management, safety scores, DVIRs
- `/system/fleet` - Vehicle inventory, maintenance
- `/system/routes` - Route planning and assignment
- `/system/customers` - Customer database
- `/system/tickets` - Service ticket management
- `/system/billing` - Invoices and payments
- `/system/analytics` - User behavior analytics
- `/system/seo` - SEO performance tools
- `/system/competitive` - Competitor intelligence
- `/system/visitor-intelligence` - Visitor tracking
- `/system/reports` - Report generation
- `/system/alerts` - System alerts
- `/system/settings` - Configuration
- `/system/privacy` - Privacy settings
- `/system/live` - Live operations

## External Integrations (via APIConnectionsContext)
**SEO**: Google Search Console, GA4, SEMrush, Ahrefs, Moz, PageSpeed, BrightLocal
**Analytics**: Hotjar, FullStory, Mixpanel
**Competitive**: SimilarWeb, SpyFu
**Visitor Intel**: IPInfo, Device Detection
**Notifications**: SendGrid, Twilio, Slack, Webhooks

## Deployment
- **Frontend**: Vercel
- **Backend**: VPS at `5.78.98.98:4000`

## Styling
- Tailwind CSS with custom desert/phoenix color palette
- Framer Motion animations
- Dark theme default
- Mobile-first responsive design

## Environment Variables Needed
```
NEXT_PUBLIC_API_URL=http://5.78.98.98:4000
DATABASE_URL=postgresql://...
SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
CONTACT_EMAIL=info@pdphx.com
```
