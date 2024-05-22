import { combineReducers } from 'redux';
import { schemas } from 'redux/middleware/clientMiddleware';

const LIST_REQUEST = 'osedu/users/LIST_REQUEST';
const LIST_SUCCESS = 'osedu/users/LIST_SUCCESS';
const LIST_FAIL = 'osedu/users/LIST_FAIL';
const CREATE_REQUEST = 'osedu/users/CREATE_REQUEST';
const CREATE_SUCCESS = 'osedu/users/CREATE_SUCCESS';
const CREATE_FAIL = 'osedu/users/CREATE_FAIL';
const READ_REQUEST = 'osedu/users/READ_REQUEST';
const READ_SUCCESS = 'osedu/users/READ_SUCCESS';
const READ_FAIL = 'osedu/users/READ_FAIL';
const UPDATE_REQUEST = 'osedu/users/UPDATE_REQUEST';
const UPDATE_SUCCESS = 'osedu/users/UPDATE_SUCCESS';
const UPDATE_FAIL = 'osedu/users/UPDATE_FAIL';
const REMOVE_REQUEST = 'osedu/users/REMOVE_REQUEST';
const REMOVE_SUCCESS = 'osedu/users/REMOVE_SUCCESS';
const REMOVE_FAIL = 'osedu/users/REMOVE_FAIL';
const FOLLOW_REQUEST = 'osedu/users/FOLLOW_REQUEST';
const FOLLOW_SUCCESS = 'osedu/users/FOLLOW_SUCCESS';
const FOLLOW_FAIL = 'osedu/users/FOLLOW_FAIL';
const MESSAGE_REQUEST = 'osedu/users/MESSAGE_REQUEST';
const MESSAGE_SUCCESS = 'osedu/users/MESSAGE_SUCCESS';
const MESSAGE_FAIL = 'osedu/users/MESSAGE_FAIL';

// const initialState = {
//   loaded: false
// };

function byId(state = {}, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

function allIds(state = [], action = {}) {
  switch (action.type) {
    case LIST_REQUEST:
    case CREATE_REQUEST:
    case READ_REQUEST:
    case UPDATE_REQUEST:
    case REMOVE_REQUEST:
    case FOLLOW_REQUEST:
    case LIST_SUCCESS:
    case CREATE_SUCCESS:
    case READ_SUCCESS:
    case UPDATE_SUCCESS:
    case REMOVE_SUCCESS:
    case FOLLOW_SUCCESS:
    case LIST_FAIL:
    case CREATE_FAIL:
    case READ_FAIL:
    case UPDATE_FAIL:
    case REMOVE_FAIL:
    case FOLLOW_FAIL:
    default:
      return state;
  }
}

function isFetching(state = false, action = {}) {
  switch (action.type) {
    case LIST_REQUEST:
    case CREATE_REQUEST:
    case READ_REQUEST:
    case UPDATE_REQUEST:
    case REMOVE_REQUEST:
    case FOLLOW_REQUEST:
      return true;
    case LIST_SUCCESS:
    case CREATE_SUCCESS:
    case READ_SUCCESS:
    case UPDATE_SUCCESS:
    case REMOVE_SUCCESS:
    case FOLLOW_SUCCESS:
      return false;
    case LIST_FAIL:
    case CREATE_FAIL:
    case READ_FAIL:
    case UPDATE_FAIL:
    case REMOVE_FAIL:
    case FOLLOW_FAIL:
      return false;
    default:
      return state;
  }
}

function ids(state = [], action = {}) {
  switch (action.type) {
    case LIST_SUCCESS:
      return [...action.result.result];
    default:
      return state;
  }
}

function idsByPage(state = {}, action = {}) {
  switch (action.type) {
    case LIST_SUCCESS:
      if (action.page) {
        return {
          ...state,
          [action.page]: ids(state, action),
        };
      }
      return state;
    default:
      return state;
  }
}

function total(state = null, action = {}) {
  switch (action.type) {
    case LIST_SUCCESS:
      if (action.result && action.result.total) {
        return action.result.total;
      }
      return state;
    default:
      return state;
  }
}

const reducer = combineReducers({
  byId,
  allIds,
  isFetching,
  ids,
  idsByPage,
  total,
});

export default reducer;

// export function isFetching(globalState) {
//   return globalState.users && globalState.users.isFetching;
// }

export function list({ filter = {}, search, limit = 9, page = 1 } = {}) {
  return {
    types: [LIST_REQUEST, LIST_SUCCESS, LIST_FAIL],
    promise: client =>
      client.post('/users/list', {
        data: {
          filter,
          search,
          limit,
          skip: (page - 1) * limit,
        },
      }),
    schema: schemas.USER_ARRAY,
    page,
  };
}

export function create(data) {
  return {
    types: [CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAIL],
    promise: client =>
      client.post('/users/create', {
        data,
      }),
  };
}

export function read(data) {
  return {
    types: [READ_REQUEST, READ_SUCCESS, READ_FAIL],
    promise: client =>
      client.post('/users/get', {
        data,
      }),
    schema: schemas.USER,
  };
}

export function update(data) {
  return {
    types: [UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: client =>
      client.post('/users/update', {
        data,
      }),
    schema: schemas.USER,
  };
}

export function remove(data) {
  return {
    types: [REMOVE_REQUEST, REMOVE_SUCCESS, REMOVE_FAIL],
    promise: client =>
      client.post('/users/remove', {
        data,
      }),
  };
}

export function follow(data) {
  return {
    types: [FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAIL],
    promise: client =>
      client.post('/users/follow', {
        data,
      }),
    schema: schemas.USER,
  };
}

export function message(data) {
  return {
    types: [MESSAGE_REQUEST, MESSAGE_SUCCESS, MESSAGE_FAIL],
    promise: client =>
      client.post('/users/message', {
        data,
      }),
    schema: schemas.USER,
  };
}
