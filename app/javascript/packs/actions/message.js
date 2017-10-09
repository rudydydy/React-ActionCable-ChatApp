import axios from 'axios';
import {
  FETCHING_MESSAGES,
  FETCHING_MESSAGES_SUCCESS,
  CREATE_MESSAGE,
  INCOMING_MESSAGE,
  FINISH_FETCHING
} from './action_types';

const csrf_token = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
axios.defaults.headers.common['X-CSRF-Token'] = csrf_token;
axios.defaults.headers.common['Accept'] = 'application/json';

const beginFetching = () => {
  return {
    type: FETCHING_MESSAGES
  }
}

const receiveMessages = (messages) => {
  return {
    type: FETCHING_MESSAGES_SUCCESS,
    payload: messages
  }
}

const finishFetching = () => {
  return {
    type: FINISH_FETCHING
  }
}

export const fetchInitialMessages = () => (dispatch) => {
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
}

export const loadMoreMessages = () => (dispatch, getState) => {
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
}

export const createMessage = (message) => (dispatch) => {
  return axios.post('/messages', {
    message: {
      body: message,
    }
  })
}

export const incomingMessage = (message) => {
  return {
    type: INCOMING_MESSAGE,
    payload: message
  }
}

// export function fetchInitialMessages() {
//   return (dispatch) => {
//     dispatch(beginFetching());
//
//     return axios.get('/messages')
//       .then(response => response.data)
//       .then(messages => {
//         if (messages.length > 0) {
//           dispatch(receiveMessages(messages));
//         } else {
//           dispatch(finishFetching());
//         }
//       })
//       .catch(error => console.log("Error", error))
//   }
// }

// export function loadMoreMessages() {
//   return (dispatch, getState) => {
//     const firstMessage = getState().message.messages[0]
//     dispatch(beginFetching());
//
//     return axios.get(`/messages/${firstMessage.id}/load_more`)
//       .then(response => response.data)
//       .then(messages => {
//         if (messages.length > 0) {
//           dispatch(receiveMessages(messages));
//         } else {
//           dispatch(finishFetching());
//         }
//       })
//       .catch(error => console.log("Error", error))
//   }
// }
//
// export function createMessage(message) {
//   return (dispatch) => {
//     return axios.post('/messages', {
//         message: {
//           body: message,
//         }
//       })
//   }
// }
//
// export function incomingMessage(message) {
//   return {
//     type: INCOMING_MESSAGE,
//     payload: message
//   }
// }
