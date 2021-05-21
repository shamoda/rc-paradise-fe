import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Alert } from 'reactstrap';
import { Row, Container, Col } from 'react-bootstrap';
import './Cart.css'
import smsdataService from '../SMS/SmsDataService';
import Authentication from '../../authentication/Authentication'
import TableContainer1 from './TableContainer1';
import TableContainer2 from './TableContainer2';



const Cart = () => {

    const [cart, setcart] = useState([])
    const [Total, setTotal] = useState()
    const itemPrice = cart.reduce((a, c) => a + c.price * c.qty, 0)
    const Totalprice = itemPrice + 1500
    const [Checkouts, setCheckout] = useState(false)
    const [Phone, setPhone] = useState(false)
    const [value, setValue] = React.useState('Uber');
    const [OTP, setOTP] = useState("")
    const [sucessMessage, setsuccessMsg] = useState("")
    let history = useHistory()   //declaring useHistory Hook
    const [visible, setVisible] = useState(false);
    const [Errvisible, setErrVisible] = useState(false);
    const [OTPmessage, setOtpmessage] = useState(false);


    var userID = {
        "phoneNumber": Authentication.loggedUserId(),
        "otp": OTP
    }

    const handleChange = (event) => {
        setValue(event.target.value);
        localStorage.setItem("Deliver", value)
    };

    const onChange = (event) => {
        setOTP(event.target.value)
    };

    const handleSMS = () => {

        setPhone(true)
        smsdataService.sendEmail(userID)
            .then(response => {
                console.log(response.data)
                setOtpmessage(true)
            })
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        alert("OTP :" + OTP)
        setPhone(false)
        setOtpmessage(false)
        console.log(OTP)



        smsdataService.validateOTP(userID)
            .then((res) => {
                setsuccessMsg(res.data)

                if (sucessMessage === "") {
                    console.log(sucessMessage)
                    setVisible(true)
                }
            })

        localStorage.setItem("cart", JSON.stringify([]))
    }

    const onAdd = (item) => {

        const exist = cart.find(x => x.productId === item.productId)
        if (exist) {
            setcart(cart.map(x => x.productId === item.productId ? { ...exist, qty: exist.qty + 1 } : x))
        } else {
            setcart([...cart, { ...item, qty: 1 }])
        }
    }
    const onRemove = (item) => {
        const exist = cart.find(x => x.productId === item.productId)
        if (exist.qty === 1) {

            const newCart = cart.filter((x) => x.productId !== item.productId)
            setcart(newCart)
            localStorage.setItem("cart", JSON.stringify(newCart))

        } else {
            setcart(cart.map(x => x.productId === item.productId ? { ...exist, qty: exist.qty - 1 } : x))
        }
    }

    const itemTotal = (a, b) => {
        return a * b;
    }

    const Totals = () => {
        cart.forEach(function (number) {
            var Tot = 0;
            Tot = number.price * number.qty
            var t = t + Tot
            setTotal(t)

        });
        return Total
    }

    const deleteItem = (id) => {

        const newList = cart.filter((item) => item.productId !== id)
        setcart(newList)
        console.log(newList)
        console.log(id)
        localStorage.setItem("cart", JSON.stringify(newList))
    }

    const onDismiss = () => {
        setVisible(false);
        setsuccessMsg(null)
    }

    const onErrDismiss = () => {
        setErrVisible(false);
    }

    useEffect(() => {
        setcart(JSON.parse(localStorage.getItem("cart")))
    }, []);

    return (
        <div>
            { <div>
                <Alert style={{ marginTop: 10, height: 60, marginLeft: 300, width: 1000 }} color="primary" isOpen={visible} toggle={onDismiss} fade={false}>
                    Payment was successful !!
                </Alert>
            </div>}
            { <div>
                <Alert style={{ marginTop: 10, height: 60, marginLeft: 300, width: 1000 }} color="danger" isOpen={Errvisible} toggle={onErrDismiss} fade={false}>
                    Payment was Unsuccessful , Please try again !!!
                </Alert>
            </div>}
            <Container>
                <Row>
                    <Col sm={8}>
                        <TableContainer2
                            cart={cart}
                            onAdd={onAdd}
                            onRemove={onRemove}
                            itemTotal={itemTotal}
                            deleteItem={deleteItem}
                        />
                    </Col>
                    <Col sm={3} >

                        <TableContainer1
                            Totalprice={Totalprice}
                            Phone={Phone}
                            Checkouts={Checkouts}
                            itemPrice={itemPrice}
                            OTPmessage={OTPmessage}
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            onChange={onChange}
                            handleSMS={handleSMS}
                            Total={Total}
                            setCheckout={setCheckout}
                            cart={cart}
                            OTP={OTP}
                            value={value}

                        />
                    </Col>
                </Row>
            </Container>
        </div >
    );
}
export default Cart;