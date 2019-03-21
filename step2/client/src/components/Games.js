import React from 'react';
import { Query } from "react-apollo";
import LIST_GAMES from '../queries/listGames';
import GameList from './GameList';
import GameForm from './GameForm';

const Games = () => (
  [
    <Query
      query={LIST_GAMES}
      fetchPolicy='cache-and-network'
      key={1}
    >
      {({ subscribeToMore, ...result }) => (
        <GameList
          {...result}
        />
      )}
    </Query>,
    <GameForm key={2} />
  ]
);

export default Games;
