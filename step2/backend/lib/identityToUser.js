import AWS from 'aws-sdk';

const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });
const cognitoIdentity = new AWS.CognitoIdentity({ apiVersion: '2014-06-30' });

const listUsers = async (token, filter, limit) => {
  console.log('listUsers:', filter);
  const params = {
    UserPoolId: process.env.USER_POOL_ID,
    Filter: filter,
    PaginationToken: token,
    Limit: limit,
  };
  const response = await cognito.listUsers(params).promise();
  console.log('response:', response);
  const {
    Users: users,
    PaginationToken: nextToken,
  } = response;
  return {
    users,
    token: nextToken,
  };
};

const getUserBySub = async (userSub) => {
  console.log('getting cognito user by sub:', userSub);
  const filter = `sub = "${userSub}"`;
  const { users } = await listUsers(null, filter);
  console.log('cognito users:', users);
  const user = users.length ? users[0] : null;
  return user;
};

export default async (identity) => {
  const parts = identity.cognitoIdentityAuthProvider.split(':');
  const userPoolUserId = parts[parts.length - 1].slice(0, -1);

  const user = await getUserBySub(userPoolUserId);
  return user;
};
