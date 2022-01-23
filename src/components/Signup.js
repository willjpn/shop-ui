import Header from "./Header"
import React, {Fragment, useEffect, useState} from "react";
import {Redirect} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {createNewUser} from "../actions/userActions";

const Signup = () => {

    const signup = useSelector(state => state.signup)
    const {loading, error, success} = signup

    const dispatch = useDispatch()

    const [payload, setPayload] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const inputHandler = (e) => {
        setPayload(prevPayload => {
            return {
                ...prevPayload,
                [e.target.name]: e.target.value
            }
        })
    }

    useEffect(() => {
        console.log("payload", payload)
    }, [payload])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createNewUser(payload))
    }

    return (
        <Fragment>
            <Header/>
            {error ? <h2>{error}</h2> : success ? <Redirect to="/"/> : loading ? <h2>Loading...</h2> :
                <form>
                    <div>
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" id="firstName" name="firstName" value={payload.firstName}
                               onChange={(e) => inputHandler(e)}/>
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" id="lastName" name="lastName" value={payload.lastName}
                               onChange={(e) => inputHandler(e)}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" name="email" value={payload.email}
                               onChange={(e) => inputHandler(e)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={payload.password}
                               onChange={(e) => inputHandler(e)}/>
                    </div>
                    <div>
                        <button onClick={submitHandler}>Create Account</button>
                    </div>
                </form>}
        </Fragment>
    )
}

export default Signup
