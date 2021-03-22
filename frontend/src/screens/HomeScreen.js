import React from 'react';
import Product from '../components/Product';
import data from '../data';

export default function HomeScreen() {
    return(
        <div>
            
        <div className="row center">
                    {data.products.map(product => (
                            <Product key={product._id} product={product}></Product>
                        //     <div key={product._id} className="card">
                        //     <a href={`/product/${product._id}`}>
                        //         <img 
                        //         className="medium" 
                        //         src={product.image} 
                        //         alt={product.name}
                        //         />
                        //     </a>
                        //     <div className="card-body">
                        //         <a href={`/product/${product._id}`}>
                        //             <h2>{product.name}</h2>
                        //         </a>
                            
                        //         <div className="price">
                        //            ${product.price} /pound.
                        //         </div>
                        //     </div>
                        // </div>
                        
                        ))
                    }                    
                </div>
                
        </div>
    );
}