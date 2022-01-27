import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {resetPassword} from "../actions/userActions";
import {SET_DEFAULT_PASSWORD_RESET} from "../constants/userConstants";

const ResetPassword = () => {

    const dispatch = useDispatch()

    const [originalPassword, setOriginalPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [repeatPassword, setRepeatPassword] = useState()
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

    return (
        <Fragment>
            <h2>Reset Password</h2>
            {loading ? <h2>Resetting password</h2> : error ? <h2>{error}</h2> :
                <Fragment>
                    <form>
                        <div>
                            <label htmlFor="originalPassword">Original Password:</label>
                            <input type="password" id="originalPassword" name="originalPassword"
                                   onChange={(e) => setOriginalPassword(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="newPassword">New Password:</label>
                            <input type="password" id="newPassword" name="newPassword"
                                   onChange={(e) => setNewPassword(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="repeatPassword">Repeat New Password:</label>
                            <input type="password" id="repeatPassword" name="repeatPassword"
                                   onChange={(e) => setRepeatPassword(e.target.value)}/>
                        </div>
                        <div>
                            <button onClick={e => submit(e)}>Reset Password</button>
                        </div>
                    </form>
                    {passwordReset && <h3>You have successfully reset your password</h3>}
                </Fragment>


            }

        </Fragment>
    )
}

export default ResetPassword
