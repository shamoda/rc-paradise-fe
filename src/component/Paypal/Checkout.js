import React from "react";
import ReactDOM from "react-dom"
import { useHistory } from "react-router-dom";
import CartDataservice from "../AddtoCart/CartDataservice"

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

const Checkout = (props) => {

    let history = useHistory();
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

    const onApprove = (data, actions) => {

        // Capture the funds from the transaction
        return actions.order.capture().then(function (details) {
            // Show a success message to your buyer

            let Main = details.purchase_units[0].shipping.address
            let Ship = Main.address_line_1 + " " + Main.admin_area_1 + " " + Main.admin_area_2 + " " + Main.country_code + " " + Main.postal_code
            localStorage.setItem("Ship", Ship)
            alert("Transaction completed by " + details.purchase_units[0].shipping.address.address_line_1 + " " + details.purchase_units[0].shipping.address.address_line_2);

            let Cart = JSON.parse(localStorage.getItem("cart"))

            let deliveryMode = localStorage.getItem('Delivery')
            let news = Cart.map(element => {

                return { ...element, deliveryMode: deliveryMode, buyerAddress: Ship }

            });

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

        <div className="app" style={{ margin: 30 }}>
            <PayPalButton
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
            />
        </div>
    );
}
export default Checkout;