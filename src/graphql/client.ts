import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'
import { LATEST_API_VERSION } from '@shopify/shopify-api';
import { environment } from '../config/environment'
import { getSessionToken } from '../utils/sessionStorage';

const httpLink = new HttpLink({
	uri: `https://${environment.shopifyDomain}/admin/api/${LATEST_API_VERSION}/graphql.json`,
});

const authLink = new ApolloLink((operation, forward) => {
	const token = getSessionToken()
	operation.setContext({
		headers: {
			'X-Shopify-Access-Token': token || '',
		},
	})
	return forward(operation)
})

export const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
})
