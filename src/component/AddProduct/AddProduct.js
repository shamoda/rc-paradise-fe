import React, { Component } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';

import './AddProduct.css';
import AddProductDataService from './AddProductDataService';
import Authentication from '../../authentication/Authentication'

class AddProduct extends Component {

    constructor(props){
        super(props);
        this.state = {
            productId : this.props.match.params.productId,
            name:null,
            sellerId:Authentication.loggedUserId(),
            description:null,
            price:null,
            qty:null,
            category:null,
            manufacturer:null,
            rDistance:null,
            image:null,
            imageUrl:null,
            imageName:null,
            imageSelected:false,
            clicked: false
        }
        this.onFileChange = this.onFileChange.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
    }

    componentDidMount() {
        if(this.state.productId != null) {
            AddProductDataService.getProduct(this.state.productId)
            .then(response => {
                this.setState({
                    name : response.data.name,
                    sellerId: response.data.sellerID,
                    description: response.data.description,
                    price: response.data.price,
                    qty: response.data.qty,
                    category: response.data.category,
                    manufacturer: response.data.manufacturer,
                    rDistance: response.data.rdistance,
                    image: `data:image/png;base64, ${response.data.image}`,
                    imageUrl: `data:image/png;base64, ${response.data.image}`,
                    imageSelected:true
                
                }, () => console.log(this.state))
            })
        }
    }

    handleChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        }, () => console.log(this.state));
    };
    

    onFileChange(event) {
        if (event.target.files.length) {
            this.setState({
                image: event.target.files[0],
                imageUrl: URL.createObjectURL(event.target.files[0]),
                imageName: event.target.files[0].name,
                imageSelected: true,
            }, () => console.log(this.state.image));
        }
    }

    saveProduct(event) {
        event.preventDefault();
        this.setState({clicked: true})
        let formData = new FormData();
        if(this.state.productId != null) {
            formData.append('productId', this.state.productId);
        }
        formData.append('sellerID', this.state.sellerId);
        formData.append('name', this.state.name);
        formData.append('description', this.state.description);
        formData.append('price', this.state.price);
        formData.append('qty', this.state.qty);
        formData.append('category', this.state.category);
        formData.append('manufacturer', this.state.manufacturer);
        formData.append('rDistance', this.state.rDistance);
        formData.append('image', this.state.image);

        if(this.state.productId != null) {
            AddProductDataService.updateProduct(formData)
            .then(response => {
            console.log(response)
            this.props.history.push('/myparadise');
            })
        } else {
            AddProductDataService.uploadProduct(formData)
            .then(response => {
                console.log(response)
                this.props.history.push('/myparadise');
            })
        }
    }

    render() { 
        return ( 
            <div className = "addproduct">
                <Form autoComplete="off" onSubmit={this.saveProduct} >
                    <Form.Label style={{fontSize:"25px", marginBottom:"15px"}}>Add Product</Form.Label>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={this.handleChange} name="name" value={this.state.name} type="text" placeholder="Enter product name" className = "addproduct-input" />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={this.handleChange} name="description" value={this.state.description}  as="textarea" rows={3} placeholder="Enter description" className = "addproduct-input" />
                    </Form.Group>
                    <Form.Group controlId="manufacturer">
                        <Form.Label>Manufacturer</Form.Label>
                        <Form.Control onChange={this.handleChange} name="manufacturer" value={this.state.manufacturer}  type="text" placeholder="Enter product manufacturer" className = "addproduct-input" />
                    </Form.Group>
                    <Form.Group controlId="rDistance">
                        <Form.Label>Remote distance</Form.Label>
                        <Form.Control onChange={this.handleChange} name="rDistance" value={this.state.rDistance}  type="number" placeholder="Enter remote distance in meters" className = "addproduct-input" />
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Price (USD)</Form.Label>
                        <Form.Control onChange={this.handleChange} name="price" value={this.state.price}  type="number" placeholder="Enter price in USD" className = "addproduct-input" />
                    </Form.Group>
                    <Form.Group controlId="quantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control onChange={this.handleChange} name="qty" value={this.state.qty}  type="number" placeholder="Enter quantity" className = "addproduct-input" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Label>Category</Form.Label>
                        <Form.Control onChange={this.handleChange} name="category" value={this.state.category}  as="select" className = "addproduct-input">
                            <option value="">-- Select --</option>
                            <option>Car</option>
                            <option>Buggy</option>
                            <option>Truck</option>
                            <option>Plane</option>
                            <option>Helicoptor</option>
                            <option>Boat</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.File name="image" label="Product image" onChange={this.onFileChange} style={{borderWidth:"1px", borderColor:"red"}} />
                    </Form.Group>
                    {this.state.imageSelected ?
                    <img style={{width:"250px", height:"250px", borderRadius:"10px", padding:"0px", margin:"10px", textAlign:"center" }} alt="card" src= {this.state.imageUrl} />
                    : ''}
                    <br/>
                    <Button variant="outline-light" type="submit" className = "addproduct-button">
                    {this.state.clicked && <Spinner style={{padding:"0px", marginRight:"12px"}} as="span" animation="grow" size="sm" role="status" aria-hidden="true" />}
                        Add Product 
                    </Button>
                    
                </Form>
            </div>
         );
    }
}
 
export default AddProduct;