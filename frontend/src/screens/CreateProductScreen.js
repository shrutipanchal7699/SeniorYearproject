import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function CreateProductScreen(props){

    

    // defining the constants
    const dispatch = useDispatch();
    const[productName, setProductName] = useState('');
    const[location, setLocation] = useState('');
    const[description, setDescription] = useState('');
    const[countInStock, setCountInStock] = useState(1);
    const[price, setPrice] = useState('');
    const[image, setImage] = useState('');    

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const newProduct = useSelector((state)=> state.newProduct);
    //  const { productInfo, loading, error} = newProduct;

    const submitHandler= (e)=> {
        e.preventDefault();
        console.log(productName + " " + location + " "+ description + " "+ countInStock+" "+ price + " "+image  );
         dispatch(createProduct(productName, location, description, countInStock, price, image));
    }

    useEffect(() => {
        //  if(productInfo){
            console.log("hello");
            dispatch(createProduct(productName, location, description, countInStock, price));

            //  props.history.push(redirect);


        //  }
    },
    []);
    

    return(
        <div>
            <form className = "form" onSubmit= {submitHandler}>
                <div>
                    <h1> Create and Add a New Product</h1>
                </div>
                {/* {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant= "danger">{error}</MessageBox> }
                 */}
                {/* Entering the name of the product */}
                <div>
                    <label htmlFor= "productName"> Product Name</label>
                    <input 
                    type= "text" 
                    id= "productName" 
                    placeholder= "Enter the added product name: " 
                    required
                    onChange= { (e)=> setProductName(e.target.value)}
                    ></input>
                </div>

                {/* Entering the location of the product */}
                <div>
                    <label htmlFor= "location"> Enter Location</label>
                    <input 
                    type= "text" 
                    id= "location" 
                    placeholder= "Enter location of the product: " 
                    required
                    onChange= { (e)=> setLocation(e.target.value)}
                    ></input>
                </div>

                {/* selecting the appropriate photo */}

                {/* Entering the product's description */}
                <div>
                    <label htmlFor= "description"> Enter description of the Product</label>
                    <input 
                    type= "text" 
                    id= "description" 
                    placeholder= "Enter description " 
                    required
                    onChange= { (e)=> setDescription(e.target.value)}
                    ></input>
                </div>

                {/* Entering the quantity of the product added by the producer */}
                <div>
                    <label htmlFor= "countInStock"> Count In Stock</label>
                    <input 
                    type= "number" 
                    id= "countInStock" 
                    placeholder= "Enter count of stock" 
                    required
                    onChange= { (e)=> setCountInStock(e.target.value)}
                    ></input>
                </div>

                {/* Entering the price of the product. */}
                <div>
                    <label htmlFor= "price"> Prices</label>
                    <input 
                    type= "text" 
                    id= "price" 
                    placeholder= "Enter price of the product" 
                    required
                    onChange= { (e)=> setPrice(e.target.value)}
                    ></input>
                </div>

                <div>
                    <label for="img">Select image:</label>
                    <input 
                    type="file" 
                    id="img" 
                    name="img" 
                    accept="image/*"
                    onChange= { (e)=> setImage(e.target.value)}
                    ></input>
                </div>
              


                <div>
                    <label/>
                    {/* adding a handler */}
                    <button className = "primary" type = "submit">
                        Add Product to the MarketPlace
                    </button>
                </div>
                
            </form>
        </div>
    )
}