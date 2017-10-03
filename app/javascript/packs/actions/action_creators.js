import {
  FETCHING_MESSAGES,
  FETCHING_MESSAGES_SUCCESS,
  CREATE_MESSAGE,
  INCOMING_MESSAGE,
  FINISH_FETCHING
} from './action_types';

import axios from 'axios';
axios.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
axios.defaults.headers.common['Accept'] = 'application/json'

function beginFetching() {
  return {
    type: FETCHING_MESSAGES
  }
}

function receiveMessages(messages) {
  return {
    type: FETCHING_MESSAGES_SUCCESS,
    payload: messages
  }
}

function finishFetching() {
  return {
    type: FINISH_FETCHING
  }
}


export function fetchInitialMessages() {
  return (dispatch) => {
    dispatch(beginFetching());

    return axios.get('/messages')
      .then(response => response.data)
      .then(messages => {
        if (messages.length > 0) {
          dispatch(receiveMessages(messages));
        } else {
          dispatch(finishFetching());
        }
      })
      .catch(error => console.log("Error", error))
  }
}

export function loadMoreMessages() {
  return (dispatch, getState) => {
    const firstMessage = getState().message.messages[0]
    dispatch(beginFetching());

    return axios.get(`/messages/${firstMessage.id}/load_more`)
      .then(response => response.data)
      .then(messages => {
        if (messages.length > 0) {
          dispatch(receiveMessages(messages));
        } else {
          dispatch(finishFetching());
        }
      })
      .catch(error => console.log("Error", error))
  }
}

export function createMessage(message) {
  return (dispatch) => {
    return axios.post('/messages', {
        message: {
          body: message,
        }
      })
  }
}

export function incomingMessage(message) {
  return {
    type: INCOMING_MESSAGE,
    payload: message
  }
}
