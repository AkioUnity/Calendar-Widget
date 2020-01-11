// @flow
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import {composeWithDevTools} from "remote-redux-devtools";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {persistStore, persistReducer, persistCombineReducers} from "redux-persist";
import reducers from "../reducers";
import {createLogger} from "redux-logger";

let middlewares = [thunk];

if (__DEV__) {
    middlewares.push(createLogger({}));
}

const persistConfig = {
    key: 'root',
    storage,
};

const compose = composeWithDevTools({realtime: true, fport: 8000});

export default function configureStore(onCompletion: () => void): any {
    const enhancer = compose(applyMiddleware(...middlewares));

    const reducer = persistCombineReducers(persistConfig, reducers);  //v5
    // const persistedReducer = persistReducer(persistConfig, reducer);
    const store = createStore(reducer, enhancer);
    let persistor = persistStore(store, null, onCompletion);
    return store;
}
