import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TableFooter, TablePagination } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import CartDataservice from '../AddtoCart/CartDataservice';
import Authentication from '../../authentication/Authentication'
const useStyles = makeStyles((theme) => ({

    table: {}
    ,
    tableContainer: {
        borderRadius: 15,
        margin: '60px 40px',
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundImage: 'linear-gradient(to bottom right,pink, yellow)',
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    TableFooter: {}

}))

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function ProductData() {
    const classes = useStyles();
    const [cart, setCart] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {

        CartDataservice.getCart(Authentication.loggedUserId())
            .then(
                response => {
                    setCart(response.data)
                }
            )
    }, [])

    return (
        <TableContainer style={{ width: 1200, marginLeft: 160 }} className={classes.tableContainer} component={Paper}>
            <Table style={{ width: 1200 }} className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>

                        <TableCell className={classes.tableHeaderCell}>Product Name</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Quantity</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Shipping Address</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Delivery Mode</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((c) => (
                        <TableRow key={c.pID}>
                            <TableCell align="center" className={classes.name} component="th" scope="row">{c.name} </TableCell>
                            <TableCell component="th" scope="row">{c.quantity}</TableCell>
                            <TableCell component="th" scope="row">{c.buyerAddress}</TableCell>
                            <TableCell component="th" scope="row">{c.deliveryMode}</TableCell>
                        </TableRow>
                    ))}
                </TableBody >
                <TableFooter>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

