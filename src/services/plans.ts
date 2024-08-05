import { Prisma } from '@prisma/client';
import { client } from '../graphql/client';
import { CREATE_SELLING_PLAN_GROUP } from '../graphql/mutations/plans/CREATE_SELLING_PLAN_GROUP';

export const createShopifySellingPlanGroup = async (input: Prisma.SellingPlanGroupCreateInput, resources?: any) => {
	try {
		const response = await client.mutate({
			mutation: CREATE_SELLING_PLAN_GROUP,
			variables: { input, resources },
		})

		const result = response.data.sellingPlanGroupCreate

		if (result.userErrors.length > 0) {
			throw new Error(result.userErrors.map((error: any) => error.message).join(', '))
		}

		return result.sellingPlanGroup
	} catch (error) {
		console.error('Error creating Shopify selling plan group: ', error)
	}
}
