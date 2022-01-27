import {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../actions/userActions";
import Header from "./Header";

const UserProfile = () => {

    const userDetails = useSelector(state => state.userDetails)

    const {loading, error, userInfo} = userDetails


    const dispatch = useDispatch()

    useEffect(() => {
        // check if user has access
        dispatch(getUser())
    }, [dispatch])


    return (
        <Fragment>
            <Header />
            <h2>User Profile</h2>
            {error ? <h2>{error}</h2> : loading ? <h2>Loading user information...</h2> :
                <h2>{userInfo._id}</h2>
            }
        </Fragment>
    )
}

export default UserProfile
