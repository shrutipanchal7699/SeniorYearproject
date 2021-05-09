import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart, checkout } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import HomeScreen from './HomeScreen';

export default function TransactionScreen(props){
    const product_id = props.match.params.id;

    //returns the quantity of the particular product which is  selected.
    const quantity = props.location.search ? Number(props.location.search.split('=')[1]):1;
        
    //defining the dispatch.
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    // getting the items from the cart.    
    const {itemsInCart} = cart;

    const removeFromCartHandler = (id) =>{
        //implement the deletion of the items.
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () =>{
        //unsure about implementation.
        dispatch(checkout())

        // returning back to the HomeScreen.
        props.history.push(`/`);
    }

    useEffect(() =>{
        if(product_id){
            dispatch(addToCart(product_id, quantity));
        }
    }, [dispatch, product_id, quantity]);

    return (
        <div className="row top">
            <br>
            </br>
            <p>
                <br></br>
            </p>
            <br></br>
            <div><Link to="/"> Go back to shopping</Link></div>
            {/* <br></br> */}
            <p></p>
            <p></p>
            {/* <div></div> */}
            <div className="col-2"><br></br><h1><br></br>Transaction in process...</h1>
            <img src="/images/thankyou.jpg" ></img>
            {/* <MessageBox style="background-color: white">                      */}
                    {/* <div className = "img-container" alt=""><img src="/images/thanyou.jpg" ></img></div> */}
                    <p><br></br><b>See you soon!</b><br></br>
                    <br></br>
                    <Link to="/">Want to shop again!</Link>
                    </p>
            
            </div>
            
        </div>
    );
}