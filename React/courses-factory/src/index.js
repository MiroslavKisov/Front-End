import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import userReducer from './store/reducers/userReducer';
import courseReducer from './store/reducers/courseReducer';
import lectureReducer from './store/reducers/lectureReducer';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import * as Kinvey from 'kinvey-html5-sdk';
import './index.css';
import './static/styles/tailwind.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import 'react-notifications/lib/notifications.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  userReducer: userReducer,
  courseReducer: courseReducer,
  lectureReducer: lectureReducer,
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
serviceWorker.unregister();

//Initializes Kinvey.
Kinvey.init({
  appKey: '',
  appSecret: '',
  masterSecret: '',   
  apiVersion: 5,
  storage: Kinvey.StorageProvider.LocalStorage
});

Kinvey.ping().then(function(response) {
    console.log('Kinvey Ping Success. Kinvey Service is alive, version: ' + response.version + ', response: ' + response.kinvey);
  }).catch(function(error) {
    console.log('Kinvey Ping Failed. Response: ' + error.description);
});
