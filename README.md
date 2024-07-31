# Shopify Subscription Management API

An open-source solution for managing subscriptions in headless Shopify storefronts.

## Features

- Subscription management
- One-time add-ons
- Webhook handling
- Order management

## Requirements

- Node.js (v14+)
- PostgreSQL
- Shopify Partner account

## Installation

1. Clone the repository: git clone https://github.com/your-username/shopify-subscription-api.git

2. Install dependencies:
	- cd shopify-subscription-api
	- npm install

3. Set up your environment variables:
	- cp .env.example. .env
	- Edit the `.env` file with your specific configuration.

4. Run database migrations:
	- `npx prisma migrate dev`

5. Start the server:
	- `npm run dev`

## Customization

This API is designed to be easily customizable. Here are some ways you can modify it for your needs:

1. Adding new endpoints: Create new route files in `src/routes` and add corresponding controllers and services.
2. Modifying database schema: Edit `prisma/schema.prisma` and run `npx prisma migrate dev` to update your database.
3. Changing business logic: Modify the service files in `src/services` to adjust how data is processed and stored.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
