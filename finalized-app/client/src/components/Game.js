import React from 'react';
import { Card } from 'antd';
import { Query } from "react-apollo";
import GET_GAME from '../queries/getGame';
import REVIEW_SUBSCRIPTION from '../subscriptions/newReviewSubscription';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import OwnerToggle from './OwnerToggle';
const Games = (props) => {
  const { match: { params: { gameId } } } = props;

  return (
    <Query
      query={GET_GAME}
      variables={{ gameId }}
      fetchPolicy='cache-and-network'
    >
      {({ subscribeToMore, data }) => {
        if (!data || !data.getGame) return <>Loading...</>;
        return (
          <Card title={data.getGame.name} bordered={false}>
            <OwnerToggle game={data.getGame} />
            <p>
              <img
                style={{ float: 'left', paddingRight: '1rem', paddingBottom: '1rem' }}
                src={data.getGame.pictureUrl || 'https://dummyimage.com/270x350/000000/c2c2c2&text=No image'}
                alt=""
              />
              {data.getGame.description}
            </p>

            <h2 style={{ clear: 'both' }}>Comments</h2>
            {!data.getGame.reviews.length && (
              <p>No comments.</p>
            )}
            <CommentList
              comments={data.getGame.reviews}
              subscribeToComments={() =>
                subscribeToMore({
                  document: REVIEW_SUBSCRIPTION,
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;

                    const newReview = subscriptionData.data.addReview;

                    const r = prev.getGame.reviews.find(c => c.id === newReview.id);

                    if (r) {
                      return prev;
                    }
                    return Object.assign({}, {
                      getGame: {
                        ...prev.getGame,
                        reviews: [...prev.getGame.reviews, newReview]
                      }
                    });
                  }
                })
              }
            />

            <h2>Rate & comment</h2>

            <CommentForm gameId={data.getGame.id} />
          </Card>
        );
      }}
    </Query>
  )
};

export default Games;
