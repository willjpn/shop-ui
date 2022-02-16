import {Box, Button, Grid} from "@mui/material";
import {Add, Delete, Remove, ShoppingCart} from "@mui/icons-material";
import {Fragment, useEffect, useState} from "react";
import {decrementProduct, incrementProduct, removeFromBasket} from "../actions/basketActions";

const HomeBasket = ({basket, history, dispatch}) => {

    const [total, setTotal] = useState()

    useEffect(() => {
        if (basket.length) {
            let totalPrice = 0
            for (let item of basket) {
                totalPrice += item.quantity * item.product.price
            }
            totalPrice = totalPrice.toFixed(2)
            setTotal(totalPrice)
        } else {
            setTotal(0)
        }
    }, [basket])


    const deleteFromBasket = (id) => {
        dispatch(removeFromBasket(id))
    }

    const increment = (id) => {
        dispatch(incrementProduct(id))
    }

    const decrement = (id) => {
        dispatch(decrementProduct(id))
    }

    const checkout = (e) => {
        e.preventDefault()
        history.push('/checkout/shipping')
    }

    return (
        <Fragment>
            <Grid sx={{height: '85%', overflowY: 'scroll'}}>
                <Box sx={styles.basketTitle}>Basket</Box>
                {!basket.length ? <Box sx={styles.emptyBasket}>Your Basket Is Empty!</Box>
                    : basket.map((item) => (
                        <Grid key={item._id} container sx={{display: 'flex'}}>
                            <Grid sx={styles.productName} item xl={4}>
                                {item.product.name}
                            </Grid>
                            <Grid item xl={8} sx={styles.productActions}>
                                <Button onClick={() => decrement(item.product._id)} size="small"><Remove
                                    color="error"/></Button>
                                <span>{item.quantity}</span>
                                <Button onClick={() => increment(item.product._id)} size="small"><Add
                                    color="success"/></Button>
                                {/*<Button variant='outlined' color="error" size="small"*/}
                                {/*        startIcon={<Delete/>} onClick={() => deleteFromBasket(item.product._id)}*/}
                                {/*>*/}
                                {/*    Remove*/}
                                {/*</Button>*/}
                                <Button onClick={() => deleteFromBasket(item.product._id)}>
                                    <Delete color="error"/>
                                </Button>
                            </Grid>
                        </Grid>

                    ))
                }
            </Grid>

            <Grid sx={{...styles.checkoutButtonGrid, height: '15%'}}>
                <Box sx={{
                    ...styles.checkoutButtonBox,
                    color: total === 0 ? "darkgrey" : "green"
                }}>£{total === 0 ? '0.00' : total}</Box>
                <Button variant='outlined' color="success" size="large" sx={styles.checkoutButton}
                        startIcon={<ShoppingCart/>} onClick={(e) => checkout(e)} disabled={total === 0}
                >
                    Checkout
                </Button>
            </Grid>
        </Fragment>
    )
}

let styles = {
    basketTitle: {
        marginTop: '20px',
        fontSize: '24px',
        color: "darkgrey",
        textAlign: 'center'
    },
    emptyBasket: {
        marginTop: '40px',
        fontSize: '24px',
        color: 'darkgrey',
        fontWeight: 'thinner',
        borderWidth: 'thin',
        textAlign: 'center'
    },
    productName: {
        marginTop: '20px',
        fontSize: '18px',
        fontWeight: 'thin',
        alignItems: 'center',
        paddingLeft: 2,
        display: 'flex'
    },
    productActions: {
        marginTop: '20px',
        fontSize: '18px',
        fontWeight: 'thin',
        alignItems: 'center',
        paddingLeft: 2,
        display: 'flex'
    },
    checkoutButtonGrid: {
        display: 'flex', marginTop: 'auto', marginBottom: '20px',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderTop: 1,
        borderWidth: 'thick',
        borderColor: 'lightgrey',
    },
    checkoutButtonBox: {
        marginTop: '20px',
        fontSize: '24px',
        fontWeight: 'thin',
        borderWidth: 'thin',
        textAlign: 'center',
    },
    checkoutButton: {marginTop: '20px'}


}

export default HomeBasket
