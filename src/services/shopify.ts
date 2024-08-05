import { Prisma } from '@prisma/client';
import { client } from '../graphql/client';
import { CREATE_SUBSCRIPTION_CONTRACT } from '../graphql/mutations/CREATE_SUBSCRIPTION_CONTRACT';
import { calculateNextBillingDate } from '../utils/calculateNextBillingDate';


export const createShopifySellingPlanGroup = async () => {

}

export const createShopifySubscription = async (data: Prisma.SubscriptionCreateInput) => {
	const nextBillingDate = calculateNextBillingDate(data.start_date, data.frequency, data.frequency_unit)
	const variables = {
		input: {
			contract: {
				customerId: data.customer_id,
				currencyCode: data.currency,
				nextBillingDate,
				billingPolicy: {
					interval: data.frequency_unit.toUpperCase(),
					intervalCount: data.frequency,
				},
				deliveryPolicy: {
					interval: data.frequency_unit.toUpperCase(),
					intervalCount: data.frequency,
				},
				lines: (data.lines as Prisma.SubscriptionLineDefaultArgs[]).map((item: any) => ({
					productVariant: { id: item.productVariantId },
					quantity: item.quantity,
					sellingPlanId: data.plan_id,
				})),
				paymentMethodId: data.payment_method_id,
			},
			...(data.shipping_address && {
				deliveryMethod: {
					shipping: {
						address: data.shipping_address,
					},
				},
			}),
			...(data.promo_code && { discountCodes: [data.promo_code] }),
		},
	};
	try {
		const response = await client.mutate({
			mutation: CREATE_SUBSCRIPTION_CONTRACT,
			variables,
		});

		const result = response.data.subscriptionContractAtomicCreate;

		if (result.userErrors.length > 0) {
			throw new Error(result.userErrors.map((error: any) => error.message).join(', '));
		}

		return result.subscriptionContract;
	} catch (error) {
		console.error('Error creating Shopify subscription:', error);
		throw error;
	}
}
