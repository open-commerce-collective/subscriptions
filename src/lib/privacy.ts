import { DeliveryMethod, WebhookHandler } from "@shopify/shopify-api";

// Define interfaces for the payloads of each webhook type
interface CustomerDataRequestPayload {
	shop_id: number;
	shop_domain: string;
	orders_requested: number[];
	customer: {
		id: number;
		email: string;
		phone: string;
	};
	data_request: {
		id: number;
	};
}

interface CustomerRedactPayload {
	shop_id: number;
	shop_domain: string;
	customer: {
		id: number;
		email: string;
		phone: string;
	};
	orders_to_redact: number[];
}

interface ShopRedactPayload {
	shop_id: number;
	shop_domain: string;
}

// Define the type for webhook handlers map
type WebhookHandlersMap = {
	[key: string]: WebhookHandler;
};

const webhookHandlers: WebhookHandlersMap = {
	CUSTOMERS_DATA_REQUEST: {
		deliveryMethod: DeliveryMethod.Http,
		callbackUrl: "/api/webhooks",
		callback: async (topic: string, shop: string, body: string, webhookId: string) => {
			const payload: CustomerDataRequestPayload = JSON.parse(body);
			// You can now access the payload with type safety
			console.log(payload.customer.email);
			// Handle the payload as needed
		},
	},

	CUSTOMERS_REDACT: {
		deliveryMethod: DeliveryMethod.Http,
		callbackUrl: "/api/webhooks",
		callback: async (topic: string, shop: string, body: string, webhookId: string) => {
			const payload: CustomerRedactPayload = JSON.parse(body);
			// Access the payload safely
			console.log(payload.customer.id);
			// Handle the payload as needed
		},
	},

	SHOP_REDACT: {
		deliveryMethod: DeliveryMethod.Http,
		callbackUrl: "/api/webhooks",
		callback: async (topic: string, shop: string, body: string, webhookId: string) => {
			const payload: ShopRedactPayload = JSON.parse(body);
			// Access the payload safely
			console.log(payload.shop_id);
			// Handle the payload as needed
		},
	},
};

export default webhookHandlers;
