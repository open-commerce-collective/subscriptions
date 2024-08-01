import { Request, Response } from 'express';
import * as subscriptionService from '../services/subscriptions'
import { Prisma } from '@prisma/client';

// export const getSubscriptions = async (req: Request, res: Response) => {
// 	try {
// 		const subscriptions = await subscriptionService.getSubscriptions();
// 		res.json(subscriptions)
// 	} catch (error) {
// 		console.error('Error in getSubscriptions controller: ', error)
// 		res.status(500).json({ error: 'Error fetching subscriptions' })
// 	}
// }

export const createSubscription = async (req: Request, res: Response) => {
	try {
		const {
			start_date,
			customer_id,
			plan_id,
			frequency,
			frequency_unit,
			shipping_address,
			shipping_method,
			payment_method_id,
			currency,
			metadata,
			promo_code,
			trial_period,
			is_digital,
			status
		} = req.body;

		const subscriptionData: Prisma.SubscriptionCreateInput = {
			start_date: start_date || new Date().toISOString(),
			customer_id,
			plan_id,
			frequency,
			frequency_unit,
			shipping_address,
			shipping_method,
			payment_method_id,
			currency: currency || 'USD',
			metadata,
			promo_code,
			trial_period,
			is_digital: is_digital || false,
			status: status || 'ACTIVE'
		}

		const subscription = await subscriptionService.createSubscription(subscriptionData)
		res.status(201).json(subscription)
	} catch (error) {
		console.error('Error in createSubscription controller: ', error)
		res.status(500).json({ error: 'Error creating subscription' })
	}
}
