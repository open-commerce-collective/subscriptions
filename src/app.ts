import express from 'express'
import { environment } from './config/environment'
import subscriptionRoutes from './routes/subscriptions'
import { errorMiddleware } from './middleware/errorMiddleware'
import shopify from './config/shopify'

const app = express()

app.use(express.json())

app.get('/', shopify.ensureInstalledOnShop(), (req, res) => {
	res.send('Hello world!')
})
// Auth API
app.get(shopify.config.auth.path, shopify.auth.begin())
app.get(
	shopify.config.auth.callbackPath,
	shopify.auth.callback(),
	shopify.redirectToShopifyOrAppRoot()
)
// Webhooks

// Subscriptions API
app.use(`/api/subscriptions/`, subscriptionRoutes)

app.use(errorMiddleware)

app.listen(environment.port, () => {
	console.log(`Server is running on port ${environment.port}`)
})
