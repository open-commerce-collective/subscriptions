import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION, AuthQuery } from '@shopify/shopify-api';
import { environment } from '../config/environment';
import { Request, Response } from 'express';
import { shopifyApp } from '@shopify/shopify-app-express';

const shopify = shopifyApp({
	api: {
		apiKey: environment.shopifyClientId,
		apiSecretKey: environment.shopifyClientSecret,
		scopes: ['read_products', 'write_products', 'read_orders', 'write_orders', 'read_customers', 'write_customers'],
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

// export const shopify = shopifyApi({
// 	apiKey: environment.shopifyClientId,
// 	apiSecretKey: environment.shopifyClientSecret,
// 	scopes: ['read_products', 'write_products'], // Adjust scopes as needed
// 	hostName: environment.shopifyAppUrl.replace(/https:\/\//, ''),
// 	apiVersion: LATEST_API_VERSION,
// 	isEmbeddedApp: false, // Set to true if it's an embedded app
// });

// export const beginAuth = async (req: Request, res: Response, shop: string) => {
// 	return await shopify.auth.begin({
// 		shop,
// 		callbackPath: environment.shopifyAuthCallbackUrl,
// 		isOnline: false,
// 		rawRequest: req as unknown as AuthQuery,
// 		rawResponse: res,
// 	});
// };

// export const validateAuthCallback = async (req: Request, res: Response) => {
// 	return await shopify.auth.callback({
// 		rawRequest: req as unknown as AuthQuery,
// 		rawResponse: res,
// 	});
// };

// export const getShopifyAdminUrl = (shop: string) => {
// 	return `https://${shop}/admin`;
// };
