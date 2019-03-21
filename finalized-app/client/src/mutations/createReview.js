import gql from 'graphql-tag';

export default gql`
mutation CreateReview($input: ReviewInput!) {
  createReview(input: $input) {
    id
    content
    rating
    updatedAt
    user {
      id
    }
  }
}`;