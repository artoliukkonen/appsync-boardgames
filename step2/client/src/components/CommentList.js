import React from 'react';
import Comment from './Comment';

export default class CommentList extends React.Component {
  render() {
    const { comments } = this.props;
    return (
      comments.map(r => (
        <Comment
          key={r.id}
          user={r.user}
          comment={r.content}
          rating={r.rating}
          updatedAt={r.updatedAt}
        />
      ))
    )
  }
}