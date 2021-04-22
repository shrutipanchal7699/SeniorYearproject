
import { useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';


function App() {

  const cart = useSelector(state => state.cart);
  const {itemsInCart} = cart;

  return (
    <BrowserRouter>
    <div classNameName="grid-container">
            <header classNameName="row">
                <div>
                    <Link className = "brand" to="/">FoodChain</Link>
                    
                    <Link class="flowright" to="/signin">Sign In</Link>
                    <Link class="flowright" to="/cart">Cart
                     {/* highlights the number of items in the cart. */}
                      {itemsInCart.length > 0 && (<span className="badge">{itemsInCart.length}</span>)}
                    </Link>
                </div>
            </header>
            <main>
                <Route path="/product/:id" component={ProductScreen}></Route>
                <Route path="/" component={HomeScreen} exact></Route>
                <Route path="/cart/:id?" component={CartScreen}></Route>
            </main>
            <footer className="row center">All rights are reserved.</footer>
    </div>
    </BrowserRouter>        
  );
}

export default App;
