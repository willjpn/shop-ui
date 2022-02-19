import {Fragment} from "react";
import {Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";


const UserOrders = ({orders, history}) => {

    const showOrderDetails = (id) => {
        console.log("history", history)
        history.push(`/orders/${id}`)
    }

    return (
        <Grid sx={{maxWidth: '90%'}}>
            {!orders.length ?
                <span style={{letterSpacing: '1px', fontSize: '24px', color: 'darkgrey', textAlign: 'center', marginTop: '20px'}}>There are currently no orders to show!</span>
                :
                <TableContainer>
                    <Table sx={{minWidth: 700, letterSpacing: '1px'}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" sx={{letterSpacing: '1px', fontWeight: 'bolder'}}>Order
                                    Id</TableCell>
                                <TableCell align="left"
                                           sx={{letterSpacing: '1px', fontWeight: 'bolder'}}>Date</TableCell>
                                <TableCell align="left"
                                           sx={{letterSpacing: '1px', fontWeight: 'bolder'}}>Total</TableCell>
                                <TableCell align="left" sx={{letterSpacing: '1px', fontWeight: 'bolder'}}>Is
                                    Paid?</TableCell>
                                <TableCell align="left" sx={{letterSpacing: '1px', fontWeight: 'bolder'}}>Is
                                    Delivered?</TableCell>
                                <TableCell align="left"
                                           sx={{letterSpacing: '1px', fontWeight: 'bolder'}}>Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order._id}>
                                    <TableCell sx={{letterSpacing: '1px'}}>{order._id}</TableCell>
                                    <TableCell align="left" sx={{letterSpacing: '1px'}}>{order.createdOn}</TableCell>
                                    <TableCell align="left" sx={{letterSpacing: '1px'}}>£{order.totalPrice}</TableCell>
                                    <TableCell align="left" sx={{
                                        color: order.isPaid ? "green" : "red",
                                        letterSpacing: '1px'
                                    }}>{order.isPaid ? "Yes" : "No"}</TableCell>
                                    <TableCell align="left" sx={{
                                        color: order.isDelivered ? "green" : "red",
                                        letterSpacing: '1px'
                                    }}>{order.isDelivered ? "Yes" : "No"}</TableCell>
                                    <TableCell align="left"><Button color="success" sx={{letterSpacing: '1px'}}
                                                                    variant="outlined" size="small"
                                                                    onClick={() => showOrderDetails(order._id)}>See
                                        Details</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            }

        </Grid>

    )
}

export default UserOrders
