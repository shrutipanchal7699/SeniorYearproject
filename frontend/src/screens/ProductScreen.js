import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
// import Product from '../components/Product.js';
import data from '../data';
import { detailsProduct} from '../actions/productActions';
import {useDispatch, useSelector} from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import CartScreen from './CartScreen';
import { addToCart, removeFromCart } from '../actions/cartActions';


export default function ProductScreen(props) {
    //loading product details from redux store.js
    const dispatch = useDispatch();
    const product_id = props.match.params.id;

    const [quantity, setQuantity] = useState(1);
    const [location, setLocation] = useState(1);
    const productDetails = useSelector( state => state.productDetails);
    const { loading, error, product} = productDetails;

    const cart = useSelector(state => state.cart);
    const {itemsInCart} = cart;
    
    
    //won't show products from the static file in the frontend, 
   // const product = data.products.find(x => x._id === props.match.params.id);
    
   useEffect(() =>{
       dispatch(detailsProduct(product_id));
   }, [dispatch, product_id]);
   
   //defining the addToCartHandler
   const addToCartHandler = () =>{
        props.history.push(`/cart/${product_id} ? quantity=${quantity}`);
     //  props.history.push(`/cart/${product_id} ? location=${product_id}`);
       
   };
      
    // if and else were the other way around earlier.
    if(product){
        //return <div> Could not find the product you requested. </div>
        
        return(
        <div>
            { loading ? (
                <LoadingBox></LoadingBox>
            ) : error? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div>
                <Link to="/">Back to HomeScreen</Link>
                <br></br>
                <p></p>
                <div className="row top"> 
                <br></br>
                {/* <li></li> */}
                <p></p>
                    <div className = "col-2">
                        <img className = "large" src={product.image} alt = {product.name}></img>
                    </div>
                    <div className="col-1">
                        <ul>
                            <li>
                                <h1>{product.name}</h1>
                            </li>
                            <li>
                               <b> Price:</b>  ${product.price}
                            </li>
                            <li>
                                <b>Nutritional Facts: </b>
                                <p>
                                    {product.description}
                                </p>
                            </li>
                            <li>
                                <b>Location Available: </b> {product.location}                               
                            </li>
                            <li>
                            {/* <b>Locations: </b> */}
                                <p>
                                    {/* {product.product_id[0].location }  */}
                                    <li>
                                    {/* <button onClick ={addToCartHandler}className="primary block"> Add to Cart</button> */}
                                    </li>
                                </p>
                                {/* <p>{product.product_id[1].location }</p> */}
                            </li>
                        </ul>
                    </div>
                    <div className="col-1">
                        <div className="card card-body">
                            <ul>
                                <li>
                                    <div className="row">
                                        <div>Price</div>
                                        <div className="price">$ {product.price}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Status</div>
                                        <div>
                                            {product.countInStock > 0 ? (
                                                <span className="success"> In Stock</span>
                                            ) : (
                                                <span className="danger">Unavailable</span>
                                            )}
                                        </div>
                                    </div>
                                </li>
                                {
                                    product.countInStock > 0 && (
                                <>
                                <li>
                                    <div className="row">
                                        <div>
                                           Quantity 
                                        </div>
                                        <div>
                                            <select value={quantity} onChange={e => setQuantity(e.target.value)}>
                                                {
                                                    // returning an array from 0 to that number in stock
                                                    [...Array(product.countInStock).keys()].map( (x) =>(
                                                        <option key={x+1} value={ x + 1}>{x + 1}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    {/* <div>
                                        Locations
                                    </div> */}
                                    {/* adding locations */}
                                    {/* <div>
                                    <select value={location} onChange={e => setLocation(e.target.value)}>
                                                {
                                                    // returning an array from 0 to that number in stock
                                                    [...Array(product.location).keys()].map( (x) =>(
                                                        <option key={x+1} value={ x + 1}>{x + 1}</option>
                                                    ))
                                                }
                                            </select>
                                    </div> */}
                                    <ul>
                                    {/* <b>Locations</b>
                                    {product.product_id.map((value, index) => {
                                        return 
                                    <li>
                                    <button onClick ={addToCartHandler}className="smallAdd">  {product.product_id[index].location} </button>
                                    </li>
                                    })} */}
                                </ul>

                                </li>

                            {/* <li>
                            <b>Locations: </b>
                                <p>
                                    {product.product_id[0].location } 
                                    <li>
                                    <button onClick ={addToCartHandler}className="smallAdd">  {product.product_id[0].location} </button>
                                    </li>
                                </p>
                                <p>{product.product_id[1].location }
                                <li>
                                    <button onClick ={addToCartHandler}className="smallAdd"> Add </button>
                                </li>
                                </p>
                            </li> */}
                                <li>
                                {/* <ul>
                                    <b>Locations</b>
                                    {product.product_id.map((value, index) => {
                                        return 
                                    <li>
                                    <button onClick ={addToCartHandler}className="smallAdd">  {product.product_id[index].location} </button>
                                    </li>
                                    })}
                                </ul> */}                               
                                
                                    <button onClick ={addToCartHandler}className="primary block"> Add to Cart</button>
                                </li> 
                                </>                                 
                                    )
                                }
                                                          
                            </ul>
                        </div>

                    </div>
                    {/* to show what is already in the cart on the right side of the screen */}
                    <div className="col-1">
                        <div className="card card-body">
                            {/* <Route path="/cart/:id?" component={CartScreen}></Route> */}
                        <h2>Shopping Cart</h2>
                        <ul>
                        {itemsInCart.map((item) => 
                        <li key = {item.product}> 
                        <div className="row">
                            <div>
                                <img src={item.image} alt = {item.name} className="MoreSmall"></img>
                                &nbsp;
                                {/* <div className="min-30"><Link to={`/product/${item.product}`}>{item.name}</Link></div> */}
                                <b>&nbsp;<Link to={`/product/${item.product}`}>{item.name}</Link></b>
                                {/* ${item.price} */}
                            </div>
                            {/* <div className="min-30"><Link to={`/product/${item.product}`}>{item.name}</Link></div> */}
                           
                            <div>
                                Quantity: {item.quantity}
                                <select value={item.quantity} 
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
                            {/* ${item.price} */}
                            </div>

                            {/* adding locations */}
                            {/* <div>
                            <select value={item.location} 
                            onChange={(e) =>{
                                dispatch( 
                                    addToCart(item.product, Number(e.target.value)))
                            }}>
                              {
                                // returning an array from 0 to that number in stock
                                [...Array(item.location).keys()].map( (x) =>(
                                    <option key={x+1} value={ x + 1}>{x + 1}</option>
                                ))
                              }  
                            </select>
                            </div> */}
                            <div>
                                ${item.price}
                            </div>
                            {/* <div>
                                <button type="button" onClick = {() => removeFromCartHandler(item.product)}>Delete Items</button>
                            </div> */}
                        </div> 
                        </li>)}
                    </ul>
                        </div>
                    </div>
                </div>
            </div>
         
            )}       
        </div>
        )
    }
    return(
        <div> Could not find the product you requested. </div>
        // <div>
        //     { loading ? (
        //         <LoadingBox></LoadingBox>
        //     ) : error? (
        //         <MessageBox variant="danger">{error}</MessageBox>
        //     ) : (
        //         <div>
        //         <Link to="/">Back to HomeScreen</Link>
        //         <div className="row top"> 
        //             <div className = "col-2">
        //                 <img className = "large" src={product.image} alt = {product.name}></img>
        //             </div>
        //             <div className="col-1">
        //                 <ul>
        //                     <li>
        //                         <h1>{product.name}</h1>
        //                     </li>
        //                     <li>
        //                         Price: ${product.price}
        //                     </li>
        //                     <li>
        //                         Description:
        //                         <p>
        //                             {product.description}
        //                         </p>
        //                     </li>
        //                 </ul>
        //             </div>
        //             <div className="col-1">
        //                 <div className="card card-body">
        //                     <ul>
        //                         <li>
        //                             <div className="row">
        //                                 <div>Price</div>
        //                                 <div className="price">$ {product.price}</div>
        //                             </div>
        //                         </li>
        //                         <li>
        //                             <div className="row">
        //                                 <div>Status</div>
        //                                 <div>
        //                                     {product.countInStock > 0 ? (
        //                                         <span className="success"> In Stock</span>
        //                                     ) : (
        //                                         <span className="danger">Unavailable</span>
        //                                     )}
        //                                 </div>
        //                             </div>
        //                         </li>
        //                         <li>
        //                             <button className="primary block"> Add to Cart</button>
        //                         </li>                            
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
         
        //     )}       
        // </div>  
                
    );
}