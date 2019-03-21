import React from 'react';
import { Mutation } from 'react-apollo';
import { withAuthenticator } from 'aws-amplify-react';
import { Rate, Input, Button } from 'antd';
import CREATE_REVIEW from '../mutations/createReview';

const { TextArea } = Input;

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

class CommentForm extends React.Component {
  state = {};
  handleChange = ({ target: { value } }) => {
    this.setState({ comment: value });
  }

  handleStarChange = (value) => {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    return (
      <Mutation mutation={CREATE_REVIEW}>
        {(addReview, { data }) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                addReview({ variables: { input: { content: this.state.comment, rating: this.state.value, gameId: this.props.gameId } } });
                this.setState({ value: null, comment: null });
              }}
            >
              <p>
                <TextArea placeholder="Comment" onChange={this.handleChange} value={this.state.comment} name="comment" autosize={{ minRows: 2, maxRows: 6 }} />
              </p>
              <div>
                <Rate tooltips={desc} onChange={this.handleStarChange} value={value} />
                {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
              </div>
              <p>
                <Button type="primary" htmlType="submit">Submit</Button>
              </p>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withAuthenticator(CommentForm);