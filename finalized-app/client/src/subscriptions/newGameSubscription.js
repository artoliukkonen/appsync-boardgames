import gql from 'graphql-tag'

export default gql`
  subscription NewGameSubscription {
    addGame {
      id
      name
    }
  }
`;
