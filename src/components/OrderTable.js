import {Fragment} from "react";
import {useDispatch} from "react-redux";
import {removeOrder} from "../actions/orderActions";

const OrderTable = ({orders}) => {

    const dispatch = useDispatch()

    const deleteOrder = (id) => {
        dispatch(removeOrder(id))
    }

    return (
        // by default get first ten orders

        // then if a user has been selected from dropdown, get first ten orders for that user

        <Fragment>
            {!orders.length ? <h2>No orders have been created...</h2> :
                <table style={{minWidth: 650}} aria-label="simple table">
                    <thead>
                    <tr>
                        <th align="left">Id</th>
                        <th align="left">User</th>
                        <th align="left">Is Paid?</th>
                        <th align="left">Is Dispatched?</th>
                        <th align="left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>
                                {order._id}
                            </td>
                            <td>
                                {order.user.firstName} {order.user.lastName}
                            </td>
                            <td>
                                {order.isPaid ? "Yes" : "No"}
                            </td>
                            <td>
                                {order.isDelivered ? "Yes" : "No"}
                            </td>
                            <td>
                                <button onClick={() => deleteOrder(order._id)}>
                                    DELETE
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>}

        </Fragment>


    )
}

export default OrderTable
