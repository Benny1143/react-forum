import { combineReducers } from 'redux';
import { schemas } from 'redux/middleware/clientMiddleware';

const LIST_REQUEST = 'osedu/reviews/LIST_REQUEST';
const LIST_SUCCESS = 'osedu/reviews/LIST_SUCCESS';
const LIST_FAIL = 'osedu/reviews/LIST_FAIL';
const CREATE_REQUEST = 'osedu/reviews/CREATE_REQUEST';
const CREATE_SUCCESS = 'osedu/reviews/CREATE_SUCCESS';
const CREATE_FAIL = 'osedu/reviews/CREATE_FAIL';
const READ_REQUEST = 'osedu/reviews/READ_REQUEST';
const READ_SUCCESS = 'osedu/reviews/READ_SUCCESS';
const READ_FAIL = 'osedu/reviews/READ_FAIL';
const UPDATE_REQUEST = 'osedu/reviews/UPDATE_REQUEST';
const UPDATE_SUCCESS = 'osedu/reviews/UPDATE_SUCCESS';
const UPDATE_FAIL = 'osedu/reviews/UPDATE_FAIL';
const REMOVE_REQUEST = 'osedu/reviews/REMOVE_REQUEST';
const REMOVE_SUCCESS = 'osedu/reviews/REMOVE_SUCCESS';
const REMOVE_FAIL = 'osedu/reviews/REMOVE_FAIL';
const LOAD_REQUEST = 'osedu/reviews/LOAD_REQUEST';
const LOAD_SUCCESS = 'osedu/reviews/LOAD_SUCCESS';
const LOAD_FAIL = 'osedu/reviews/LOAD_FAIL';

// const initialState = {
//   loaded: false
// };

function isFetching(state = false, action = {}) {
  switch (action.type) {
    case LIST_REQUEST:
    case CREATE_REQUEST:
    case READ_REQUEST:
    case UPDATE_REQUEST:
    case REMOVE_REQUEST:
    case LOAD_REQUEST:
      return true;
    case LIST_SUCCESS:
    case CREATE_SUCCESS:
    case READ_SUCCESS:
    case UPDATE_SUCCESS:
    case REMOVE_SUCCESS:
    case LOAD_SUCCESS:
      return false;
    case LIST_FAIL:
    case CREATE_FAIL:
    case READ_FAIL:
    case UPDATE_FAIL:
    case REMOVE_FAIL:
    case LOAD_FAIL:
      return false;
    default:
      return state;
  }
}

function ids(state = [], action = {}) {
  switch (action.type) {
    case LIST_SUCCESS:
    case LOAD_SUCCESS:
      return [...action.result.result];
    default:
      return state;
  }
}

const reducer = combineReducers({
  isFetching,
  ids,
});

export default reducer;

// export function isFetching(globalState) {
//   return globalState.reviews && globalState.reviews.isFetching;
// }

export function list(filter = {}) {
  return {
    types: [LIST_REQUEST, LIST_SUCCESS, LIST_FAIL],
    promise: client =>
      client.post('/reviews/list', {
        data: { filter },
      }),
    schema: schemas.REVIEW_ARRAY,
  };
}

export function create(data = {}) {
  return {
    types: [CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAIL],
    promise: client =>
      client.post('/reviews/create', {
        data,
      }),
  };
}

export function read(data = {}) {
  return {
    types: [READ_REQUEST, READ_SUCCESS, READ_FAIL],
    promise: client =>
      client.post('/reviews/get', {
        data,
      }),
    schema: schemas.REVIEW,
  };
}

export function update(data = {}) {
  return {
    types: [UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: client =>
      client.post('/reviews/update', {
        data,
      }),
  };
}

export function remove(data = {}) {
  return {
    types: [REMOVE_REQUEST, REMOVE_SUCCESS, REMOVE_FAIL],
    promise: client =>
      client.post('/reviews/remove', {
        data,
      }),
  };
}

export function load(filter = {}) {
  return {
    types: [LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAIL],
    promise: client =>
      client.post('/reviews/me', {
        data: { filter },
      }),
    schema: schemas.REVIEW_ARRAY,
  };
}
