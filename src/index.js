import './theme/css/bootstrap.css';
import './theme/css/bootstrap-theme.css';
import './theme/css/iconmoon.css';
import './theme/css/jquery.mobile-menu.css';
import './theme/css/style.css';
import './theme/css/cs-smartstudy-plugin.css';
import './theme/css/color.css';
import './theme/css/widget.css';
import './theme/css/responsive.css';

import { createBrowserHistory } from 'history';
import React from 'react';
import { hydrate, render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import './index.scss';
import App from 'components/App/App';
import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';
import * as serviceWorker from './serviceWorker';
import { loadComponents, getState } from 'loadable-components';
window.snapSaveState = () => getState();

const client = new ApiClient();
const history = createBrowserHistory();
const store = createStore(history, client, window.__data);

const rootElement = document.getElementById('content');
if (rootElement.hasChildNodes()) {
  loadComponents().then(() => {
    hydrate(
      <Provider store={store} key="provider">
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>,
      document.getElementById('content')
    );
  });
} else {
  render(
    <Provider store={store} key="provider">
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('content')
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
