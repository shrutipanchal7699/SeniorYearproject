import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';

export default function CartScreen(props){
    const product_id = props.match.params.id;

    //returns the quantity of the particular product which is  selected.
    const quantity = props.location.search ? Number(props.location.search.split('=')[1]):1;
    
    //defining the dispatch.
    const dispatch = useDispatch();
    useEffect(() =>{
        if(product_id){
            dispatch(addToCart(product_id, quantity));
        }
    }, [dispatch, product_id, quantity]);

    return (
        <div>
            <h1>Cart Screen</h1>
            <p>
                Adding to the cart ---  Product Id: {product_id} Quantity: {quantity}
            </p>
        </div>
    );
}