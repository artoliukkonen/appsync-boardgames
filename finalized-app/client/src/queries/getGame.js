import gql from 'graphql-tag';

export default gql`
query GetGame($gameId: ID!) {
  getGame(gameId: $gameId) {
    id
    name
    description
    updatedAt
    owners {
      id
    }
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
}
`;