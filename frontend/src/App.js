import data from './data';
import Product from './components/Product';

function App() {
  return (
    <div classNameName="grid-container">
            <header classNameName="row">
                <div>
                    <a className = "brand" href="/">FoodChain</a>
                    <a class="flowright" href="/cart">Cart</a>
                    <a class="flowright" href="/signin">Sign In</a>
                </div>
            </header>
            <main>
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
            </main>
            <footer className="row center">All rights are reserved.</footer>
    </div>

  );
}

export default App;
