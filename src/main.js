/**
 * Created by glenn on 29/02/16.
 */

import './styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';

import { Container } from './components/Container';
import { HelloWindow } from './components/HelloWindow';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Container}>
      <IndexRoute component={HelloWindow} />
    </Route>
    <Redirect from="/*" to="/" />
  </Router>,
  document.querySelector('#app')
);
