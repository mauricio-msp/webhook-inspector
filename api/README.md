# Webhook Inspector API

A simple API service to capture, store and inspect webhooks. This tool helps developers debug and test webhook integrations by providing endpoints to capture incoming webhooks and inspect their content.

## Technologies

- Node.js with TypeScript
- Docker for containerization
- Drizzle ORM for database management
- Biome for code formatting and linting
- PostgreSQL as database
- AI Vercel/SDK Google

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on the example (if provided)

4. Start the database using Docker:
```bash
docker-compose up -d
```

5. Run database migrations:
```bash
npm run db:migrate
```

## Development

To start the development server:

```bash
npm run dev
```

## Available Endpoints

- `POST /webhooks/capture` - Capture incoming webhooks
- `GET /webhooks` - List all captured webhooks
- `GET /webhooks/:id` - Get details of a specific webhook
- `DELETE /webhooks/:id` - Delete a webhook
- `GET /webhooks/generate-handler` - Generate a webhook handler

## Building for Production

```bash
npm run build
npm start
```

## Database Management

- Run migrations: `npm run db:migrate`
- Create a new migration: `npm run db:generate`
- Seed the database: `npm run db:seed`

## License

[Add your license here]