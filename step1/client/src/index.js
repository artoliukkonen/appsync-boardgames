import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import AWSAppSyncClient from "aws-appsync";
import { BrowserRouter as Router } from "react-router-dom";

import { Rehydrated } from 'aws-appsync-react';
import App from './App';
import './index.css';
import Amplify, { Auth } from "aws-amplify";
import aws_config from './amplify/aws-exports';
import * as serviceWorker from './serviceWorker';

Amplify.configure({
  Auth: {
    identityPoolId: aws_config.aws_cognito_identity_pool_id,
    region: aws_config.aws_appsync_region,
    userPoolId: aws_config.aws_user_pools_id,
    userPoolWebClientId: aws_config.aws_user_pools_web_client_id
  }
});

const authConfig = {
  type: aws_config.aws_appsync_authenticationType,
  credentials: () => Auth.currentCredentials(),
};

const client = new AWSAppSyncClient(
  {
    disableOffline: false,
    url: aws_config.aws_appsync_graphqlEndpoint,
    region: aws_config.aws_appsync_region,
    auth: authConfig,
    complexObjectsCredentials: () => Auth.currentCredentials()
  },
);

const render = Component => {
  return ReactDOM.render(
    <Router>
      <ApolloProvider client={client}>
        <Rehydrated>
          <App />
        </Rehydrated>
      </ApolloProvider>
    </Router>,
    document.getElementById('root')
  );
};

render(App);
serviceWorker.register();

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}
