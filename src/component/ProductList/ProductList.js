import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './ProductList.css';

class ProductList extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Form inline className="search">
                    <FormControl type="text" placeholder="Search for anything" className=" mr-sm-2 input" />
                    <Button type="submit" className="button"><FontAwesomeIcon icon={faSearch} /></Button>
                </Form>
            </div>
         );
    }
}
 
export default ProductList;