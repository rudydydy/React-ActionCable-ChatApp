import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Lobby from './components/lobby';

const rootDOM = document.getElementById('root');
const current_user_id = parseInt(rootDOM.getAttribute('data-current-user-id'));

ReactDOM.render(
  <Provider store={store}>
    <Lobby current_user_id={current_user_id} />
  </Provider>
  , rootDOM
);
