import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux';
import reducer from './reducers';

export const store = configureStore({reducer: reducer});

const root = ReactDOM.createRoot(
  document.getElementById("root") || document.createElement("div")
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
