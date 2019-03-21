import AWS from 'aws-sdk';
import identityToSub from '../lib/identityToSub';

const dynamo = new AWS.DynamoDB.DocumentClient();

export default async (event) => {
  const { input: { owned, gameId }, identity } = event;

  const user = identityToSub(identity);

  const result = await dynamo.update({
    TableName: process.env.TABLE_NAME,
    Key: {
      pk: `OWNER-${user}`,
      sk: gameId,
    },
    UpdateExpression: 'SET #user = :user, #owned = :owned',
    ExpressionAttributeNames: {
      '#user': 'user',
      '#owned': 'owned',
    },
    ExpressionAttributeValues: {
      ':user': user,
      ':owned': owned,
    },
    ReturnValues: 'ALL_NEW',
  }).promise();

  return result.Attributes;
};
