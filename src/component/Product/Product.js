import React, { Component } from 'react';
import { Form, FormControl, Button, Card, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import ProductDataService from './ProductDataService';
import './Product.css';
import Authentication from '../../authentication/Authentication'

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productId: this.props.match.params.productId,
            name: null,
            sellerId: null,
            description: null,
            price: null,
            qty: null,
            category: null,
            manufacturer: null,
            rDistance: null,
            image: null,
            cartQty: 1,
            addedToCart: false
        }
        this.onAddToCartClicked = this.onAddToCartClicked.bind(this);
    }


    componentDidMount() {
        ProductDataService.retrieveProducts(this.state.productId)
            .then(
                response => {
                    this.setState({
                        name: response.data.name,
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
        event.preventDefault();
        var cart = JSON.parse(localStorage.getItem("cart"));


        const exist = cart.find(x => x.productId === this.state.productId)
        if (exist) {

            const newCart = cart.map(x => x.productId === this.state.productId ? { ...exist, qty: exist.qty + 1 } : x)
            localStorage.setItem("cart", JSON.stringify(newCart));

        } else {

            var product = {
                "productId": this.state.productId,
                "sellerId": this.state.sellerId,
                "name": this.state.name,
                "price": this.state.price,
                "qty": this.state.cartQty,
                "image": this.state.image,
                "buyerAddress": null,
                "deliveryMode": null

            }
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
        }


        this.setState({ addedToCart: true })
        setTimeout(() => {
            this.props.history.push('/');
        }, 2000)

    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => console.log(this.state.cartQty));
    };

    render() {

        const isUserLoggedIn = Authentication.isUserLoggedIn();
        const loggedUserRole = Authentication.loggedUserRole();

        let loggedAsSeller = false;
        let loggedAsBuyer = false;

        if (loggedUserRole != null && loggedUserRole === 'seller') {
            loggedAsSeller = true;
        }
        if (loggedUserRole != null && loggedUserRole === 'buyer') {
            loggedAsBuyer = true;
        }

        return (
            <div>
                <div style={{ margin: "100px 100px" }}>
                    <Card className={"border text-white"} style={{ border: "none" }}>
                        <Card.Body style={{ border: "none" }}>
                            <Table style={{ border: "none" }}>
                                <tbody>
                                    <tr style={{ border: "none" }} key={this.state.productId}>
                                        <td style={{ border: "none", width: "250px", height: "250px", background: "", padding: "0px 0", textAlign: "center" }}><img style={{ width: "250px", height: "250px", borderRadius: "10px", padding: "0px", margin: "10px" }} alt="card" src={`data:image/png;base64, ${this.state.image}`} /></td>
                                        <td style={{ border: "none", width: "750px", height: "250px", background: "", padding: "22px 25px", textAlign: "left" }}>

                                            <p style={{ fontSize: "17px", fontWeight: "600" }}>{this.state.name}</p>
                                            <p>Category: {this.state.category} <br />
                                                Manufacturer: {this.state.manufacturer} <br />
                                                Remote distance: {this.state.rDistance}m <br />
                                                Available quantity: {this.state.qty} units <br />
                                            </p>
                                            <p>{this.state.description}</p>
                                        </td>
                                        <td style={{ border: "none", background: "", padding: "65px 25px", textAlign: "center" }}>
                                            <p style={{ fontSize: "25px", fontWeight: "600" }}>US ${this.state.price}</p>


                                            {isUserLoggedIn ?
                                                loggedAsBuyer ?
                                                    <Form inline onSubmit={this.onAddToCartClicked} className="search">

                                                        <Button type="submit" style={{ height: "35px", marginLeft: "26px" }} className="product-button"><FontAwesomeIcon icon={faCartPlus} /> </Button>
                                                        {this.state.addedToCart && <p style={{ color: "green", fontWeight: "600", padding: "5px" }}>added to cart & redirecting...</p>}
                                                    </Form>
                                                    :
                                                    <p style={{ color: "red", fontWeight: "600" }}>- you are not a buyer -</p>
                                                :
                                                <Link className="nav-link" to="/login" style={{ color: "red", fontWeight: "600" }}>please login to purchase</Link>}


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