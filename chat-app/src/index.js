import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

let persistedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState'))
    : {}
if (persistedState.auth) {
    if (persistedState.auth.user.expiresIn * 1000 <= Date.now()) {
        persistedState = {}
    }
}

const store = createStore(rootReducer, persistedState, composeEnhancers(
    applyMiddleware(thunk)
));
store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify({auth: store.getState().auth})) // ở đây là đang lưu vào local
})


const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
