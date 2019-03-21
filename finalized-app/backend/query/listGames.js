
import AWS from 'aws-sdk';

const dynamo = new AWS.DynamoDB.DocumentClient();

export default async () => {
  const gameQuery = await dynamo.query({
    TableName: process.env.TABLE_NAME,
    IndexName: 'GSI1',
    ScanIndexForward: true,
    KeyConditionExpression: '#type=:type',
    ExpressionAttributeNames: {
      '#type': 'sk',
    },
    ExpressionAttributeValues: {
      ':type': 'GAME',
    },
  }).promise();

  const games = gameQuery.Items;

  return games;
};
