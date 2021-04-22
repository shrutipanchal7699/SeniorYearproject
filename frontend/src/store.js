import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {productDetailsReducer, productListReducer} from './reducers/productReducers';

const initialState = {
    cart: {
        itemsInCart: localStorage.getItem('itemsInCart') ? JSON.parse(localStorage.getItem('itemsInCart')) : [],
    },
};
//returns a list of products in data.js in frontend
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
    );
    
export default store;