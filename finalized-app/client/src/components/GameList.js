import React, { Component } from 'react';
import { List, Icon, Card } from 'antd';
import { Link } from 'react-router-dom';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class GameList extends Component {
  componentDidMount() {
    this.props.subscribeToGames();
  }

  render() {
    if (!this.props.data) {
      return <>Loading...</>
    }

    const games = this.props.data.listGames;

    return (
      <Card bordered={false}>
        <List
          itemLayout="horizontal"
          size="large"
          grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3, }}
          pagination={{
            pageSize: 6,
          }}
          dataSource={games}
          renderItem={item => {
            const rating = Math.round(item.reviews.reduce((t, r) => t += r.rating, 0) / item.reviews.filter(r => !!r.rating).length * 10 || 0) / 10;
            return (
              <Link to={`/game/${item.id}`}>
                <List.Item
                  key={item.name}
                  actions={[<IconText type="user" text={item.owners.length} />, <IconText type="star-o" text={rating} />, <IconText type="message" text={item.reviews.filter(r => !!r.content).length} />]}
                  extra={<img width={272} alt="logo" src={item.pictureUrl || 'https://dummyimage.com/250x250/000000/c2c2c2&text=No image'} />}
                >
                  <List.Item.Meta
                    title={item.name}
                  />
                </List.Item>
              </Link>
            )
          }
          }
        />
      </Card>
    )
  }
}

export default GameList;
