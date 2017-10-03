import {
  FETCHING_MESSAGES,
  FETCHING_MESSAGES_SUCCESS,
  CREATE_MESSAGE,
  INCOMING_MESSAGE,
  FINISH_FETCHING
} from '../actions/action_types';

const initialState = {
  loading: true,
  finishFetching: false,
  page: 0,
  messages: []
}

export default function(state = initialState, action) {
  switch(action.type) {
  case FETCHING_MESSAGES:
    return {
      ...state,
      loading: true
    }
  case FETCHING_MESSAGES_SUCCESS:
    return {
      ...state,
      loading: false,
      page: state.page + 1,
      messages: [...action.payload.reverse(), ...state.messages]
    }
  case CREATE_MESSAGE:
    return {
      ...state,
      messages: [...state.messages, action.payload]
    }
  case INCOMING_MESSAGE:
    return {
      ...state,
      messages: [...state.messages, action.payload]
    }
  case FINISH_FETCHING:
    return {
      ...state,
      loading: false,
      finishFetching: true
    }
  }

  return state
}
