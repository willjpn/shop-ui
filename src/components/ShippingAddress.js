import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addAddress} from "../actions/userActions";
import {SET_DEFAULT_ADDRESS_ADD} from "../constants/userConstants";
import {Button, TextField} from "@mui/material";
import {Save} from "@mui/icons-material";

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
            {loading ? <span style={{fontSize: '20px', color: 'green', letterSpacing: '1px', marginTop: 10, textAlign: 'center'}}>Updating your shipping address!</span> :
                <Fragment>

                    <TextField type="text" label="Address" sx={{width: '90%', marginY: '10px'}} name="address"
                               value={payload.address}
                               onChange={(e) => editPayload(e)}/>
                    <TextField type="text" label="Post Code" sx={{width: '90%', marginY: '10px'}} name="postCode"
                               value={payload.postCode}
                               onChange={(e) => editPayload(e)}/>
                    <TextField type="text" label="City" sx={{width: '90%', marginY: '10px'}} name="city"
                               value={payload.city}
                               onChange={(e) => editPayload(e)}/>
                    <TextField type="text" label="County" sx={{width: '90%', marginY: '10px'}} name="county"
                               value={payload.county}
                               onChange={(e) => editPayload(e)}/>
                    <TextField type="text" label="Country" sx={{width: '90%', marginY: '10px'}} name="country"
                               value={payload.country}
                               onChange={(e) => editPayload(e)}/>
                    <Button variant='contained' color="success" size="small"
                            sx={{ marginY: '15px', paddingY: '5px'}}
                            startIcon={<Save/>} onClick={(e) => submit(e)}
                    >
                        Save Shipping Address
                    </Button>
                </Fragment>
            }
            {addressAdded &&
            <span style={{fontSize: '20px', color: 'green', letterSpacing: '1px', marginTop: 10, textAlign: 'center'}}>Your shipping address has been updated!</span>}
            {error && <span style={{fontSize: '20px', color: 'red', letterSpacing: '1px', marginTop: 10, textAlign: 'center'}}>{error}</span>}
        </Fragment>
    )
}

export default ShippingAddress
