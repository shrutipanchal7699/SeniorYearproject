import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"
import Axios from "axios";

export const listProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST,
    });

    try{
        const { data } = await Axios.get('/api/products');
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});

    } catch(error){
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
};

//GETTING PRODUCT ID FROM BACKEND AND UPDATE REDUX STORE.
//instead of using productId --> using product_id
export const detailsProduct = (product_id) => async(dispatch)=>{
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: product_id});
    try{
        // getting data from the backend api
        const{ data } = await Axios.get(`/api/products/${product_id}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data});
    }catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};