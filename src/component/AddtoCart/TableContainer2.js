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
    Grid,
    Avatar
} from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    table: {
        maxWidth: 750
    },
    tableContainer1: {
        borderRadius: 15,
        margin: '40px 40px ',
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

}));

const TableContainer2 = (props) => {
    const classes = useStyles();

    return (
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
                    {props.cart.map((c) => (
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
                                    <Grid item lg={3}>< AddCircleIcon onClick={() => props.onAdd(c)} style={{ color: 'green' }} /></Grid>
                                    <Grid item lg={4}>{c.qty}</Grid>
                                    <Grid item lg={3}>< RemoveCircleIcon onClick={() => props.onRemove(c)} style={{ color: 'red' }} /></Grid>
                                </Grid>
                            </TableCell>
                            <TableCell align='center'>$&nbsp;{props.itemTotal(c.price, c.qty)}</TableCell>

                            <TableCell align='center'> <DeleteIcon onClick={() => props.deleteItem(c.productId)} style={{ color: 'orange' }} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>);
}

export default TableContainer2;