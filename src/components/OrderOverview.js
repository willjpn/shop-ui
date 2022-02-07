import {useEffect, Fragment} from "react";
import {getUser} from "../actions/userActions";
import {useDispatch, useSelector} from "react-redux";
import Header from "./Header";
import {getOrder} from "../actions/orderActions";
import Payment from "./Payment";

const OrderOverview = ({match, history}) => {

    // TODO - need to see if the order belongs to the user trying to access it


    const id = match.params.id

    const {refreshFailed} = useSelector(state => state.auth)
    const userDetails = useSelector(state => state.userDetails)
    const {loading: getUserLoading, error: getUserError} = userDetails

    const getOrderState = useSelector(state => state.getOrder)
    const {loading: getOrderLoading, error: getOrderError, order} = getOrderState

    const dispatch = useDispatch()

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
    }, [refreshFailed])

    return (
        <Fragment>
            <Header/>
            {getOrderError ? <h2>{getOrderError}</h2>
                : getOrderLoading ? <h2>Loading order information</h2>
                    : getUserError ? <h2>{getUserError}</h2>
                        : getUserLoading ? <h2>Loading user information...</h2>
                            :
                            <Fragment>
                                <h2>Order - {id}</h2>
                                <h2>Order Delivered: {order.isDelivered ? "Yes" : "No"}</h2>
                                <h2>Order Paid For: {order.isPaid ? "Yes" : "No"}</h2>
                                {!order.isPaid && <Payment order={order}/>}
                            </Fragment>
            }
        </Fragment>
    )
}

export default OrderOverview
