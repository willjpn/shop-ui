import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {getClientId} from "../actions/authActions";
import {payOrder} from "../actions/orderActions";
import {Grid} from "@mui/material";

const Payment = ({order}) => {

    const dispatch = useDispatch()

    const getClientIdState = useSelector(state => state.getClientId)
    const {loading, error, clientId} = getClientIdState

    useEffect(() => {
        dispatch(getClientId())
    }, [dispatch])

    const postPaymentHandler = () => {
        dispatch(payOrder(order._id))
    };

    return (
        <Grid sx={{marginTop: '25px'}}>
            {loading ? <h2>Loading</h2> : error ? <h2>{error}</h2> :
                <PayPalScriptProvider options={{"client-id": clientId}}>
                    <PayPalButtons fundingSource="paypal"
                                   createOrder={(data, actions) => {
                                       return actions.order
                                           .create({
                                               purchase_units: [
                                                   {
                                                       amount: {
                                                           value: order.totalPrice,
                                                       },
                                                   },
                                               ],
                                           })
                                   }}
                                   onApprove={(data, actions) => {
                                       return actions.order.capture().then(() => {
                                           postPaymentHandler()
                                       });
                                   }}
                    />
                </PayPalScriptProvider>
            }

        </Grid>
    )
}

export default Payment
