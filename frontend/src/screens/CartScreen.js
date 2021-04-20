import React from 'react';

export default function CartScreen(props){
    const product_id = props.match.params.id;

    //returns the quantity of the particular product which is  selected.
    
    const quantity = props.location.search? Number(props.location.search.split('=')[1]):1;
    return (
        <div>
            <h1>Cart Screen</h1>
            <p>
                Adding to the cart ---  Product Id: {product_id} Quantity: {quantity}
            </p>
        </div>
    );
}