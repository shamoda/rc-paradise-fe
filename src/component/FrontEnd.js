import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './404 Error/NotFound';
import AddProduct from './AddProduct/AddProduct';
import Login from './Login/Login';
import MyParadise from './MyParadise/MyParadise';
import NavBar from './Navbar/NavBar';
import Product from './Product/Product';
import ProductList from './ProductList/ProductList';
import Registration from './Registration/Registration';
import ProductData from './SellerDashboard/ProductData';
import Cart from './AddtoCart/Cart';
class FrontEnd extends Component {
    render() {
        return (
            <div>
                <Router>
                    <NavBar />
                    <Switch>
                        <Route path="/" exact component={ProductList} />
                        <Route path="/addproduct/:productId" component={AddProduct} />
                        <Route path="/addproduct" component={AddProduct} />
                        <Route path="/Orders" component={ProductData} />
                        <Route path="/product/:productId" component={Product} />
                        <Route path="/Cart" component={Cart} />
                        <Route path="/myparadise" component={MyParadise} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Registration} />

                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default FrontEnd;