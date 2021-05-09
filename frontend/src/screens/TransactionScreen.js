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
            {/* </MessageBox> */}
                {/* {itemsInCart.length === 0 ?                                        
                    <MessageBox style="background-color: white">                     
                    <div className = "img-container" alt=""><img src="/images/thanyou.jpg" ></img></div>
                    <p> Oopps!<br></br>The cart is currently empty.<br></br>
                    <br></br>
                    <Link to="/">Go back to shopping and choose the freshies!</Link>
                    </p>
                    </MessageBox>                    
                    :(
                    <ul>
                        {itemsInCart.map((item) => 
                        <li key = {item.product}> 
                        <div className="row">
                            <div>
                                <img src={item.image} alt = {item.name} className="small"></img>
                            </div>
                            <div className="min-30"><Link to={`/product/${item.product}`}>{item.name}</Link></div>
                            <div><select value={item.quantity} 
                            onChange={(e) =>{
                                dispatch( 
                                    addToCart(item.product, Number(e.target.value)))
                            }}>
                              {
                                // returning an array from 0 to that number in stock
                                [...Array(item.countInStock).keys()].map( (x) =>(
                                    <option key={x+1} value={ x + 1}>{x + 1}</option>
                                ))
                              }  
                            </select>
                            </div>
                            <div>
                                ${item.price}
                            </div>
                            <div>
                                <button type="button" onClick = {() => removeFromCartHandler(item.product)}>Delete Items</button>
                            </div>
                        </div> 
                        </li>)}
                    </ul>
                )} */}
            </div>
            
        </div>
    );
}