import React, { Component } from 'react';
import { Form, FormControl, Button, Card, Row, Col, Table } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import MyParadiseDataService from './MyParadiseDataService';
import Authentication from '../../authentication/Authentication'
import './MyParadise.css';

class MyParadise extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            products:[],
            sellerId: Authentication.loggedUserId(),
            query: '',
            qty: 1,
            message: null
        }

        this.onUpdateClicked = this.onUpdateClicked.bind(this);
        this.onDeleteClicked = this.onDeleteClicked.bind(this);
        this.addProductClicked = this.addProductClicked.bind(this);
        this.refreshProducts = this.refreshProducts.bind(this);
    }

    refreshProducts(){
        MyParadiseDataService.retrieveAllProductsBySeller(this.state.sellerId, this.state.query)
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

    onUpdateClicked(productId) {
        return this.props.history.push('/addproduct/'+productId);
    }

    onDeleteClicked(productId) {
        MyParadiseDataService.deleteProduct(productId)
        .then(
            response => {
                this.setState({message: response.data})
                this.refreshProducts()
            }, 
        )
    }

    addProductClicked() {
        return this.props.history.push('/addproduct');
    }

    render() { 
        return ( 
            <div>
                <Form inline autoComplete="off" className="search">
                    <FormControl type="text" placeholder="Start typing to find your products" name="query" value={this.state.query} onChange={this.handleChange} className=" mr-sm-2 input" />
                    {/* <Button style={{height:"35px", marginLeft:"26px"}} className="button"><FontAwesomeIcon icon={faSearch} /></Button> */}
                </Form>

                <div style={{margin:"20px 100px", textAlign:"center"}}>
                    <Row>
                        <Col style={{textAlign:"left"}}>
                            <p style={{fontSize:"20px", fontWeight:"400", fontFamily: 'Original Surfer'}}>Welcome back {Authentication.loggedUserName()},</p>
                        </Col>
                        <Col style={{textAlign:"center"}}>
                            { this.state.message && <p style={{color:"red", fontWeight:"600"}}>{this.state.message}</p> }
                        </Col>
                        <Col style={{textAlign:"right"}}>
                            <Button onClick={this.addProductClicked} style={{marginRight:"0px"}} className="myparadise-button"><FontAwesomeIcon icon={faPlus} /> Add new product</Button>
                        </Col>
                    </Row>
                </div>

                <div style={{margin:"0 100px"}}>
                    <Card className={"border text-white"} style={{border:"none"}}> 
                        <Card.Body style={{border:"none"}}>
                            <Table style={{border:"none"}}>
                            <tbody>
                                {this.state.products.length === 0 ? 
                                <tr align="center">
                                    <td colSpan="9" ><FontAwesomeIcon icon={faEye} /> No records found
                                    {/* <Button onClick={this.addProductClicked} style={{marginRight:"0px", marginTop:"20px"}} className="button"><FontAwesomeIcon icon={faPlus} /> Start selling</Button> */}
                                     </td>
                                    
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
                                        <td style={{border:"none",  background:"", padding:"25px 25px", textAlign:"center"}}>
                                            <Form inline className="search">
                                                <Button onClick={() => this.onUpdateClicked(product.productId)}  style={{height:"35px", marginLeft:"26px"}} className="myparadise-button"><FontAwesomeIcon icon={faEdit} /> </Button>
                                                <Button onClick={() => this.onDeleteClicked(product.productId)}  style={{height:"35px", marginLeft:"26px", background:"red"}} className="myparadise-button"><FontAwesomeIcon icon={faTrash} /> </Button>
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
 
export default MyParadise;