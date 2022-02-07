import {useEffect, Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../actions/userActions";
import Header from "./Header";
import OrderTable from "./OrderTable";
import {getOrders} from "../actions/orderActions";

const OrderList = ({history}) => {

    const userDetails = useSelector(state => state.userDetails)
    const {loading: ordersLoading, error: ordersError, orders} = useSelector(state => state.orders)

    const removeOrderState = useSelector(state => state.removeOrder)
    const {loading: removeOrderLoading, error: removeOrderError, success} = removeOrderState


    const {loading: userLoading, error: userError, userInfo} = userDetails

    const dispatch = useDispatch()

    const {refreshFailed} = useSelector(state => state.auth)

    useEffect(() => {
        if (refreshFailed) {
            history.push(`/login?redirect=order-list`)
        }
    }, [refreshFailed])

    useEffect(() => {
        // check if user has admin rights
        dispatch(getUser())
    }, [dispatch])

    useEffect(() => {
        if (userInfo._id && !userInfo.isAdmin) {
            history.push("/")
        } else {
            dispatch(getOrders())
        }
    }, [userInfo, dispatch, history])

    return (
        <Fragment>
            <Header/>
            <h2>Order List</h2>
            {userError ? <h2>Unable to load user</h2>
                : userLoading ? <h2>Loading user information</h2>
                    : ordersError ? <h2>{ordersError}</h2>
                        : ordersLoading ? <h2>Loading orders</h2>
                            : removeOrderError ? <h2>{removeOrderError}</h2>
                                : removeOrderLoading ? <h2>Removing order...</h2> :
                                    <div>
                                        <OrderTable orders={orders} dispatch={dispatch} history={history}/>
                                    </div>
            }
        </Fragment>
    )
}

export default OrderList
