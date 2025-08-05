import React from 'react';
import ReactDOM from 'react-dom/client';

import 'modern-normalize';
import './styles/index.css';

import { App } from './components/App/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { setupAuthInterceptor } from './redux/interceptor/authInterceptor.js';

setupAuthInterceptor();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
