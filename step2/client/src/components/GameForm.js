import React from 'react';
import { Mutation } from 'react-apollo';
import { withAuthenticator } from 'aws-amplify-react';
import { Card, Input, Button } from 'antd';
import CREATE_GAME from '../mutations/createGame';

const { TextArea } = Input;

class GameForm extends React.Component {
  state = {};
  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }
  render() {
    return (
      <Mutation mutation={CREATE_GAME}>
        {(addReview) => (
          <Card title="Add game">
            <form
              onSubmit={e => {
                e.preventDefault();
                addReview({ variables: { input: { ...this.state } } });
                this.setState({});
              }}
            >
              <p>
                <Input placeholder="Title" onChange={this.handleChange} value={this.state.name} name="name" />
              </p>
              <p>
                <TextArea placeholder="Description" onChange={this.handleChange} value={this.state.description} name="description" autosize={{ minRows: 2, maxRows: 6 }} />
              </p>
              <p>
                <Button type="primary" htmlType="submit">Submit</Button>
              </p>
            </form>
          </Card>
        )}
      </Mutation>
    );
  }
}
export default withAuthenticator(GameForm);
