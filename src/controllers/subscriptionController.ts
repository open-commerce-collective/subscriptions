import { Request, Response } from 'express';
import * as subscriptionService from '../services/subscriptionService'

export const getSubscriptions = async (req: Request, res: Response) => {
	try {
		const subscriptions = await subscriptionService.getSubscriptions();
		res.json(subscriptions)
	} catch (error) {
		console.error('Error in getSubscriptions controller: ', error)
		res.status(500).json({ error: 'Error fetching subscriptions' })
	}
}

export const createSubscription = async (req: Request, res: Response) => {
	try {
		const subscription = await subscriptionService.createSubscription(req.body)
		res.status(201).json(subscription)
	} catch (error) {
		console.error('Error in createSubscription controller: ', error)
		res.status(500).json({ error: 'Error creating subscription' })
	}
}
