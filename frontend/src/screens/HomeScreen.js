import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Product from '../components/Product';

export default function HomeScreen() {
    // defining the hooks
    const [products, setProducts] = useState([]);
    
    // runs only one time, sending an ajax request
    useEffect(() => {
        const fetchData = async () =>{
            //fetching data from axios 
            // array will be transformed from the data in backedn to the data in frontend
            const { data } = await axios.get('/api/products');
            
            //setting the products to the data we are getting from backend.
            setProducts(data);
        };

        //calling the already defined fetchdata here.
        fetchData();
    }, [])
    return(
        <div>
            
        <div className="row center">
                    {/* using products from backend */}
                    {products.map(product => (
                            <Product key={product._id} product={product}></Product>
                              
                        ))
                    }                    
                </div>
                
        </div>
    );
}