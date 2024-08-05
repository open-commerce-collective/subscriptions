import { gql } from '@apollo/client';

export const REMOVE_PRODUCTS_FROM_SELLING_PLAN_GROUP = gql`
  mutation removeProductsFromSellingPlanGroup($id: ID!, $productIds: [ID!]!) {
    sellingPlanGroupRemoveProducts(id: $id, productIds: $productIds) {
      removedProductIds
      userErrors {
        field
        message
      }
    }
  }
`;
