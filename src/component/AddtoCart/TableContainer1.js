import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import Checkout from '../Paypal/Checkout'
import { deepOrange } from '@material-ui/core/colors';
import DeliveryForm from './DeliveryForm'
import Authentication from '../../authentication/Authentication'

const useStyles = makeStyles((theme) => ({

    tableContainer2: {
        borderRadius: 15,
        marginLeft: 90,
        margin: '40px 40px ',
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
const TableContainer1 = (props) => {

    const classes = useStyles();

    return (

        <TableContainer component={Paper} className={classes.tableContainer2}>
            <Table className={classes.table1} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align='center' className={classes.tableHeaderCell1}>Item</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>

                    <TableRow >
                        <TableCell className={classes.CellMargin} align='left'> Item Count  {props.cart.length}</TableCell>

                    </TableRow>
                    <TableRow>

                        <TableCell align='left'>Sub Total &nbsp;  &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp; $ {props.itemPrice}</TableCell>
                    </TableRow>
                    <TableRow>

                        <TableCell align='left'>Delivery Charges  &emsp;&emsp; &emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp;  $ 1500</TableCell>
                    </TableRow>
                    <TableRow>

                        <TableCell align='left'>Total Discounts  &emsp; &emsp;   &emsp; &emsp;   &emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp; 0</TableCell>
                    </TableRow>

                    <TableRow>

                        <TableCell align='left'>Total &emsp; &nbsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp; $ {props.Totalprice}</TableCell>
                    </TableRow>

                    <TableRow className={classes.TableRow}>

                    </TableRow>
                    <DeliveryForm value={props.value} handleChange={props.handleChange} />
                    <TableRow >
                        {props.Checkouts ? (
                            <Checkout Total={props.Totalprice} />
                        ) : (

                            <button className="button" onClick={() => props.setCheckout(true)}> <span>Checkout </span>  <ShoppingCartIcon /> </button>
                        )
                        }
                    </TableRow>
                    <TableRow>

                        {props.OTPmessage && <h6 style={{ marginLeft: 10 }}> You have received an OTP to the No {Authentication.loggedUserId()}</h6>}
                        {props.Phone ? (

                            <div style={{ marginLeft: 60, marginBottom: 10 }}>
                                <form onSubmit={props.handleSubmit}>
                                    <input type="number" value={props.OTP} onChange={props.onChange} />
                                    <input type="submit" value="Submit" />
                                </form>
                            STATE : {props.OTP}
                            </div>

                        ) : (
                            <button className="button" style={{ marginTop: -3 }} onClick={() => { props.handleSMS() }}> <span>Pay with Mobile </span>  <PhoneAndroidIcon /> </button>
                        )
                        }
                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>



    );
}

export default TableContainer1;