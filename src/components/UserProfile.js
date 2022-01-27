import {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../actions/userActions";
import Header from "./Header";
import ResetPassword from "./ResetPassword";
import ShippingAddress from "./ShippingAddress";

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
                <div>
                    <h3>First Name: {userInfo.firstName}</h3>
                    <h3>Last Name: {userInfo.lastName}</h3>
                    <h3>Email: {userInfo.email}</h3>
                    <ResetPassword/>
                    <ShippingAddress shippingDetails={userInfo.shippingDetails}/>
                </div>
            }
        </Fragment>
    )
}

export default UserProfile
