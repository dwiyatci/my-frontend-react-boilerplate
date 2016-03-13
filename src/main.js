/**
 * Created by glenn on 29/02/16.
 */

import './styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';

//import { Container } from './components/Container';
//import { HelloWindow } from './components/HelloWindow';
//
//ReactDOM.render(
//  <Router history={browserHistory}>
//    <Route path="/" component={Container}>
//      <IndexRoute component={HelloWindow} />
//    </Route>
//    <Redirect from="/*" to="/" />
//  </Router>,
//  document.querySelector('#app')
//);

import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const initialState = {
  counter: 0,
  posts  : [],
};

const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
const RECEIVE_POSTS     = 'RECEIVE_POSTS';

function counter(state = 0, action) {

  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1;
    case DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
}

function posts(state = [], action) {

  switch (action.type) {
    case RECEIVE_POSTS:
      return [...action.posts];
    default:
      return state;
  }
}

function incrementCounter() {
  return {
    type: INCREMENT_COUNTER,
  };
}

import $ from 'jquery';

function fetchPosts() {
  return (dispatch, getState) => (
    $.ajax({
      url: 'http://jsonplaceholder.typicode.com/posts',

      success(data) {
        dispatch({
          type : RECEIVE_POSTS,
          posts: data,
        });
        dispatch(incrementCounter());
      },
    })
  );
}

const store = createStore(
  combineReducers({
    counter,
    posts,
  }),
  initialState,
  applyMiddleware(
    thunk,
    createLogger()
  )
);

store.dispatch(incrementCounter());
console.log(store.getState().counter);

store.dispatch(fetchPosts()).then(
  () => {
    const str = _(store.getState().posts)
      .map('title')
      .value()
      .join();

    console.log(str);
  }
);
