import React, { Component } from 'react';
import { Form, FormControl, Button, Card, ListGroup, ListGroupItem, Row, Col, Container, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faEye, faSearch } from '@fortawesome/free-solid-svg-icons';
import ProductDataService from './ProductDataService';

import './Product.css';
import logo from '../../asset/logo1.png'

class Product extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            productId : this.props.match.params.productId,
            name:null,
            sellerId:null,
            description:null,
            price:null,
            qty:null,
            category:null,
            manufacturer:null,
            rDistance:null,
            image:null,
            cartQty: 1
        }
        this.onAddToCartClicked = this.onAddToCartClicked.bind(this);
    }


    componentDidMount() {
        ProductDataService.retrieveProducts(this.state.productId)
        .then(
            response => {
                this.setState({
                    name : response.data.name,
                    sellerId: response.data.sellerID,
                    description: response.data.description,
                    price: response.data.price,
                    qty: response.data.qty,
                    category: response.data.category,
                    manufacturer: response.data.manufacturer,
                    rDistance: response.data.rdistance,
                    image: response.data.image
                
                }, () => console.log(this.state))
            }
        )
    }

    onAddToCartClicked(event) {
        // add this to the login
        // var products = [];
        // localStorage.setItem("cart", JSON.stringify(products));
        event.preventDefault();
        var cart = JSON.parse(localStorage.getItem("cart"));
        var product = { "productId" : this.state.productId,
                        "sellerId" : this.state.sellerId,
                        "name" : this.state.name,
                        "price" : this.state.price,
                        "qty" : this.state.cartQty }

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    handleChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        }, () => console.log(this.state.cartQty));
    };

    render() { 
        return ( 
            <div>
                <div style={{margin:"100px 100px"}}>
                    <Card className={"border text-white"} style={{border:"none"}}> 
                        <Card.Body style={{border:"none"}}>
                            <Table style={{border:"none"}}>
                            <tbody>
                            <tr style={{border:"none"}} key={this.state.productId}>
                                        <td style={{border:"none", width:"250px", height:"250px", background:"", padding:"0px 0", textAlign:"center"}}><img style={{width:"250px", height:"250px", borderRadius:"10px", padding:"0px", margin:"10px" }} alt="card" src= {`data:image/png;base64, ${this.state.image}`} /></td>
                                        <td style={{border:"none", width:"750px", height:"250px", background:"", padding:"22px 25px", textAlign:"left"}}>
                                            
                                            <p style={{fontSize:"17px", fontWeight:"600"}}>{this.state.name}</p>
                                            <p>Category: {this.state.category} <br/>
                                                Manufacturer: {this.state.manufacturer} <br/>
                                                Remote distance: {this.state.rDistance}m <br/>
                                                Available quantity: {this.state.qty} units <br/>
                                                </p>
                                                <p>{this.state.description}</p>
                                        </td>
                                        <td style={{border:"none",  background:"", padding:"65px 25px", textAlign:"center"}}>
                                            <p style={{fontSize:"25px", fontWeight:"600"}}>US ${this.state.price}</p>
                                            <Form inline onSubmit={this.onAddToCartClicked} className="search">
                                                <span style={{fontWeight:"600"}}>Qty: </span>&nbsp;&nbsp;<FormControl value={this.state.cartQty} name="cartQty" onChange={this.handleChange} size="sm" type="number" min="1" max="9" className=" mr-sm-2 qty" /> 
                                                <Button  type="submit" style={{height:"35px", marginLeft:"26px"}} className="button"><FontAwesomeIcon icon={faCartPlus} /> </Button>
                                            </Form>
                                        </td>
                                    </tr>
                                    </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
            </div>
         );
    }
}
 
export default Product;