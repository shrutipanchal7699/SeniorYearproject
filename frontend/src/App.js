
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';


function App() {
  return (
    <BrowserRouter>
    <div classNameName="grid-container">
            <header classNameName="row">
                <div>
                    <a className = "brand" href="/">FoodChain</a>
                    <a class="flowright" href="/cart">Cart</a>
                    <a class="flowright" href="/signin">Sign In</a>
                </div>
            </header>
            <main>
                <Route path="/product/:id" component={ProductScreen}></Route>
                <Route path="/" component={HomeScreen} exact></Route>
                
            </main>
            <footer className="row center">All rights are reserved.</footer>
    </div>
    </BrowserRouter>        
  );
}

export default App;
