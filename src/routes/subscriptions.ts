import express from 'express'
import * as subscriptionController from '../controllers/subscriptions'

const router = express.Router()

// router.get('/', subscriptionController.getSubscriptions)
router.post('/', subscriptionController.createSubscription)

// Eventually I'll implement additional API routes here.

export default router
