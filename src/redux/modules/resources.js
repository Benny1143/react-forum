import { combineReducers } from 'redux';
import { schemas } from 'redux/middleware/clientMiddleware';
import { list as listUsers, read as readUser } from './users';

const LIST_REQUEST = 'osedu/resources/LIST_REQUEST';
const LIST_SUCCESS = 'osedu/resources/LIST_SUCCESS';
const LIST_FAIL = 'osedu/resources/LIST_FAIL';
const CREATE_REQUEST = 'osedu/resources/CREATE_REQUEST';
const CREATE_SUCCESS = 'osedu/resources/CREATE_SUCCESS';
const CREATE_FAIL = 'osedu/resources/CREATE_FAIL';
const READ_REQUEST = 'osedu/resources/READ_REQUEST';
const READ_SUCCESS = 'osedu/resources/READ_SUCCESS';
const READ_FAIL = 'osedu/resources/READ_FAIL';
const UPDATE_REQUEST = 'osedu/resources/UPDATE_REQUEST';
const UPDATE_SUCCESS = 'osedu/resources/UPDATE_SUCCESS';
const UPDATE_FAIL = 'osedu/resources/UPDATE_FAIL';
const REMOVE_REQUEST = 'osedu/resources/REMOVE_REQUEST';
const REMOVE_SUCCESS = 'osedu/resources/REMOVE_SUCCESS';
const REMOVE_FAIL = 'osedu/resources/REMOVE_FAIL';
const LOAD_REQUEST = 'osedu/resources/LOAD_REQUEST';
const LOAD_SUCCESS = 'osedu/resources/LOAD_SUCCESS';
const LOAD_FAIL = 'osedu/resources/LOAD_FAIL';
const DOWNLOAD_REQUEST = 'osedu/resources/DOWNLOAD_REQUEST';
const DOWNLOAD_SUCCESS = 'osedu/resources/DOWNLOAD_SUCCESS';
const DOWNLOAD_FAIL = 'osedu/resources/DOWNLOAD_FAIL';
const PREVIEW_REQUEST = 'osedu/resources/PREVIEW_REQUEST';
const PREVIEW_SUCCESS = 'osedu/resources/PREVIEW_SUCCESS';
const PREVIEW_FAIL = 'osedu/resources/PREVIEW_FAIL';

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
    case PREVIEW_REQUEST:
    case DOWNLOAD_REQUEST:
      return true;
    case LIST_SUCCESS:
    case CREATE_SUCCESS:
    case READ_SUCCESS:
    case UPDATE_SUCCESS:
    case REMOVE_SUCCESS:
    case LOAD_SUCCESS:
    case PREVIEW_SUCCESS:
    case DOWNLOAD_SUCCESS:
      return false;
    case LIST_FAIL:
    case CREATE_FAIL:
    case READ_FAIL:
    case UPDATE_FAIL:
    case REMOVE_FAIL:
    case LOAD_FAIL:
    case PREVIEW_FAIL:
    case DOWNLOAD_FAIL:
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

function previewsByMainLevel(state = {}, action = {}) {
  switch (action.type) {
    case PREVIEW_SUCCESS:
      return {
        ...state,
        [action.filter.mainLevel]: action.result.data,
      };
    default:
      return state;
  }
}

function previewBySubject(state = {}, action = {}) {
  switch (action.type) {
    case PREVIEW_SUCCESS:
      return {
        ...state,
        [action.filter.subject]: action.result.data,
      };
    default:
      return state;
  }
}

function slugToId(state = {}, action = {}) {
  switch (action.type) {
    case LIST_SUCCESS:
    case LOAD_SUCCESS:
      return {
        ...state,
        ...action.result.data.reduce((result, resource) => {
          result[resource.slug] = resource._id;
          return result;
        }, {}),
      };
    case READ_SUCCESS:
    case DOWNLOAD_SUCCESS:
      return {
        ...state,
        [action.result.data.slug]: action.result.result,
      };
    default:
      return state;
  }
}

