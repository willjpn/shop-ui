import {useEffect, Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser, getUsers} from "../actions/userActions";
import Header from "./Header";
import UserTable from "./UserTable";

const UserList = ({history}) => {

    const userDetails = useSelector(state => state.userDetails)
    const usersDetails = useSelector(state => state.users)
    const deleteUser = useSelector(state => state.deleteUser)

    const {loading: userLoading, error: userError, userInfo} = userDetails
    const {loading: usersLoading, error: usersError, users} = usersDetails
    const {loading: deleteUserLoading, error: deleteUserError} = deleteUser

    const dispatch = useDispatch()

    useEffect(() => {
        // check if user has admin rights
        dispatch(getUser())
    }, [dispatch])

    useEffect(() => {
        if (userInfo._id && !userInfo.isAdmin) {
            history.push("/")
        } else {
            dispatch(getUsers())
        }
    }, [userInfo])

    const addUser = () => {
        history.push("/user/new")
    }

    return (
        <Fragment>
            <Header/>
            <h2>User List</h2>
            {userError ? <h2>Unable to load user</h2>
                : userLoading ? <h2>Loading user information</h2>
                    : usersError ? <h2>Unable to load users</h2>
                        : usersLoading ? <h2>Loading users</h2> :
                            deleteUserLoading ? <h2>Deleting user...</h2>
                                : deleteUserError ? <h2>An error occurred whilst deleting user</h2>
                            :
                            <div>
                                <button onClick={() => addUser()}>
                                    CREATE USER
                                </button>
                                <UserTable users={users} dispatch={dispatch} history={history}/>
                            </div>
            }
        </Fragment>

    )
}

export default UserList
