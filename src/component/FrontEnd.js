import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import AddProduct from './AddProduct/AddProduct';
import Login from './Login/Login';
import NavBar from './Navbar/NavBar';
import Product from './Product/Product';
import ProductList from './ProductList/ProductList';
import Registration from './Registration/Registration';

class FrontEnd extends Component {
    render() { 
        return ( 
            <div>
                <Router>
                    <NavBar/>
                        <Switch>
                            <Route path="/" exact component={ProductList}/>
                            <Route path="/addproduct/:productId" component={AddProduct}/>
                            <Route path="/addproduct" component={AddProduct}/>
                            <Route path="/product/:productId" component={Product}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={Registration}/>
                        
                        </Switch>
                </Router>
            </div>
         );
    }
}
 
export default FrontEnd;