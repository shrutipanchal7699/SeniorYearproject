
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import SigninScreen from './screens/SigninScreen';


function App() {

  const cart = useSelector(state => state.cart);
  const {itemsInCart} = cart;

  const userSignin = useSelector ((state)=> state.userSignin);
  const {userInfo} = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());

  }

  return (
    <BrowserRouter>
    <div classNameName="grid-container">
            <header classNameName="row">
                <div>
                    <Link className = "brand" to="/">FoodChain</Link>
                    
                    <Link>
                    {
                      userInfo ? (
                      <div className = "dropdown">
                        <Link to = "#"> {
                        userInfo.name} <i className= "fa fa-caret-down"></i> {' '}
                        </Link>
                        <ul className= "dropdown-content">
                          <Link to = "#signout" onClick = {signoutHandler}>
                            Sign Out
                          </Link>
                        </ul>
                        </div>
                      ) :
                      (
                        <Link class="flowright" to="/signin">Sign In</Link>
                      ) 
                    }
                    </Link>
                    
                    <Link class="flowright" to="/signin">Sign Up</Link>
                    <Link class="flowright" to="/cart">Cart
                     {/* highlights the number of items in the cart. */}
                      {itemsInCart.length > 0 && (<span className="badge">{itemsInCart.length}</span>)}
                    </Link>
                </div>
            </header>
            <main>
                <Route path="/product/:id" component={ProductScreen}></Route>
                <Route path="/" component={HomeScreen} exact></Route>
                <Route path= "/signin" component= {SigninScreen}></Route>
                <Route path= "/register" component= {RegisterScreen}></Route>
                <Route path="/cart/:id?" component={CartScreen}></Route>
                
            </main>
            {/* <div className="footer">
              All rights are reserved.
            </div> */}
            {/* <footer className="row center">All rights are reserved.</footer> */}
    </div>
    </BrowserRouter>        
  );
}

export default App;
