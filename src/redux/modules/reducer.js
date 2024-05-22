import { combineReducers } from 'redux';
// import multireducer from 'multireducer';
import { connectRouter } from 'connected-react-router';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { loadingBarReducer } from 'react-redux-loading-bar';

import entities from './entities';
// import pagination from './pagination';
import auth from './auth';
import config from './config';
import users from './users';
import resources from './resources';
import reviews from './reviews';
// import counter from './counter';
// import info from './info';
// import widgets from './widgets';
import modals from './modals';
import s3 from './s3';

import { LOGOUT } from './auth';

const appReducer = (history) => combineReducers({
  entities,
  // pagination,
  router: connectRouter(history),
  toastr: toastrReducer,
  loadingBar: loadingBarReducer,
  auth,
  config,
  users,
  resources,
  reviews,
  // multireducer: multireducer({
  //   counter1: counter,
  //   counter2: counter,
  //   counter3: counter
  // }),
  // info,
  // widgets,
  modals,
  s3,
});

const rootReducer = (history) => (state, action) => {
  if (action.type === LOGOUT) {
    // reset state except for config
    const resettedState = Object.keys(state).reduce((acc, key) => {
      if (key === 'config') {
        acc[key] = state[key];
      } else {
        acc[key] = undefined;
      }
      return acc;
    }, {});
    return appReducer(history)(resettedState, action);
  }
  return appReducer(history)(state, action);
};

export default rootReducer;
