import React from 'react';
import { Switch } from 'antd';
import { Mutation } from "react-apollo";
import { withAuthenticator } from 'aws-amplify-react';
import { SignIn } from "aws-amplify-react";
import ADD_OWNER from '../mutations/addOwner';

const OwnerToggle = ({ game, authData }) => {
  const owned = game.owners.findIndex(i => i.id === authData.attributes.sub) !== -1;
  return (
    <Mutation mutation={ADD_OWNER}>
      {(addOwner) => (
        <p>I got this zhit <Switch defaultChecked={owned} onChange={checked => addOwner({ variables: { input: { owned: checked, gameId: game.id } } })} /></p>
      )}
    </Mutation>)
};

// Don't render button if user is not signed in
class NoSignInForm extends SignIn { }

export default withAuthenticator(OwnerToggle, false, [
  <NoSignInForm />,
]);