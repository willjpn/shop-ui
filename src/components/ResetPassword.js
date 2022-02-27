import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {resetPassword} from "../actions/userActions";
import {SET_DEFAULT_PASSWORD_RESET} from "../constants/userConstants";
import {Grid, TextField} from "@mui/material";
import {Save} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";

const ResetPassword = () => {

    const dispatch = useDispatch()

    const [originalPassword, setOriginalPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [passwordReset, setPasswordReset] = useState(false)

    const resetPasswordState = useSelector(state => state.resetPassword)
    const {loading, error, success} = resetPasswordState

    const submit = (e) => {
        e.preventDefault()
        dispatch(resetPassword({originalPassword, newPassword, repeatPassword}))
    }

    useEffect(() => {
        if (success) {
            setOriginalPassword('')
            setRepeatPassword('')
            setNewPassword('')
            setPasswordReset(true)
            dispatch({type: SET_DEFAULT_PASSWORD_RESET})
        }
    }, [success, dispatch])

    // TODO - if error don't hide form, simply show error and still show form

    return (
        <Fragment>
            <TextField type="password" label="Current Password" value={originalPassword} name="originalPassword"
                       placeholder="Current Password"
                       onChange={(e) => setOriginalPassword(e.target.value)}
                       sx={{width: '90%', marginY: '10px'}}/>
            <TextField type="password" label="New Password" value={newPassword} name="newPassword"
                       onChange={(e) => setNewPassword(e.target.value)} sx={{width: '90%', marginY: '10px'}}/>
            <TextField type="password" label="Repeat New Password" value={repeatPassword} name="repeatPassword"
                       onChange={(e) => setRepeatPassword(e.target.value)}
                       sx={{width: '90%', marginY: '10px'}}/>
            <Grid style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <LoadingButton variant='outlined' color="success" size="large"
                               sx={{marginY: '15px', paddingY: '5px'}}
                               loading={loading}
                               startIcon={<Save/>} onClick={(e) => submit(e)}
                               disabled={!originalPassword || !newPassword || !repeatPassword}
                >
                    Reset Password
                </LoadingButton>
            </Grid>
            {passwordReset &&
            <span style={{
                fontSize: '20px',
                color: 'green',
                letterSpacing: '1px',
                marginTop: 10,
                textAlign: 'center'
            }}>Your password has been reset!</span>}
            {error &&
            <span style={{
                fontSize: '20px',
                color: 'red',
                letterSpacing: '1px',
                marginTop: 10,
                textAlign: 'center'
            }}>{error}</span>}
        </Fragment>
    )
}

export default ResetPassword
