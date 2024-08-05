import express from 'express'
import * as planController from '../controllers/plans'

const router = express.Router()

// router.get('/', subscriptionController.getSubscriptions)
router.post('/', planController.createSellingPlanGroup)

// Eventually I'll implement additional API routes here.

export default router
