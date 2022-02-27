import React, {useEffect, Fragment, useState} from "react";
import {getUser} from "../actions/userActions";
import {useDispatch, useSelector} from "react-redux";
import Header from "./Header";
import {getOrder} from "../actions/orderActions";
import Payment from "./Payment";
import {Box, Button, Container, Divider, Grid, useMediaQuery, useTheme} from "@mui/material";
import {ArrowBackIosNew} from "@mui/icons-material";

const OrderOverview = ({match, history}) => {

    const [address, setAddress] = useState({})
    const [exVat, setExVat] = useState()
    const [vat, setVat] = useState()
    const [total, setTotal] = useState()

    const id = match.params.id

    const {refreshFailed} = useSelector(state => state.auth)
    const userDetails = useSelector(state => state.userDetails)
    const {loading: getUserLoading, error: getUserError} = userDetails

    const getOrderState = useSelector(state => state.getOrder)
    const {loading: getOrderLoading, error: getOrderError, order} = getOrderState

    const dispatch = useDispatch()

    useEffect(() => {
        if (order._id) {
            setAddress(order.shippingAddress)
            setVat(order.vat)
            setExVat(order.exVat)
            setTotal(order.totalPrice)
        }
    }, [order])


    useEffect(() => {
        // check if user has access
        dispatch(getUser())
    }, [dispatch])

    useEffect(() => {
        if (refreshFailed) {
            return history.push(`/login?redirect=orders/${id}`)
        }
        // if all is good, we need to fetch the order itself from the database
        // and then compare the order's user to the user accessing page
        dispatch(getOrder(id))
    }, [refreshFailed, history, id, dispatch])

    // TODO - make sure prices have 2dp, e.g. £2.50 currently rounds to £2.5

    const goToOrders = (e) => {
        e.preventDefault()
        history.push("/user-profile")
    }

    const theme = useTheme();
    const showBasket = useMediaQuery(theme.breakpoints.up('md'));
    const showPaypal = useMediaQuery(theme.breakpoints.up('md'));


    return (
        <Grid container sx={{
            alignItems: 'flex-start',
        }}>
            <Grid container sx={{height: '25vh'}}>
                <Header history={history}/>
            </Grid>
            <Divider variant="middle"/>
            <Grid container sx={{height: '10vh'}}>
                <Container maxWidth="xl">
                    <Button variant='text' size="large" startIcon={<ArrowBackIosNew/>}
                            onClick={(e) => goToOrders(e)} sx={{textTransform: 'none'}} color="success"
                    >
                        See Orders
                    </Button>
                </Container>
            </Grid>
            {getOrderError ? <span>{getOrderError}</span>
                : getOrderLoading ? <span>Loading order information</span>
                    : getUserError ? <span>{getUserError}</span>
                        : getUserLoading ? <span>Loading user information...</span>
                            :
                            <Fragment>
                                <Grid item xs={1}/>
                                <Grid item sx={{
                                    height: '65vh',
                                    overflowY: 'auto',
                                    borderLeft: 1,
                                    borderRight: 1,
                                    borderWidth: 'thin',
                                    borderColor: 'lightgrey'
                                }} xs={6}>
                                    <Grid sx={{position: 'relative'}}>
                                        <Grid borderBottom={1} xs={12} sx={{
                                            position: 'sticky', borderColor: 'lightgrey', borderWidth: 'thin',
                                            top: 0,
                                        }}>
                                            <span style={{
                                                ...styles.title,
                                                paddingBottom: '10px'
                                            }}>Order {order._id}</span>
                                        </Grid>
                                        <Container
                                            sx={{display: 'flex', flexWrap: 'wrap', width: '90%', marginTop: '30px'}}>
                                            <span style={{...styles.subtitle, width: '100%'}}>Shipping</span>
                                            <span style={{
                                                letterSpacing: '1px',
                                                marginTop: '5px',
                                                marginBottom: '30px'
                                            }}>Address: {address.address + ", " + address.city + ", " + address.postCode + ", " + address.county + ", " + address.country}</span>
                                            <span style={{...styles.subtitle, width: '100%'}}>Paid Status</span>
                                            <span style={{
                                                letterSpacing: '1px',
                                                marginTop: '5px',
                                                marginBottom: '30px',
                                                color: order.isPaid ? "green" : "red"
                                            }}>{order.isPaid ? "Order has been paid for." : "Order hasn't been paid for."}</span>
                                            <span style={{...styles.subtitle, width: '100%'}}>Delivery Status</span>
                                            <span style={{
                                                letterSpacing: '1px',
                                                marginTop: '5px',
                                                marginBottom: '30px',
                                                color: order.isDelivered ? "green" : "red"
                                            }}>{order.isDelivered ? "Order has been delivered." : "Order hasn't been delivered yet."}</span>
                                            {showBasket && <Fragment>
                                                <span style={{
                                                    ...styles.subtitle,
                                                    marginBottom: '20px',
                                                    width: '100%'
                                                }}>Items</span>
                                                {order.items.map(item => {
                                                    return (
                                                        <Fragment>
                                                            <Grid container
                                                                  sx={{
                                                                      display: 'flex',
                                                                      flexWrap: 'wrap',
                                                                      marginBottom: '10px'
                                                                  }}>
                                                                <Grid item xs={2}><img style={{
                                                                    width: '100%',
                                                                    height: '75px',
                                                                    objectFit: 'contain'
                                                                }} src={item.product.image}
                                                                                       alt={item.product.name}/></Grid>
                                                                <Grid xs={1} item/>
                                                                <Grid item xs={2}
                                                                      sx={{
                                                                          alignItems: 'center',
                                                                          display: 'flex',
                                                                          letterSpacing: '1px',
                                                                      }}>{item.product.name}</Grid>
                                                                <Grid xs={1}/>
                                                                <Grid item xs={4} sx={{
                                                                    alignItems: 'center',
                                                                    display: 'flex', letterSpacing: '1px',
                                                                }}>{`${item.quantity} + " x " + "£" + ${item.product.price} + " = " + "£" + ${item.quantity * item.product.price}`}</Grid>
                                                                <Grid xs={2}/>
                                                            </Grid>
                                                            <Divider variant="middle" sx={{color: 'lightgrey'}}/>
                                                        </Fragment>
                                                    )
                                                })}
                                            </Fragment>}

                                        </Container>

                                    </Grid>
                                </Grid>
                                <Grid item sx={{height: '65vh', borderRight: 1, borderColor: 'lightgrey'}} xs={4}>
                                    <Grid borderBottom={1} xs={12} sx={{
                                        position: 'sticky', borderColor: 'lightgrey', borderWidth: 'thin',
                                        top: 0,
                                    }}>
                                        <span style={{...styles.title, paddingBottom: '10px'}}>Summary</span>
                                    </Grid>
                                    <Container>
                                        <Grid container
                                              sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                                            <Box sx={{
                                                border: 1,
                                                borderColor: 'lightgrey',
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                width: '80%',
                                                marginTop: '40px'
                                            }}>
                                                {/*ROW 1*/}
                                                <Grid sx={{borderBottom: 1, borderColor: 'lightgrey', height: '75px'}}
                                                      container>
                                                    <Grid sx={{
                                                        borderRight: 1,
                                                        alignItems: 'center',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        borderColor: 'lightgrey',
                                                        letterSpacing: '1px'
                                                    }} item xs={6}><span>Price (exVAT)</span></Grid>
                                                    <Grid sx={{
                                                        alignItems: 'center',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        borderColor: 'lightgrey',
                                                        letterSpacing: '1px'
                                                    }} item xs={6}><span>£{exVat}</span></Grid>
                                                </Grid>
                                                {/*ROW 1*/}

                                                {/*ROW 2*/}
                                                <Grid sx={{borderBottom: 1, borderColor: 'lightgrey', height: '75px'}}
                                                      container>
                                                    <Grid sx={{
                                                        borderRight: 1,
                                                        alignItems: 'center',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        borderColor: 'lightgrey',
                                                        letterSpacing: '1px'
                                                    }} item xs={6}><span>VAT</span></Grid>
                                                    <Grid sx={{
                                                        alignItems: 'center',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        borderColor: 'lightgrey',
                                                        letterSpacing: '1px'
                                                    }} item xs={6}><span>£{vat}</span></Grid>
                                                </Grid>
                                                {/*ROW 2*/}

                                                {/*ROW 3*/}
                                                <Grid sx={{borderBottom: 1, borderColor: 'lightgrey', height: '75px'}}
                                                      container>
                                                    <Grid sx={{
                                                        borderRight: 1,
                                                        alignItems: 'center',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        borderColor: 'lightgrey',
                                                        letterSpacing: '1px',
                                                    }} item xs={6}><span>Total</span></Grid>
                                                    <Grid sx={{
                                                        alignItems: 'center',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        borderColor: 'lightgrey',
                                                        letterSpacing: '1px'
                                                    }} item xs={6}><span>£{total}</span></Grid>
                                                </Grid>
                                                {!order.isPaid && showPaypal && <Grid container sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <Grid sx={{
                                                        width: '90%',
                                                        height: '100px',
                                                    }}>
                                                        <Payment order={order}/>
                                                    </Grid>
                                                </Grid>}
                                            </Box>
                                        </Grid>
                                    </Container>
                                </Grid>
                                <Grid item xs={1}/>
                            </Fragment>
            }
        </Grid>
    )
}

const styles = {
    subtitle: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '26px',
        letterSpacing: '1px',
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '32px',
        letterSpacing: '1px',
        backgroundColor: 'white'
    }
}

export default OrderOverview
