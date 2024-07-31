import axios from 'axios'
import { environment } from '../config/environment'

const shopifyApi = axios.create({
	baseURL: 'https://your-store.myshopify.com/admin/api/2023-04',
	headers: {
		'Content-Type': 'application/json',
		'X-Shopify-Access-Token': environment.shopifyApiSecret
	}
})

const getShopifySubscriptions = async () => {
	try {
		const response = await shopifyApi.get('/subscription_contracts.json')
		return response.data.subscription_contracts
	} catch (error) {
		console.error('Error fetching Shopify subscriptions: ', error)
		throw error
	}
}

const createShopifySubscription = async (subscriptionData: any) => {
	try {
		const response = await shopifyApi.post('/subscription_contracts.json', {
			subscription_contract: subscriptionData,
		})
		return response.data.subscription_contract
	} catch (error) {
		console.error('Error creating Shopify subscription: ', error)
		throw error;
	}
}

export { getShopifySubscriptions, createShopifySubscription }
