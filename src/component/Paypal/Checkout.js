import React, { useState } from "react";
import ReactDOM from "react-dom"
import { useHistory } from "react-router-dom";
import CartDataservice from "../AddtoCart/CartDataservice"
import EmailService from "./EmailService";



const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

const Checkout = (props) => {

    let history = useHistory();
    const [cart, setcart] = useState([])
    const TotalAmount = props.Total

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: TotalAmount,
                    },
                },
            ],
        });
    }

    const sendEmail = () => {


        let Email = {

            "to": "senathdonz@gmail.com",
            "from": "senathweerasingha@gmail.com",
            "subject": "Delivery System",
            "name": "Senath"

        }



        EmailService.sendEmail(Email)
            .then(res => {

                console.log("Email Sent")
            })


    }

    const onApprove = (data, actions) => {

        // Capture the funds from the transaction
        return actions.order.capture().then(function (details) {
            // Show a success message to your buyer

            let Main = details.purchase_units[0].shipping.address
            let Ship = Main.address_line_1 + " " + Main.admin_area_1 + " " + Main.admin_area_2 + " " + Main.country_code + " " + Main.postal_code
            localStorage.setItem("Ship", Ship)
            alert("Transaction completed by " + details.purchase_units[0].shipping.address.address_line_1 + " " + details.purchase_units[0].shipping.address.address_line_2);

            let Cart = JSON.parse(localStorage.getItem("cart"))

            let deliveryMode = 'Uber'
            let news = Cart.map(element => {

                return { ...element, deliveryMode: deliveryMode, buyerAddress: Ship }

            });

            sendEmail()  //Sending an email to the delivery service

            CartDataservice.createCart(news)
                .then(response => {

                    console.log("Data Saved")
                    history.push('/')

                })


            //Clearing the cart
            let products = [];
            localStorage.setItem("cart", JSON.stringify(products))


        });


    }

    return (

        <div className="app">
            <PayPalButton
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
            />

        </div>


    )

        ;
}

export default Checkout;