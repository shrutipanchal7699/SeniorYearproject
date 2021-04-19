import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {productListReducer} from './reducers/productReducers';

const initialState = {};
//returns a list of products in data.js in frontend
const reducer = combineReducers({
    productList: productListReducer,

})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
    );
    
export default store;