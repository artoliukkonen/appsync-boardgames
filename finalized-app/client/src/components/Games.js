import React from 'react';
import { Query } from "react-apollo";
import LIST_GAMES from '../queries/listGames';
import GameList from './GameList';
import GameForm from './GameForm';

import GAME_SUBSCRIPTION from '../subscriptions/newGameSubscription';

const Games = () => (
  [
    <Query
      query={LIST_GAMES}
      fetchPolicy='cache-and-network'
      key={1}
    >
      {({ subscribeToMore, ...result }) => (
        <GameList
          subscribeToGames={() =>
            subscribeToMore({
              document: GAME_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newGame = subscriptionData.data.addGame;

                const game = prev.listGames.find(c => c.id === newGame.id);

                if (game) {
                  return prev;
                }
                newGame.owners = [];
                newGame.reviews = [];
                prev.listGames.push(newGame);

                return Object.assign({}, {
                  listGames: prev.listGames,
                });
              }
            })
          }
          {...result}
        />
      )}
    </Query>,
    <GameForm key={2} />
  ]
);

export default Games;
