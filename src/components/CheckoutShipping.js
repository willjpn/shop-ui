import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addTemporaryAddress, getUser} from "../actions/userActions";
import Header from "./Header";
import {RESET_TEMPORARY_ADDRESS_STATE, RESET_USER_INFO} from "../constants/userConstants";
import {Button, Container, Divider, Grid, TextField} from "@mui/material";
import {ArrowBackIosNew, Save} from "@mui/icons-material";
// import LoadingButton from "@mui/lab/LoadingButton";

const CheckoutShipping = ({history}) => {

    const {refreshFailed} = useSelector(state => state.auth)
    const userDetails = useSelector(state => state.userDetails)

    const {loading, error, userInfo} = userDetails

    const {
        loading: addTemporaryAddressLoading,
        error: addTemporaryAddressError,
        success: addTemporaryAddressSuccess
    } = useSelector(state => state.addTemporaryAddress)


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
        dispatch(addTemporaryAddress(payload))
    }

    useEffect(() => {
        if (addTemporaryAddressSuccess) {
            history.push("/checkout/confirm")
        }

        dispatch({type: RESET_TEMPORARY_ADDRESS_STATE})
        // we need to reset the user info because in the confirm step we check for userInfo.checkoutAddress.
        // If userInfo already exists in redux, it won't have a checkout address and we therefore get redirected to this screen
        dispatch({type: RESET_USER_INFO})
    }, [addTemporaryAddressSuccess])

    const goBack = (e) => {
        e.preventDefault()
        history.push("/")
    }

    return (
        <Grid container sx={{
            alignItems: 'flex-start',
        }}>

            <Grid xs={12} sx={{overflowY: 'auto'}}>

                <Grid container sx={{height: '25vh'}}>
                    <Header history={history}/>
                </Grid>
                <Divider variant="middle"/>

                {loading ? <span>Loading your details!</span> : error ? <span>{error}</span>
                    :
                    <Grid container sx={{height: '75vh', paddingTop: '25px'}}>
                        <Grid item xs={3}>
                            <Container sx={{display: 'flex', alignItems: 'center'}} maxWidth="xl">
                                <Button variant='text' size="large" startIcon={<ArrowBackIosNew/>}
                                        onClick={(e) => goBack(e)} sx={{textTransform: 'none'}} color="success"
                                >
                                    Go Back
                                </Button>
                            </Container>
                        </Grid>
                        <Grid item xs={6}>
                            <Container maxWidth="md"
                                       sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                                <span style={styles.subtitle}>Add Shipping Address</span>

                                <TextField type="text" label="Address" sx={{width: '90%', marginY: '10px'}}
                                           required
                                           name="address"
                                           value={payload.address}
                                           onChange={(e) => editPayload(e)}/>
                                <TextField type="text" label="Post Code" sx={{width: '90%', marginY: '10px'}}
                                           name="postCode"
                                           required
                                           value={payload.postCode}
                                           onChange={(e) => editPayload(e)}/>
                                <TextField type="text" label="City" sx={{width: '90%', marginY: '10px'}} name="city"
                                           value={payload.city}
                                           required
                                           onChange={(e) => editPayload(e)}/>
                                <TextField type="text" label="County" sx={{width: '90%', marginY: '10px'}}
                                           name="county"
                                           value={payload.county}
                                           required
                                           onChange={(e) => editPayload(e)}/>
                                <TextField type="text" label="Country" sx={{width: '90%', marginY: '10px'}}
                                           name="country"
                                           required
                                           value={payload.country}
                                           onChange={(e) => editPayload(e)}/>
                                <Grid sx={{...styles.checkoutButtonGrid}}>
                                    {/*<LoadingButton variant='outlined' color="success" size="large"*/}
                                    {/*               loading={addTemporaryAddressLoading}*/}
                                    {/*               sx={styles.checkoutButton}*/}
                                    {/*               startIcon={<Save/>} onClick={(e) => submit(e)}*/}
                                    {/*               disabled={!payload.address || !payload.city || !payload.postCode || !payload.county || !payload.country}*/}
                                    {/*>*/}
                                    {/*    Confirm*/}
                                    {/*</LoadingButton>*/}
                                    <Button variant='outlined' color="success" size="large"
                                                   sx={styles.checkoutButton}
                                                   startIcon={<Save/>} onClick={(e) => submit(e)}
                                                   disabled={!payload.address || !payload.city || !payload.postCode || !payload.county || !payload.country}
                                    >
                                        Confirm
                                    </Button>
                                </Grid>
                                {addTemporaryAddressError &&
                                <span style={{
                                    fontSize: '20px',
                                    color: 'red',
                                    letterSpacing: '1px',
                                    marginTop: 10,
                                    textAlign: 'center'
                                }}>{addTemporaryAddressError}</span>}
                            </Container>
                        </Grid>
                        <Grid item xs={3}/>
                    </Grid>
                }
            </Grid>
        </Grid>
    )
}

const styles = {
    checkoutButtonGrid: {
        display: 'flex', marginTop: 'auto', marginBottom: '20px',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        borderWidth: 'thick',
        borderColor: 'lightgrey',
    },
    checkoutButtonBox: {
        marginTop: '20px',
        fontSize: '24px',
        fontWeight: 'thin',
        textAlign: 'center',
    },
    checkoutButton: {marginTop: '20px'},
    subtitle: {
        border: 1,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '30px',
        letterSpacing: '1px',
        width: '90%',
        marginBottom: '15px'
    }
}

export default CheckoutShipping
