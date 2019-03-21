
export default (identity) => {
  const parts = identity.cognitoIdentityAuthProvider.split(':');
  const userPoolUserId = parts[parts.length - 1].slice(0, -1);

  return userPoolUserId;
};
