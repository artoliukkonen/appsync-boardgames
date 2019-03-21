import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import { Layout } from 'antd';
import Games from './components/Games';
import Game from './components/Game';
import './App.css';

const {
  Header, Footer, Content,
} = Layout;

class App extends Component {
  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ textAlign: "center" }}>
          <Link to="/">
            <h1>Boardgames</h1>
          </Link>
        </Header>
        <Content style={{ padding: 24 }}>
          <Switch>
            <Route path="/" exact component={Games} />
            <Route path="/game/:gameId" component={Game} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>&copy; Nordcloud // Arto Liukkonen</Footer>
      </Layout>
    );
  }
}

export default App;
