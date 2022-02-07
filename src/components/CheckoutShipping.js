import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../actions/userActions";
import Header from "./Header";
import {ADD_CHECKOUT_ADDRESS} from "../constants/userConstants";

const CheckoutShipping = ({history}) => {

    const {refreshFailed} = useSelector(state => state.auth)
    const userDetails = useSelector(state => state.userDetails)

    const {loading, error, userInfo} = userDetails

    const dispatch = useDispatch()

    const [payload, setPayload] = useState({
        address: '',
        postCode: '',
        city: '',
        county: '',
        country: ''
    })

    useEffect(() => {
        // check if user has access
        dispatch(getUser())
    }, [dispatch])

    useEffect(() => {
        if (userInfo.shippingDetails) {
            setPayload({
                address: userInfo.shippingDetails.address,
                postCode: userInfo.shippingDetails.postCode,
                city: userInfo.shippingDetails.city,
                country: userInfo.shippingDetails.country,
                county: userInfo.shippingDetails.county
            })
        }
    }, [userInfo])

    useEffect(() => {
        if (refreshFailed) {
            history.push("/login?redirect=checkout/shipping")
        }
    }, [refreshFailed])

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
        dispatch({type: ADD_CHECKOUT_ADDRESS, payload: payload})
        history.push("/checkout/confirm")
    }

    const goBack = (e) => {
        e.preventDefault()
        history.push("/basket")
    }

    return (
        <Fragment>
            <Header/>
            <h2>Checkout</h2>
            {error ? <h2>Unable to load user information...</h2> : loading ? <h2>Loading user information...</h2> :
                <Fragment>
                    <button onClick={e => goBack(e)}>Go Back</button>
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
                            <button onClick={e => submit(e)}>Next</button>
                        </div>
                    </form>
                </Fragment>
            }
        </Fragment>
    )
}

export default CheckoutShipping
