# PYRO — Custom Appointment Forms

**Tagline:** Lightweight customizable appointment form builder you can embed anywhere.

## Overview

PYRO is a SaaS starter that lets users design personalized appointment/booking forms, publish them as shareable links or embeddable iframes, and receive immediate notifications when clients submit bookings. It targets small businesses, freelancers, clinics, and agencies who need a simple, branded booking experience without the complexity of larger scheduling platforms.

This repository contains a full-stack starter (frontend + backend) with an MVP-ready feature set and examples to help you launch quickly.

---

## Key Features (MVP)

* Visual form builder (drag-and-drop or JSON schema)
* Shareable public form link and iframe embed code
* Availability/slot management (working hours, breaks, blocked dates)
* Email and in-app notifications for new bookings
* Dashboard to view, confirm, reschedule, and export appointments
* User authentication and basic billing-ready structure
* Webhooks for integrations (Zapier, Airtable, Slack)

---

## Tech Stack (Recommended)

* Frontend: Next.js (React) + Tailwind CSS
* Backend: Node.js + NestJS (or Express) with TypeScript
* Database: PostgreSQL (via Prisma ORM)
* Auth: Clerk / Supabase Auth / NextAuth.js
* Email: SendGrid
* WhatsApp: Meta WhatsApp Cloud API (optional)
* Deployment: Vercel (frontend) + Railway / Render / Fly.io (backend) + managed Postgres

---

## Repo structure (high-level)

```
pyro-appointments/
├── README.md
├── LICENSE
├── .gitignore
├── infra/                       # Deployment infra config (terraform, db migrations)
├── apps/
│   ├── web/                     # Next.js frontend
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── styles/
│   │   │   └── lib/              # api clients, auth helpers
│   │   └── package.json
│   └── api/                     # NestJS backend
│       ├── src/
│       │   ├── modules/
│       │   │   ├── auth/
│       │   │   ├── users/
│       │   │   ├── forms/
│       │   │   ├── bookings/
│       │   │   └── notifications/
│       │   ├── main.ts
│       │   └── app.module.ts
│       └── package.json
├── libs/                        # shared types and utilities
│   ├── prisma/                  # prisma schema and clients
│   └── ui/                      # shared UI components
├── scripts/                     # helpful scripts (db, seed, deploy)
└── .github/                     # CI/CD workflows
```

---

## Getting started (developer)

Follow these steps to run the project locally (MVP setup):

1. Clone the repo:

```bash
git clone https://DuruObi/pyro-appointments.git
cd pyro-appointments
```

2. Install dependencies for frontend and backend:

```bash
# from repo root
cd apps/web
pnpm install    # or npm/yarn

cd ../../apps/api
pnpm install
```

3. Set up environment variables (example `.env` files are in each app folder):

* `DATABASE_URL` — PostgreSQL connection string
* `NEXT_PUBLIC_API_URL` — URL for backend API (local: `http://localhost:4000/api`)
* `SENDGRID_API_KEY` — For email notifications
* `JWT_SECRET` — For server-side token signing
* `CLERK_*` or `NEXTAUTH_*` — if using an auth provider

4. Run database migrations & seed (Prisma example):

```bash
# from repo root or from libs/prisma
pnpm prisma migrate dev --name init
pnpm prisma db seed
```

5. Start dev servers:

```bash
# backend
cd apps/api
pnpm dev

# frontend (in separate terminal)
cd apps/web
pnpm dev
```

Open `http://localhost:3000` for the web app and `http://localhost:4000` for the API.

---

## API Overview

The backend exposes REST/GraphQL endpoints for:

* `POST /auth/*` — authentication
* `GET /forms/:id` — public form payload (fields, branding)
* `POST /forms/:id/submit` — receive submission from public form
* `GET /bookings` — list bookings for the authenticated user
* `POST /webhooks/*` — external integrations

The `POST /forms/:id/submit` endpoint validates availability and creates a booking record, then triggers notifications (email, webhook).

---


## Roadmap (next milestones)

1. Polished form builder (drag-and-drop)
2. Calendar/availability sync (Google Calendar integration)
3. Payment integration for paid bookings (Stripe)
4. White-label/custom domains for paid tiers
5. Multi-user organizations & team scheduling
6. Analytics dashboard (conversion, busiest slots)


---

## License

MIT © Obinna Emmanuel Duru / 3878OED DIGITAL
