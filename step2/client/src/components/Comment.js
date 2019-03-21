import React from 'react';
import {
  Comment, Tooltip, Avatar, Rate
} from 'antd';
import moment from 'moment';

export default ({ user, comment, rating, updatedAt }) => (
  <Comment
    author={user.name || user.id}
    avatar={(
      <Avatar
        src={user.profileUrl || `https://joeschmoe.io/api/v1/${user.id}`}
        alt={user.name || user.id}
      />
    )}
    content={(
      <>
        <span>
          <Tooltip title="Rating">
            <Rate disabled defaultValue={rating} />
          </Tooltip>
        </span>
        <p>{comment}</p>
      </>
    )}
    datetime={(
      <Tooltip title={moment(updatedAt).format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment(updatedAt).fromNow()}</span>
      </Tooltip>
    )}
  />
);
