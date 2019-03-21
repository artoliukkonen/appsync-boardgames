import gql from 'graphql-tag'

export default gql`
  subscription NewReviewSubscription {
    addReview {
      id
      content
      rating
      user {
        id
      }
    }
  }
`;
