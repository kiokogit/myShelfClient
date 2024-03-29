import React from "react";
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';

import reducer from "./reducers/reducers";
import { App } from './App';

// add react redux thunk middlewares
const store = createStore(reducer, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'))
