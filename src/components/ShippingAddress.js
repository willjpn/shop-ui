import {Fragment, useEffect} from "react";

const ShippingAddress = ({shippingDetails}) => {

    useEffect(() => {
        console.log("shippingDetails", shippingDetails)
    })

    return (
        <Fragment>
            <h2>Shipping Address</h2>
        </Fragment>
    )
}

export default ShippingAddress
