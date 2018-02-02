import React from 'react';
import ReactDOM from 'react-dom';
import Leaflet from 'leaflet';
import 'font-awesome/css/font-awesome.min.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import './index.css';
import App from './components/App';
import hofApp from './reducers';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(hofApp, applyMiddleware(thunk));

Leaflet.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
