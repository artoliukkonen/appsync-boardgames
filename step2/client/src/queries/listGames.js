import gql from 'graphql-tag';

export default gql`
query listGames {
  listGames {
    id
    name
    reviews {
      rating
      content
    }
    owners {
      id
    }
  }
}
`;