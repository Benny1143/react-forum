import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import createMiddleware from './middleware/clientMiddleware';
import analytics from './middleware/analytics';

export default function createStore(history, client, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [
    createMiddleware(client),
    reduxRouterMiddleware,
    thunk,
    loadingBarMiddleware({
      promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAIL'],
    }),
  ];

  let finalCreateStore;
  if (
    process.env.NODE_ENV === 'development' &&
    process.env.REACT_APP_DEVTOOLS === 'true'
  ) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../components/DevTools/DevTools').default;
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  } else {
    const composeEnhancers =
      typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            features: {
              pause: true, // start/pause recording of dispatched actions
              lock: true, // lock/unlock dispatching actions and side effects
              persist: true, // persist states on page reloading
              export: true, // export history of actions in a file
              import: 'custom', // import history of actions from a file
              jump: true, // jump back and forth (time travelling)
              skip: true, // skip (cancel) actions
              reorder: true, // drag and drop actions in the history list
              dispatch: true, // dispatch custom actions or action creators
              test: true, // generate tests for the selected actions
            },
          })
        : compose;
    finalCreateStore = composeEnhancers(
      applyMiddleware(...middleware, analytics)
    )(_createStore);
  }

  const reducer = require('./modules/reducer').default;
  const store = finalCreateStore(reducer(history), data);

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      const reducer = require('./modules/reducer').default;
      store.replaceReducer(reducer(history));
    });
  }

  return store;
}
