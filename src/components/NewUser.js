import React, {Fragment, useEffect, useState} from "react";
import {createUser, getUser} from "../actions/userActions";
import {useDispatch, useSelector} from "react-redux";
import Header from "./Header";
import {ADD_USER_RESET} from "../constants/userConstants";

const NewProduct = ({history}) => {

    const userDetails = useSelector(state => state.userDetails)
    const addUser = useSelector(state => state.addUser)

    const {loading: userLoading, error: userError, userInfo} = userDetails
    const {loading: addUserLoading, error: addUserError, success} = addUser

    const dispatch = useDispatch()

    const [isAdmin, setIsAdmin] = useState(false)

    const [payload, setPayload] = useState({
        firstName: '',
        lastName: '',
        password: '',
        email: ''
    })

    const editPayload = (e) => {
        setPayload(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const {refreshFailed} = useSelector(state => state.auth)

    useEffect(() => {
        if (refreshFailed) {
            history.push(`/login?redirect=user/new`)
        }
    }, [refreshFailed])

    // first thing to do is check for admin access

    useEffect(() => {
        // check if user has admin rights
        dispatch(getUser())
    }, [dispatch])

    useEffect(() => {
        if (userInfo._id && !userInfo.isAdmin) {
            history.push("/")
        }
    }, [userInfo, history])

    const submitUser = (e) => {
        e.preventDefault()
        dispatch(createUser({...payload, isAdmin: isAdmin}))
    }

    useEffect(() => {
        if (success) {
            history.push("/user-list")
            dispatch({type: ADD_USER_RESET})
        }
    }, [success, history, dispatch])

    const goBack = () => {
        history.push("/user-list")
    }

    return (
        <Fragment>
            <Header history={history}/>
            <button onClick={goBack}>Go Back</button>
            <h2>Create A New User</h2>
            {userLoading ? <h2>Loading user information</h2>
                : userError ? <h2>An error has occurred whilst fetching user information</h2>
                    : addUserLoading ? <h2>Creating new user</h2>
                        : addUserError ? <h2>Unable to create a new user</h2> :
                            <div>
                                <form>
                                    <div>
                                        <label htmlFor="firstName">First Name:</label>
                                        <input type="text" id="firstName" name="firstName"
                                               onChange={(e) => editPayload(e)}/>
                                    </div>
                                    <div>
                                        <label htmlFor="lastName">Last Name:</label>
                                        <input type="text" id="lastName" name="lastName"
                                               onChange={(e) => editPayload(e)}/>
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email Address:</label>
                                        <input type="email" id="email" name="email"
                                               onChange={(e) => editPayload(e)}/>
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password:</label>
                                        <input type="password" id="password" name="password"
                                               onChange={(e) => editPayload(e)}/>
                                    </div>
                                    <div>
                                        <label htmlFor="isAdmin">Admin:</label>
                                        <input type="checkbox" id="isAdmin" name="isAdmin" checked={isAdmin}
                                               onChange={(e) => setIsAdmin(e.target.checked)}/>
                                    </div>
                                    <div>
                                        <button onClick={(e) => submitUser(e)}>
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
            }
        </Fragment>
    )
}

export default NewProduct
