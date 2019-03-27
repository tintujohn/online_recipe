import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import App from './App';
import rootReducer from './reducers';
import { fetchUserData } from './actions/index';

const store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(fetchUserData());
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
