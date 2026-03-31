# Would U Rather

A full-stack Next.js application for running a daily "Would You Rather" experience with user authentication, question choices, and voting.

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Prisma ORM + PostgreSQL
- Clerk authentication
- Svix webhook verification (for Clerk events)
- Tailwind CSS 4

## Prerequisites

- Node.js 20+
- Docker Desktop (or Docker Engine)
- A Clerk account and application
- ngrok (for local webhook testing)

## Local Development Setup

1. Install dependencies:

	```bash
	npm install
	```

2. Start PostgreSQL via Docker:

	```bash
	docker compose up -d
	```

3. Create your environment file (`.env` or `.env.local`) with the variables listed below.

4. Apply Prisma migrations:

	```bash
	npx prisma migrate dev
	```

5. Start the Next.js dev server:

	```bash
	npm run dev
	```

6. In a separate terminal, expose your app to Clerk with ngrok:

	```bash
	ngrok http 3000
	```

## Environment Variables

Use the following variables in your env file:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/wouldurather"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Clerk Webhooks (Svix)
CLERK_WEBHOOK_SECRET=your_webhook_secret
```

## Clerk Webhook Configuration

1. Open the Clerk Dashboard.
2. Create a webhook endpoint pointing to:

	```text
	https://<your-ngrok-subdomain>.ngrok-free.app/api/webhooks/clerk
	```

3. Subscribe to at least the `user.created` event.
4. Copy the webhook signing secret and set `CLERK_WEBHOOK_SECRET` in your env file.

## Available Scripts

- `npm run dev` - Start development server
- `npx prisma studio` - Open Prisma Studio
- `npm run build` - Build production app
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Database Notes

The default local Docker database configuration from `docker-compose.yml` is:

- host: `localhost`
- port: `5433`
- user: `postgres`
- password: `postgres`
- database: `wouldurather`

## Troubleshooting

- If Clerk users are not appearing in your database:
  - ensure ngrok is running
  - verify webhook URL is current
  - confirm `CLERK_WEBHOOK_SECRET` matches Clerk Dashboard
- If Prisma fails to connect:
  - verify Docker container is running with `docker compose ps`
  - check `DATABASE_URL` points to port `5433`

## Project Status

This project is under active development.
