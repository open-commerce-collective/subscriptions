import { PrismaClient } from '@prisma/client';
import * as shopifyApi from '../utils/shopifyApi'
const prisma = new PrismaClient();

export const getSubscriptions = async () => {
	try {
		const shopifySubscriptions = await shopifyApi.getShopifySubscriptions()
		// Here we might want to sync the Shopify data with local database

		return shopifySubscriptions
	} catch (error) {
		console.error('Error in getSubscriptions: ', error)
		throw error
	}
}

export const createSubscription = async (data: any) => {
	try {
		const shopifySubscription = await shopifyApi.createShopifySubscription(data)
		// Might want to store subscription in local database as well
		const localSubscription = await prisma.subscription.create({
			data: {
				// Map Shopify subscription data to local schema
				customerId: shopifySubscription.customer.id,
				status: shopifySubscription.status
				// ... other fields
			}
		})
		return { shopifySubscription, localSubscription }
	} catch (error) {
		console.error('Error in createSubscription: ', error)
		throw error
	}
}
