import React, {Fragment, useEffect, useState} from "react";
import {fetchEditUser, getUser, updateUser} from "../actions/userActions";
import {useDispatch, useSelector} from "react-redux";
import Header from "./Header";
import {UPDATE_USER_RESET} from "../constants/userConstants";

const EditUser = ({match, history}) => {

    const id = match.params.id

    const userDetails = useSelector(state => state.userDetails)
    const editUserDetails = useSelector(state => state.editUser)
    const updateUserDetails = useSelector(state => state.updateUser)

    const {loading: userLoading, error: userError, userInfo} = userDetails
    const {loading: editUserLoading, error: editUserError, user: editUser} = editUserDetails
    const {loading: updateUserLoading, error: updateUserError, success} = updateUserDetails

    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    // first thing to do is check for admin access

    useEffect(() => {
        // check if user has admin rights
        dispatch(getUser())
    }, [dispatch])

    useEffect(() => {
        if (userInfo._id && !userInfo.isAdmin) {
            history.push("/")
        } else {
            dispatch(fetchEditUser(id))
        }
    }, [userInfo, dispatch, history, id])

    useEffect(() => {
        if (editUser.firstName) {
            setFirstName(editUser.firstName)
            setLastName(editUser.lastName)
            setIsAdmin(editUser.isAdmin)
        }
    }, [editUser])

    const goBack = () => {
        history.push("/user-list")
    }

    const submitUser = async (e) => {
        e.preventDefault()
        const payload = {firstName, lastName, isAdmin}
        dispatch(updateUser(id, payload))
    }

    const {refreshFailed} = useSelector(state => state.auth)

    useEffect(() => {
        if (refreshFailed) {
            history.push(`/login?redirect=user/edit/${id}`)
        }
    }, [refreshFailed])

    useEffect(() => {
        if (success) {
            history.push('/user-list')
            dispatch({type: UPDATE_USER_RESET})
        }
    }, [success, history, dispatch])

    return (
        <Fragment>
            <Header/>
            <button onClick={goBack}>Go Back</button>
            <h2>Edit User</h2>
            {userLoading ? <h2>Loading user information</h2>
                : userError ? <h2>An error has occurred whilst fetching user information</h2>
                    : updateUserLoading ? <h2>Updating user's information</h2>
                        : updateUserError ? <h2>An error has occurred whilst updating the user</h2>
                            : editUserLoading ? <h2>Loading the user to edit</h2>
                                : editUserError ? <h2>An error has occurred whilst fetching the user to edit</h2>
                                    :
                                    <div>
                                        <form>
                                            <div>
                                                <label htmlFor="firstName">First Name:</label>
                                                <input type="text" id="firstName" name="firstName" value={firstName}
                                                       onChange={(e) => setFirstName(e.target.value)}/>
                                            </div>
                                            <div>
                                                <label htmlFor="lastName">Last Name:</label>
                                                <input type="text" id="lastName" name="lastName" value={lastName}
                                                       onChange={(e) => setLastName(e.target.value)}/>
                                            </div>
                                            <div>
                                                <label htmlFor="admin">Admin:</label>
                                                <input type="checkbox" id="admin" name="admin" checked={isAdmin}
                                                       onChange={(e) => setIsAdmin(e.target.checked)}/>
                                            </div>
                                            <div>
                                                <button onClick={e => submitUser(e)}>
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </div>
            }
        </Fragment>
    )
}

export default EditUser

