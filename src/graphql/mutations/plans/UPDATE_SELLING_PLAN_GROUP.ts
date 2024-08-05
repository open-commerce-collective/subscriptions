import { gql } from '@apollo/client';

export const UPDATE_SELLING_PLAN_GROUP = gql`
  mutation updateSellingPlanGroup($id: ID!, $input: SellingPlanGroupInput!) {
    sellingPlanGroupUpdate(id: $id, input: $input) {
      sellingPlanGroup {
        id
        name
      }
      userErrors {
        field
        message
      }
    }
  }
`;
