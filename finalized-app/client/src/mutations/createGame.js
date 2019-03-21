import gql from 'graphql-tag';

export default gql`
mutation CreateGame($input: GameInput!) {
  createGame(input: $input) {
    id
    name
    description
    updatedAt
  }
}`;