
import AWS from 'aws-sdk';

const dynamo = new AWS.DynamoDB.DocumentClient();

export default async (event) => {
  const { id } = event;
  const gameQuery = await dynamo.query({
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: '#gameId=:gameId',
    ExpressionAttributeNames: {
      '#gameId': 'pk',
    },
    ExpressionAttributeValues: {
      ':gameId': `${id}`,
    },
  }).promise();

  if (!gameQuery.Items.length) {
    throw new Error('Not found');
  }

  const game = gameQuery.Items[0];

  return game;
};
