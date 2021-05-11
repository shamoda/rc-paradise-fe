import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,



} from '@material-ui/core';
import { deepOrange, green } from '@material-ui/core/colors';

import DeleteIcon from '@material-ui/icons/Delete';
import { Row, Container, Col } from 'react-bootstrap';
import Checkout from '../Paypal/Checkout'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DeliveryForm from './DeliveryForm'
import './Cart.css'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';



const useStyles = makeStyles((theme) => ({
    table: {
        maxWidth: 750

    },
    tableContainer1: {
        borderRadius: 15,
        margin: '60px 40px ',
        marginLeft: -60,
        maxWidth: 1450,
        alignContent: 'center'

    },
    tableHeaderCell: {

        fontWeight: 'bold',
        backgroundImage: 'linear-gradient(to bottom right,pink, yellow)',



    },
    large: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    square: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    tableContainer2: {

        borderRadius: 15,
        marginLeft: 90,
        margin: '60px 40px ',
        minWidth: 400


    },
    table1: {

        minWidth: 300
    },
    tableHeaderCell1: {

        fontWeight: 'bold',
        backgroundImage: 'linear-gradient(to bottom right,pink, yellow)',
        width: 300
    },
    TableRow: {

        marginTop: '40px'
    },
    CellMargin: {

        marginLeft: 50
    }
}));






const Cart = () => {



    const [cart, setcart] = useState([])
    const classes = useStyles();
    const [Total, setTotal] = useState()
    const itemPrice = cart.reduce((a, c) => a + c.price * c.qty, 0)
    const Totalprice = itemPrice + 1500
    const [Checkouts, setCheckout] = useState(false)
    const [Uber, SetUber] = useState(false)
    const [value, setValue] = React.useState('Uber');

    const handleChange = (event) => {

        setValue(event.target.value);

        localStorage.setItem("Deliver", value)
    };

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


    useEffect(() => {


        setcart(JSON.parse(localStorage.getItem("cart")))




    }, []);

    return (
        <div>

            <Container>
                <Row>
                    <Col sm={8}>
                        <TableContainer component={Paper} className={classes.tableContainer1}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>

                                        <TableCell align='center' className={classes.tableHeaderCell}>Product Name</TableCell>
                                        <TableCell align='center' className={classes.tableHeaderCell} >Price</TableCell>
                                        <TableCell align='center' className={classes.tableHeaderCell} >Qty</TableCell>
                                        <TableCell align='center' className={classes.tableHeaderCell} >Total</TableCell>
                                        <TableCell align='center' className={classes.tableHeaderCell} >Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cart.map((c) => (
                                        <TableRow key={c.productId}>
                                            <TableCell align='center' component="th" scope="row">
                                                <Grid container>
                                                    <Grid item lg={2}>
                                                        <Avatar className={classes.square} src={`data:image/png;base64, ${c.image}`} />
                                                    </Grid>
                                                    <Grid item lg={10}>
                                                        {c.name}
                                                    </Grid>

                                                </Grid>


                                            </TableCell>
                                            <TableCell align='center'>{c.price}  </TableCell>
                                            <TableCell align='center'>

                                                <Grid container>

                                                    <Grid item lg={3}>< AddCircleIcon onClick={() => onAdd(c)} style={{ color: 'green' }} /></Grid>
                                                    <Grid item lg={4}>{c.qty}</Grid>
                                                    <Grid item lg={3}>< RemoveCircleIcon onClick={() => onRemove(c)} style={{ color: 'red' }} /></Grid>
                                                </Grid>


                                            </TableCell>
                                            <TableCell align='center'>$&nbsp;{itemTotal(c.price, c.qty)}</TableCell>

                                            <TableCell align='center'> <DeleteIcon onClick={() => deleteItem(c.productId)} style={{ color: 'orange' }} /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Col>
                    <Col sm={3} >
                        <TableContainer component={Paper} className={classes.tableContainer2}>
                            <Table className={classes.table1} aria-label="simple table">
                                <TableHead>
                                    <TableRow>

                                        <TableCell align='center' className={classes.tableHeaderCell1}>Item</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    <TableRow >

                                        <TableCell className={classes.CellMargin} align='left'> Item Count  {cart.length}</TableCell>




                                    </TableRow>
                                    <TableRow>

                                        <TableCell align='left'>Sub Total &nbsp;  &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp; $ {itemPrice}</TableCell>
                                    </TableRow>
                                    <TableRow>

                                        <TableCell align='left'>Delivery Charges  &emsp;&emsp; &emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp;  $ 1500</TableCell>
                                    </TableRow>
                                    <TableRow>

                                        <TableCell align='left'>Total Discounts  &emsp; &emsp;   &emsp; &emsp;   &emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp; 0</TableCell>
                                    </TableRow>

                                    <TableRow>

                                        <TableCell align='left'>Total &emsp; &nbsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp; $ {Totalprice}</TableCell>
                                    </TableRow>

                                    <TableRow className={classes.TableRow}>



                                    </TableRow>
                                    <DeliveryForm value={value} handleChange={handleChange} />
                                    <TableRow >
                                        {Checkouts ? (
                                            <Checkout Total={Totalprice} />
                                        ) : (

                                            <button className="button" onClick={() => setCheckout(true)}> <span>Checkout </span>  <ShoppingCartIcon /> </button>
                                        )
                                        }


                                    </TableRow>


                                </TableBody>
                            </Table>


                        </TableContainer>
                    </Col>
                </Row>




            </Container>




        </div>

    );

}
export default Cart;