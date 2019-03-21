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
      pk: `${(new Date()).toJSON()}-${id}`,
      sk: 'GAME',
    },
    UpdateExpression: 'SET #creator = :creator, #name = :name, #description = :description, #updatedAt = :updatedAt',
    ExpressionAttributeNames: {
      '#creator': 'creator',
      '#name': 'name',
      '#description': 'description',
      '#updatedAt': 'updatedAt',
    },
    ExpressionAttributeValues: {
      ':creator': user,
      ':name': input.name,
      ':description': input.description || ' ',
      ':updatedAt': (new Date()).toJSON(),
    },
    ReturnValues: 'ALL_NEW',
  }).promise();

  return result.Attributes;
};
