import express from 'express'
import * as subscriptionController from '../controllers/subscriptionController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router()

router.get('/', authMiddleware, subscriptionController.getSubscriptions)
router.post('/', authMiddleware, subscriptionController.createSubscription)

// Eventually I'll implement additional API routes here.

export default router
