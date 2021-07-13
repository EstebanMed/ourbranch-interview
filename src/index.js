import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from './components/layout';
import User from './components/user/user';
import UserUpdate from './components/user/user-update/user-update';
import client from './services/services'

const Root = () => (
  <Router>
    <ApolloProvider client={client}>
      <Layout>
        <Switch>
          <Route exact path="/">
            <User />
          </Route>
          <Route path="/edit/:email/:name/:role">
            <UserUpdate />
          </Route>
        </Switch>
      </Layout>
    </ApolloProvider>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));