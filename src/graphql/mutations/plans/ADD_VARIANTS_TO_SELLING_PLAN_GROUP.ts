import { gql } from '@apollo/client';

export const ADD_VARIANTS_TO_SELLING_PLAN_GROUP = gql`
  mutation addVariantsToSellingPlanGroup($id: ID!, $productVariantIds: [ID!]!) {
    sellingPlanGroupAddProductVariants(id: $id, productVariantIds: $productVariantIds) {
      sellingPlanGroup {
        id
        productVariantCount
      }
      userErrors {
        field
        message
      }
    }
  }
`;