function idsByPage(state = {}, action = {}) {
  switch (action.type) {
    case LIST_SUCCESS:
    case LOAD_SUCCESS:
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
    case LOAD_SUCCESS:
      if (action.result && action.result.total) {
        return action.result.total;
      }
      return state;
    default:
      return state;
  }
}

const reducer = combineReducers({
  isFetching,
  ids,
  previewsByMainLevel,
  previewBySubject,
  slugToId,
  idsByPage,
  total,
});

export default reducer;

// export function isFetching(globalState) {
//   return globalState.resources && globalState.resources.isFetching;
// }

export function list({ filter = {}, search, limit = 9, page = 1 } = {}) {
  return dispatch => {
    return dispatch({
      types: [LIST_REQUEST, LIST_SUCCESS, LIST_FAIL],
      promise: client =>
        client.post('/resources/list', {
          data: {
            filter,
            search,
            limit,
            skip: (page - 1) * limit,
          },
        }),
      schema: schemas.RESOURCE_ARRAY,
      page,
    }).then(res => {
      const resources = res.data;
      return dispatch(
        listUsers({
          filter: {
            _id: [...new Set(resources.map(resource => resource.author))],
          },
        })
      ).then(() => {
        return res;
      });
    });
  };
}

export function create(data = {}) {
  return dispatch => {
    return dispatch({
      types: [CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAIL],
      promise: client =>
        client.post('/resources/create', {
          data,
        }),
      schema: schemas.RESOURCE,
    }).then(res => {
      const resource = res.data;
      return dispatch(readUser({ id: resource.author })).then(() => {
        return res;
      });
    });
  };
}

export function read(data = {}) {
  return dispatch => {
    return dispatch({
      types: [READ_REQUEST, READ_SUCCESS, READ_FAIL],
      promise: client =>
        client.post('/resources/get', {
          data,
        }),
      schema: schemas.RESOURCE,
    }).then(res => {
      const resource = res.data;
      return dispatch(readUser({ id: resource.author })).then(() => {
        return res;
      });
    });
  };
}

export function update(data = {}) {
  return dispatch => {
    return dispatch({
      types: [UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAIL],
      promise: client =>
        client.post('/resources/update', {
          data,
        }),
      schema: schemas.RESOURCE,
    }).then(res => {
      const resource = res.data;
      return dispatch(readUser({ id: resource.author })).then(() => {
        return res;
      });
    });
  };
}

export function remove(data = {}) {
  return {
    types: [REMOVE_REQUEST, REMOVE_SUCCESS, REMOVE_FAIL],
    promise: client =>
      client.post('/resources/remove', {
        data,
      }),
  };
}

export function load({ filter = {}, limit = 9, page = 1 } = {}) {
  return {
    types: [LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAIL],
    promise: client =>
      client.post('/resources/me', {
        data: {
          filter,
          limit,
          skip: (page - 1) * limit,
        },
      }),
    schema: schemas.RESOURCE_ARRAY,
    page,
  };
}

export function download(data = {}) {
  return {
    types: [DOWNLOAD_REQUEST, DOWNLOAD_SUCCESS, DOWNLOAD_FAIL],
    promise: client =>
      client.post('/resources/download', {
        data,
      }),
    schema: schemas.RESOURCE,
  };
}

export function preview(filter = {}) {
  return dispatch => {
    return dispatch({
      types: [PREVIEW_REQUEST, PREVIEW_SUCCESS, PREVIEW_FAIL],
      promise: client =>
        client.post('/resources/preview', {
          data: { filter },
        }),
      schema: schemas.RESOURCE_ARRAY,
      filter,
    }).then(res => {
      const resources = res.data;
      return dispatch(
        listUsers({
          filter: {
            _id: [...new Set(resources.map(resource => resource.author))],
          },
        })
      ).then(() => {
        return res;
      });
    });
  };
}
