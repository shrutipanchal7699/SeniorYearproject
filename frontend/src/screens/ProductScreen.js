import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Product from '../components/Product.js';
import data from '../data';
import { detailsProduct} from '../actions/productActions';
import {useDispatch, useSelector} from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function ProductScreen(props) {
    //loading product details from redux store.js
    const dispatch = useDispatch();
    const product_id = props.match.params.id;
    const productDetails = useSelector( state => state.productDetails);
    const { loading, error, product} = productDetails;
    
    
    //won't show products from the static file in the frontend, 
   // const product = data.products.find(x => x._id === props.match.params.id);
    
   useEffect(() =>{
       dispatch(detailsProduct(product_id));
   }, [dispatch, product_id]);   
      
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
                <div className="row top"> 
                    <div className = "col-2">
                        <img className = "large" src={product.image} alt = {product.name}></img>
                    </div>
                    <div className="col-1">
                        <ul>
                            <li>
                                <h1>{product.name}</h1>
                            </li>
                            <li>
                                Price: ${product.price}
                            </li>
                            <li>
                                Description:
                                <p>
                                    {product.description}
                                </p>
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
                                <li>
                                    <button className="primary block"> Add to Cart</button>
                                </li>                            
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