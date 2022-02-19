import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {resetPassword} from "../actions/userActions";
import {SET_DEFAULT_PASSWORD_RESET} from "../constants/userConstants";
import {Button, TextField} from "@mui/material";
import {Save} from "@mui/icons-material";

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
            {loading ? <span style={{fontSize: '20px', color: 'green', letterSpacing: '1px', marginTop: 10, textAlign: 'center'}}>Resetting your password!</span> :
                <Fragment>
                    <TextField type="password" label="Current Password" value={originalPassword} name="originalPassword"
                               placeholder="Current Password"
                               onChange={(e) => setOriginalPassword(e.target.value)}
                               // error={!originalPassword}
                               // helperText={!originalPassword && "This field can not be empty."}
                               sx={{width: '90%', marginY: '10px'}}/>
                    <TextField type="password" label="New Password" value={newPassword} name="newPassword"
                               // error={!newPassword}
                               // helperText={!newPassword && "This field can not be empty."}
                               onChange={(e) => setNewPassword(e.target.value)} sx={{width: '90%', marginY: '10px'}}/>
                    <TextField type="password" label="Repeat New Password" value={repeatPassword} name="repeatPassword"
                               // error={!repeatPassword}
                               // helperText={!repeatPassword && "This field can not be empty."}
                               onChange={(e) => setRepeatPassword(e.target.value)}
                               sx={{width: '90%', marginY: '10px'}}/>
                    <Button variant='contained' color="success" size="small"
                            sx={{ marginY: '15px', paddingY: '5px'}}
                            startIcon={<Save/>} onClick={(e) => submit(e)}
                            disabled={!originalPassword || !newPassword || !repeatPassword}
                    >
                        Reset Password
                    </Button>
                    {passwordReset &&
                    <span style={{fontSize: '20px', color: 'green', letterSpacing: '1px', marginTop: 10, textAlign: 'center'}}>Your password has been reset!</span>}
                    {error &&
                    <span style={{fontSize: '20px', color: 'red', letterSpacing: '1px', marginTop: 10, textAlign: 'center'}}>{error}</span>}
                </Fragment>


            }

        </Fragment>
    )
}

export default ResetPassword
