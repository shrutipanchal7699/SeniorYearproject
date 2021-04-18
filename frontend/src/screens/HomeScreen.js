import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function HomeScreen() {
    // defining the hooks
    const [products, setProducts] = useState([]);

    //default setting is false, as it doesn't load anything
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);
    
    // runs only one time, sending an ajax request
    useEffect(() => {
        const fetchData = async () =>{

            try{
                setLoading(true);
            
                //fetching data from axios 
                // array will be transformed from the data in backedn to the data in frontend
                const { data } = await axios.get('/api/products');
                setLoading(false);
    
                //setting the products to the data we are getting from backend.
                setProducts(data);
            }catch(err){
                setError(err.message);
                setLoading(false);
            }
            
            
        };

        //calling the already defined fetchdata here.
        fetchData();
    }, [])
    return(
        <div>
            { loading ? (
                <LoadingBox></LoadingBox>
            ) : error? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                    <div className="row center">
                    {/* using products from backend */}
                    {products.map(product => (
                            <Product key={product._id} product={product}></Product>
                              
                ))}                    
            </div>
        )}       
    </div>
    );
}