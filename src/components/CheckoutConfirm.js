import React, {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../actions/userActions";
import Header from "./Header";
import {createOrder} from "../actions/orderActions";
import {emptyBasket} from "../actions/basketActions";

// TODO - remove devtools extension and check package.json

const CheckoutConfirm = ({history}) => {

    const {refreshFailed} = useSelector(state => state.auth)
    const userDetails = useSelector(state => state.userDetails)

    const addCheckoutAddress = useSelector(state => state.addCheckoutAddress)
    const {address} = addCheckoutAddress

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
        if (!address) {
            history.push("/checkout/shipping")
        } else {
            console.log("address provided", address)
        }
    }, [address])

    useEffect(() => {
        if (success) {
            // if an order has been successfully placed, we should clear the basket
            dispatch(emptyBasket())
            history.push(`/orders/${order._id}`)
        }
    }, [success])

    const submitOrder = (e) => {
        const totalPrice = basket.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        ).toFixed(2)

        const items = basket.map(item => {
            return {product: item.product, quantity: item.quantity}
        })

        const payload = {
            items: items,
            shippingAddress: address,
            totalPrice: totalPrice
        }

        dispatch(createOrder(payload))

        e.preventDefault()
    }


    const goBack = (e) => {
        e.preventDefault()
        history.push("/checkout/shipping")
    }

    return (
        <Fragment>
            <Header/>
            {createOrderLoading ? <h2>Creating a new order...</h2> : createOrderError ? <h2>{createOrderError}</h2> :
                <Fragment>
                    <button onClick={e => goBack(e)}>Go Back</button>
                    <h2>Confirm Checkout</h2>
                    <button onClick={e => submitOrder(e)}>Confirm Order</button>
                </Fragment>
            }

        </Fragment>
    )
}

export default CheckoutConfirm
