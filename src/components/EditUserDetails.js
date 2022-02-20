import {Button, Grid, TextField} from "@mui/material";
import {Save} from "@mui/icons-material";
import React, {Fragment, useEffect, useState} from "react";
import {editUserDetails} from "../actions/userActions";
import {useDispatch, useSelector} from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";

const EditUserDetails = ({userInfo}) => {

    const editUserDetailsState = useSelector(state => state.editUserDetails)
    const {loading, success, error} = editUserDetailsState

    const dispatch = useDispatch()

    useEffect(() => {
            if (userInfo.firstName) {
                setPayload({
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    email: userInfo.email
                })
            }
        }
        ,
        [userInfo]
    )

    const [payload, setPayload] = useState({
        firstName: '',
        lastName: '',
        email: '',

    })

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
        dispatch(editUserDetails(payload))
    }

    // TODO - style error and loading messages for each component

    return (
        <Fragment>
                <Fragment>

                    <TextField type="text" label="First Name" sx={{width: '90%', marginY: '10px'}} name="firstName"
                               value={payload.firstName}
                               error={!payload.firstName}
                               helperText={!payload.firstName && "This field can not be empty."}
                               onChange={(e) => editPayload(e)}/>
                    <TextField type="text" label="Last Name" sx={{width: '90%', marginY: '10px'}} name="lastName"
                               error={!payload.lastName}
                               helperText={!payload.lastName && "This field can not be empty."}
                               value={payload.lastName}
                               onChange={(e) => editPayload(e)}/>
                    <TextField type="email" label="Email" sx={{width: '90%', marginY: '10px'}} name="email"
                               error={!payload.email}
                               helperText={!payload.email && "This field can not be empty."}
                               value={payload.email}
                               onChange={(e) => editPayload(e)}/>
                    <Grid style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <LoadingButton variant='outlined' color="success" size="large" onClick={(e) => {
                            submit(e)
                        }}
                                       sx={{ marginY: '15px', paddingY: '5px'}}
                                       loading={loading}
                                       startIcon={<Save/>}
                                       disabled={!payload.firstName || !payload.lastName || !payload.email}
                        >
                            Save Changes
                        </LoadingButton>
                    </Grid>

                    {success && <span style={{
                        fontSize: '20px',
                        color: 'green',
                        letterSpacing: '1px',
                        marginTop: 10,
                        textAlign: 'center'
                    }}>Your details have been updated!</span>}
                    {error && <span style={{
                        fontSize: '20px',
                        color: 'red',
                        letterSpacing: '1px',
                        marginTop: 10,
                        textAlign: 'center'
                    }}>{error}</span>}
                </Fragment>

        </Fragment>
    )
}

export default EditUserDetails
