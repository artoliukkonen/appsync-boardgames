import AWS from 'aws-sdk';

const dynamo = new AWS.DynamoDB.DocumentClient();

export default async (event) => {
  const { gameId } = event;
  const reviewQuery = await dynamo.query({
    TableName: process.env.TABLE_NAME,
    IndexName: 'GSI1',
    KeyConditionExpression: '#gameId=:gameId AND begins_with(#review,:review)',
    ScanIndexForward: true,
    ExpressionAttributeNames: {
      '#gameId': 'sk',
      '#review': 'pk',
    },
    ExpressionAttributeValues: {
      ':gameId': gameId,
      ':review': 'REVIEW-',
    },
  }).promise();

  const reviews = reviewQuery.Items;

  return reviews;
};
