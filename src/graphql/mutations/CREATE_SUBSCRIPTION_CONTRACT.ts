import { gql } from '@apollo/client';

export const CREATE_SUBSCRIPTION_CONTRACT = gql`
mutation createSubscriptionContract($input: SubscriptionContractAtomicCreateInput!) {
    subscriptionContractAtomicCreate(input: $input) {
      subscriptionContract {
        id
        status
        nextBillingDate
        deliveryMethod {
          ... on SubscriptionDeliveryMethodShipping {
            address {
              address1
              address2
              city
              province
              country
              zip
            }
          }
        }
        lines {
          edges {
            node {
              id
              productId
              variantId
              quantity
              requiresShipping
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`
