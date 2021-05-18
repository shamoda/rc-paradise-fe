import React, { Component } from 'react';
import { Form, FormControl, Button, Card, Table } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import ProductListDataService from './ProductListDataService';

import './ProductList.css';

class ProductList extends Component {

    constructor(props){
        super(props);
        this.state = {
            products:[],
            query: '',
            qty: 1,
            message: null
        }

        this.onViewClick = this.onViewClick.bind(this);
        this.refreshProducts = this.refreshProducts.bind(this);
    }

    refreshProducts(){
        ProductListDataService.retrieveAllProducts(this.state.query)
            .then(
                response => {
                    this.setState({products : response.data})
                    console.log(this.state.products)
                }
            )
    }

    componentDidMount() {
        this.refreshProducts();
    }

    handleChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        }, () => this.refreshProducts());
    };

    onViewClick(productId) {
        return this.props.history.push('/product/'+productId);
    }
    

    render() { 
        return ( 
            <div>
                
                <Form inline autoComplete="off" className="search">
                    <FormControl type="text" placeholder="Start typing to search" name="query" value={this.state.query} onChange={this.handleChange} className=" mr-sm-2 input" />
                    {/* <Button type="submit" className="button"><FontAwesomeIcon icon={faSearch} /></Button> */}
                </Form>

                <div style={{margin:"0 100px"}}>
                    <Card className={"border text-white"} style={{border:"none"}}> 
                        <Card.Body style={{border:"none"}}>
                            <Table style={{border:"none"}}>
                            <tbody>
                                {this.state.products.length === 0 ? 
                                <tr align="center">
                                    <td colSpan="9" ><FontAwesomeIcon icon={faEye} /> No product found</td>
                                </tr> :

                                this.state.products.map((product) => (
                                    <tr style={{border:"none"}} key={product.productId}>
                                        <td style={{border:"none", width:"150px", height:"150px", background:"", padding:"0px 0", textAlign:"center"}}><img style={{width:"150px", height:"150px", borderRadius:"10px", padding:"0px", margin:"10px" }} alt="card" src= {`data:image/png;base64, ${product.image}`} /></td>
                                        <td style={{border:"none", width:"750px", height:"150px", background:"", padding:"22px 25px", textAlign:"left"}}>
                                            {/* <hr style={{backgroundColor:"black"}} /> */}
                                            <p style={{fontSize:"17px", fontWeight:"600"}}>{product.name}</p>
                                            <p>Category: {product.category} <br/>
                                                {/* Grade: {product.grade} <br/> */}
                                                Manufacturer: {product.manufacturer} <br/>
                                                Remote Distance: {product.rdistance}m <br/>
                                                {/* Quantity available: {product.qty} */}
                                                </p>
                                            {/* <p>{product.description}</p> */}
                                            {/* <p>Quantity available: {product.qty}</p> */}
                                            {/* <hr style={{backgroundColor:"black"}} /> */}
                                        </td>
                                        <td style={{border:"none",  background:"", padding:"20px 25px", textAlign:"center"}}>
                                            <p style={{fontSize:"25px", fontWeight:"600"}}>US ${product.price}</p>
                                            <Form inline onSubmit={() => this.onViewClick(product.productId)} className="search">
                                                {/* <span style={{fontWeight:"600"}}>Qty: </span>&nbsp;&nbsp;<FormControl defaultValue="1" id="qty" name="qty" size="sm" type="number" min="1" max="9" className=" mr-sm-2 qty" />  */}
                                                <Button  type="submit" style={{height:"35px", marginLeft:"26px"}} className="productlist-button"><FontAwesomeIcon icon={faEye} /> View</Button>
                                            </Form>
                                        </td>
                                    </tr>
                                ))
                                } 
                            </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
            </div>
         );
    }
}
 
export default ProductList;


