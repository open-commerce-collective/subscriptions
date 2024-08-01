import { Prisma, PrismaClient } from '@prisma/client';
import { createShopifySubscription } from './shopify';
const prisma = new PrismaClient();

// export const getSubscriptions = async () => {
// 	try {
// 		const shopifySubscriptions = await shopifyApi.getShopifySubscriptions()
// 		// Here we might want to sync the Shopify data with local database

// 		return shopifySubscriptions
// 	} catch (error) {
// 		console.error('Error in getSubscriptions: ', error)
// 		throw error
// 	}
// }

export const createSubscription = async (data: Prisma.SubscriptionCreateInput) => {
	try {
		const shopifySubscription = await createShopifySubscription(data)

		const localSubscription = await prisma.subscription.create({
			data: { ...data }
		})
		return { shopifySubscription, localSubscription }
	} catch (error) {
		console.error('Error in createSubscription: ', error)
		throw error
	}
}
