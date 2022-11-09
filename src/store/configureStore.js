import { combineReducers, createStore } from 'redux';
import reducer from '../reducers/countReducer';
const rootReducer = combineReducers(
    { state : reducer }
);
const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;