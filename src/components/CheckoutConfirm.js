import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../actions/userActions";
import Header from "./Header";
import {createOrder} from "../actions/orderActions";
import {emptyBasket} from "../actions/basketActions";
import {RESET_CREATE_ORDER_STATE} from "../constants/orderConstants";
import {Box, Button, Container, Divider, Grid, useMediaQuery, useTheme} from "@mui/material";
import {ArrowBackIosNew, ShoppingBasket} from "@mui/icons-material";

// TODO - remove devtools extension and check package.json

const CheckoutConfirm = ({history}) => {

    const {refreshFailed} = useSelector(state => state.auth)
    const userDetails = useSelector(state => state.userDetails)

    const [exVat, setExVat] = useState()
    const [vat, setVat] = useState()
    const [total, setTotal] = useState()

    const [address, setAddress] = useState({})

    const createOrderState = useSelector(state => state.createOrder)
    const {loading: createOrderLoading, error: createOrderError, order, success} = createOrderState

    const {basket} = useSelector(state => state.basket)

    const {loading, error, userInfo} = userDetails

    const dispatch = useDispatch()

    useEffect(() => {
        // check if user has access
        dispatch(getUser())
    }, [dispatch])

    useEffect(() => {
        if (refreshFailed) {
            history.push("/login?redirect=checkout/confirm")
        }

    }, [refreshFailed])

    // this is to check if an address was submitted in previous step. If not, go back to shipping step
    useEffect(() => {
        if (userInfo._id) {
            if (!userInfo.checkoutAddress) {
                return history.push("/checkout/shipping")
            } else {
                setAddress(userInfo.checkoutAddress)
            }
        }
    }, [userInfo])

    useEffect(() => {
        if (success) {
            // if an order has been successfully placed, we should clear the basket
            dispatch(emptyBasket())
            history.push(`/orders/${order._id}`)
            dispatch({type: RESET_CREATE_ORDER_STATE})
        }
    }, [success])

    useEffect(() => {
        if (!basket.length) {
            history.push("/")
        } else {
            const reduced = basket.reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
            ).toFixed(2)

            setExVat(reduced.toString())
            setVat((reduced / 5).toFixed(2).toString())
            setTotal((reduced * 1.2).toFixed(2).toString())
        }
    }, [basket])

    const submitOrder = (e) => {

        const items = basket.map(item => {
            return {product: item.product, quantity: item.quantity}
        })

        const payload = {
            items: items,
            shippingAddress: address,
            totalPrice: total,
            exVat: exVat,
            vat: vat,
        }

        dispatch(createOrder(payload))

        e.preventDefault()
    }


    const goBack = (e) => {
        e.preventDefault()
        history.push("/checkout/shipping")
    }

    const theme = useTheme();
    const showBasket = useMediaQuery(theme.breakpoints.up('md'));

    // TODO- update stock count after order is placed or delivered

    // TODO - add green and red loading and error text respectively

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
                            onClick={(e) => goBack(e)} sx={{textTransform: 'none'}} color="success"
                    >
                        Go Back
                    </Button>
                </Container>
            </Grid>
            {createOrderLoading ? <span>Creating a new order!</span> : createOrderError ?
                <span>{createOrderError}</span>
                : loading ? <span>Loading your information!</span> : error ? <span>{error}</span> :
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
                                    <span style={{...styles.title, paddingBottom: '10px'}}>Order Details</span>
                                </Grid>
                                <Container
                                    sx={{display: 'flex', flexWrap: 'wrap', width: '90%', marginTop: '30px'}}>
                                    <span style={{...styles.subtitle, width: '100%'}}>Shipping</span>
                                    <span style={{
                                        letterSpacing: '1px',
                                        marginTop: '5px',
                                        marginBottom: '30px'
                                    }}>Address: {address.address + ", " + address.city + ", " + address.postCode + ", " + address.county + ", " + address.country}</span>
                                    {showBasket && <Fragment>

                                        <span style={{...styles.subtitle, marginBottom: '20px', width: '100%'}}>Items</span>
                                        {basket.map(item => {
                                            return (
                                                <Fragment key={item.product._id}>
                                                    <Grid container
                                                          sx={{display: 'flex', flexWrap: 'wrap', marginBottom: '10px'}}>
                                                        <Grid item xs={2}><img style={{
                                                            width: '100%',
                                                            height: '75px',
                                                            objectFit: 'contain'
                                                        }} src={item.product.image} alt={item.product.name}/></Grid>
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
                                                        }}>{item.quantity + " x " + "£" + item.product.price + " = " + "£" + item.quantity * item.product.price}</Grid>
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
                                <Grid container sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
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
                                        <Grid sx={{
                                            width: '100%',
                                            height: '70px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginTop: '5px'
                                        }}>
                                            <Button variant='outlined' color="success" size="large"
                                                    startIcon={<ShoppingBasket/>} onClick={e => submitOrder(e)}
                                            >
                                                Place Order
                                            </Button>
                                        </Grid>
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

export default CheckoutConfirm
