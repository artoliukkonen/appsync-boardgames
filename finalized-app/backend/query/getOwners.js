
import AWS from 'aws-sdk';

const dynamo = new AWS.DynamoDB.DocumentClient();

export default async (event) => {
  const { gameId } = event;
  const ownerQuery = await dynamo.query({
    TableName: process.env.TABLE_NAME,
    IndexName: 'GSI1',
    KeyConditionExpression: '#gameId=:gameId AND begins_with(#owner,:owner)',
    ExpressionAttributeNames: {
      '#gameId': 'sk',
      '#owner': 'pk',
    },
    ExpressionAttributeValues: {
      ':gameId': gameId,
      ':owner': 'OWNER-',
    },
  }).promise();

  const items = ownerQuery.Items;

  // Map "user" as "id"
  items.map(i => i.id = i.user);

  return items.filter(i => i.owned);
};
