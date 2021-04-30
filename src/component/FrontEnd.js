import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import NavBar from './Navbar/NavBar';
import ProductList from './ProductList/ProductList';

class FrontEnd extends Component {
    render() { 
        return ( 
            <div>
                <Router>
                    <NavBar/>
                        <Switch>

                        
                        </Switch>
                    <ProductList/>
                </Router>
            </div>
         );
    }
}
 
export default FrontEnd;