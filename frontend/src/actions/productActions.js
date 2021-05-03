import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"
import Axios from "axios";

export const listProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST,
    });

    try{
        const currToken = localStorage.getItem("userToken");
         //console.log(currToken)
        const { data } = await Axios.get('http://localhost:5000/products/',
        {
            headers: {
                'authorization' : 'bearer '.concat(currToken) ,
            }
        });
        //console.log(data)
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data.products});

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
        // console.log("Finding product id")
        // console.log(product_id)
        const{ data } = await Axios.get(`http://localhost:5000/products/${product_id}`);
        //console.log(data)
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