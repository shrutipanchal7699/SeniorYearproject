import {CART_CHECKOUT,CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
import Axios from "axios";


export const addToCart = (product_id, quantity) => async(dispatch, getState) =>{
    //sending an ajax request to server to get the info of the resp product_id.
    const {data} = await Axios.get(`http://localhost:5000/products/${product_id}`);

    //requesting to add the below product to the Cart.
    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            location: data.location,
            product: data._id,
            quantity,
        },
    });
    
    // saving whatever is in the cart to the local Storage.
    localStorage.setItem('itemsInCart', JSON.stringify(getState().cart.itemsInCart));


};
// checkout
export const checkout = () => async(dispatch, getState) =>{
    console.log(localStorage.getItem("itemsInCart"))
    const {data} = await Axios.post(`/api/products/`,
    {
        "body": localStorage.getItem("itemsInCart")
    });
    localStorage.removeItem("itemsInCart");

    dispatch({type: CART_CHECKOUT, payload: localStorage.getItem("itemsInCart")});
    localStorage.setItem('itemsInCart',JSON.stringify(getState().cart.itemsInCart));
}

//adding removing from cart.
export const removeFromCart = (product_id) => (dispatch, getState) =>{
    dispatch({type: CART_REMOVE_ITEM, payload: product_id});
    localStorage.setItem('itemsInCart',JSON.stringify(getState().cart.itemsInCart));
}