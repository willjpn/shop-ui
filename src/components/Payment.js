import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {PayPalButton} from 'react-paypal-button-v2';
import {useDispatch, useSelector} from "react-redux";
import {payOrder} from "../actions/orderActions";


const Payment = ({order}) => {

    // TODO - change currency to gbp

    const [sdkSetup, setSdkSetup] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)

    const dispatch = useDispatch()

    const payOrderState = useSelector(state => state.payOrder)
    const {loading, success, error} = payOrderState

    useEffect(() => {
        console.log("order information", order)
    }, [order])

    useEffect(() => {
        const addPaypal = async () => {
            const {data: clientId} = await axios.get('/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=GBP`
            script.async = true
            script.onload = () => {
                setSdkSetup(true)
            }
            document.body.appendChild(script)
        }

        // if (!window.paypal) {
        //     addPaypal();
        // } else {
        //     setSdkSetup(true);
        // }
        addPaypal()
        setSdkSetup(true)
        setPageLoading(false)
    }, [])


    const postPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order._id))
        setSdkSetup(false)
    };

    return (
        <Fragment>
            <h2>Pay Now</h2>
            {pageLoading && <h2>Loading payment options</h2>}
            {sdkSetup && <PayPalButton amount={order.totalPrice} onSuccess={postPaymentHandler}/>}
            {error && <h2>{error}</h2>}
            {loading && <h2>Confirming payment...</h2>}
            {success && <h2>Successfully confirmed payment for this order!</h2>}

        </Fragment>
    )
}

export default Payment
