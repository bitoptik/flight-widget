import { createStore, combineReducers } from 'redux';
import widgetReducer from './reducers/widget';

const rootReducer = combineReducers({
    widget: widgetReducer
});

const store = createStore(
    rootReducer
);

export default store;
