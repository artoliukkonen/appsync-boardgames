import AWS from 'aws-sdk';
import uuidv4 from 'uuid/v4';
import identityToSub from '../lib/identityToSub';

const dynamo = new AWS.DynamoDB.DocumentClient();

export default async (event) => {
  const { input, identity } = event;
  const id = uuidv4();

  const user = identityToSub(identity);

  const result = await dynamo.update({
    TableName: process.env.TABLE_NAME,
    Key: {
      pk: `REVIEW-${(new Date()).toJSON()}-${id}`,
      sk: input.gameId,
    },
    UpdateExpression: 'SET #creator = :creator, #content = :content, #rating = :rating, #updatedAt = :updatedAt',
    ExpressionAttributeNames: {
      '#creator': 'creator',
      '#content': 'content',
      '#rating': 'rating',
      '#updatedAt': 'updatedAt',
    },
    ExpressionAttributeValues: {
      ':creator': user,
      ':content': input.content || ' ',
      ':rating': input.rating || 0,
      ':updatedAt': (new Date()).toJSON(),
    },
    ReturnValues: 'ALL_NEW',
  }).promise();

  return result.Attributes;
};
