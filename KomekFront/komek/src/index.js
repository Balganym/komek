import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './configureStore';

const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

const store = configureStore();
render(
  <Root store={store} />,
  document.getElementById('root')
);
