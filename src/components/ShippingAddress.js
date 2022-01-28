import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addAddress} from "../actions/userActions";
import {SET_DEFAULT_ADDRESS_ADD} from "../constants/userConstants";

const ShippingAddress = ({shippingDetails}) => {

    // TODO - add multiple shipping addresses

    const addAddressState = useSelector(state => state.addAddress)
    const {loading, error, success} = addAddressState

    const dispatch = useDispatch()

    const [addressAdded, setAddressAdded] = useState(false)

    const [payload, setPayload] = useState({
        address: '',
        postCode: '',
        city: '',
        county: '',
        country: ''
    })

    useEffect(() => {
        if (shippingDetails) {
            setPayload({
                address: shippingDetails.address,
                postCode: shippingDetails.postCode,
                city: shippingDetails.city,
                country: shippingDetails.country,
                county: shippingDetails.county
            })
        }
    }, [shippingDetails])

    useEffect(() => {
        if (success) {
            setAddressAdded(true)
            dispatch({type: SET_DEFAULT_ADDRESS_ADD})
        }
    }, [success, dispatch])

    const editPayload = (e) => {
        setPayload(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const submit = (e) => {
        e.preventDefault()
        dispatch(addAddress(payload))
    }

    return (
        <Fragment>
            <h2>Shipping Address</h2>
            {loading ? <h2>Updating your shipping address...</h2> : error ? <h2>{error}</h2> :
                <form>
                    <div>
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" name="address" value={payload.address}
                               onChange={(e) => editPayload(e)}/>
                    </div>
                    <div>
                        <label htmlFor="postCode">Post Code:</label>
                        <input type="text" id="postCode" name="postCode" value={payload.postCode}
                               onChange={(e) => editPayload(e)}/>
                    </div>
                    <div>
                        <label htmlFor="city">City:</label>
                        <input type="text" id="city" name="city" value={payload.city}
                               onChange={(e) => editPayload(e)}/>
                    </div>
                    <div>
                        <label htmlFor="county">County:</label>
                        <input type="text" id="county" name="county" value={payload.county}
                               onChange={(e) => editPayload(e)}/>
                    </div>
                    <div>
                        <label htmlFor="country">Country:</label>
                        <input type="text" id="country" name="country" value={payload.country}
                               onChange={(e) => editPayload(e)}/>
                    </div>
                    <div>
                        <button onClick={e => submit(e)}>Set Shipping Address</button>
                    </div>
                </form>
            }
            {addressAdded && <h3>You have successfully updated your shipping address</h3>}
        </Fragment>
    )
}

export default ShippingAddress
