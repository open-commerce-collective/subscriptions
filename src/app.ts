import express from 'express'
import { environment } from './config/environment'
import subscriptionRoutes from './routes/subscriptionRoutes'
import { errorMiddleware } from './middleware/errorMiddleware'

const apiVersion = process.env.API_VERSION

const app = express()

app.use(express.json())

app.use(`api/${apiVersion}/subscriptions`, subscriptionRoutes)
// Add other routes here

app.use(errorMiddleware)

app.listen(environment.port, () => {
	console.log(`Server is running on port ${environment.port}`)
})
