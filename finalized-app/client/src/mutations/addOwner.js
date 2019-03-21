import gql from 'graphql-tag';

export default gql`
mutation AddOwner($input: OwnerInput!) {
  addOwner(input: $input) {
    id
    name
    description
    updatedAt
    reviews {
      id
      updatedAt
      user {
        id
      }
      content
      rating
    }
  }
}`;