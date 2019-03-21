import AWS from 'aws-sdk';

const dynamo = new AWS.DynamoDB.DocumentClient();

const createUser = async (id) => {
  const result = await dynamo.update({
    TableName: process.env.TABLE_NAME,
    Key: {
      pk: id,
      sk: 'USER',
    },
    ReturnValues: 'ALL_NEW',
  }).promise();

  return result.Attributes;
};

export default async (event) => {
  const { id } = event;
  const userQuery = await dynamo.query({
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: '#user=:user',
    ExpressionAttributeNames: {
      '#user': 'pk',
    },
    ExpressionAttributeValues: {
      ':user': id,
    },
  }).promise();

  if (!userQuery.Items.length) {
    return createUser(id);
  }

  return userQuery.Items[0];
};
