import '@shopify/shopify-api/adapters/node';
import { LATEST_API_VERSION } from '@shopify/shopify-api';
import { environment } from '../config/environment';
import { shopifyApp } from '@shopify/shopify-app-express';

const shopify = shopifyApp({
	api: {
		apiKey: environment.shopifyClientId,
		apiSecretKey: environment.shopifyClientSecret,
		scopes: ['read_products', 'write_products', 'read_orders', 'write_orders', 'read_customers', 'write_customers', 'write_customer_payment_methods', 'write_own_subscription_contracts'],
		hostName: environment.shopifyAppUrl.replace(/https:\/\//, ''),
		apiVersion: LATEST_API_VERSION,
		billing: undefined
	},
	auth: {
		path: "/api/auth",
		callbackPath: "/api/auth/callback"
	},
	webhooks: {
		path: "/api/webhooks"
	}
})

export default shopify
