import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addAddress} from "../actions/userActions";
import {SET_DEFAULT_ADDRESS_ADD} from "../constants/userConstants";
import {Grid, TextField} from "@mui/material";
import {Save} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";

const ShippingAddress = ({shippingDetails}) => {

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
            <Grid style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <LoadingButton variant='outlined' color="success" size="large"
                               sx={{marginY: '15px', paddingY: '5px'}}
                               loading={loading}
                               startIcon={<Save/>} onClick={(e) => submit(e)}
                               disabled={!payload.address || !payload.postCode || !payload.city || !payload.county || !payload.country}
                >
                    Save Shipping Address
                </LoadingButton>
            </Grid>
            {addressAdded &&
            <span style={{fontSize: '20px', color: 'green', letterSpacing: '1px', marginTop: 10, textAlign: 'center'}}>Your shipping address has been updated!</span>}
            {error && <span style={{
                fontSize: '20px',
                color: 'red',
                letterSpacing: '1px',
                marginTop: 10,
                textAlign: 'center'
            }}>{error}</span>}
        </Fragment>
    )
}

export default ShippingAddress
