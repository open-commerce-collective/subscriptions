import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { environment } from '../config/environment'

const httpLink = new HttpLink({
	uri: `https://${environment.shopifyDomain}/admin/api/2023-07/graphql.json`,
	headers: {
		'X-Shopify-Access-Token': environment.shopifyAccessToken || '',
	},
});

export const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache()
})
