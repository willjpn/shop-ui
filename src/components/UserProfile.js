import {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserOrders, getUser} from "../actions/userActions";
import Header from "./Header";
import ResetPassword from "./ResetPassword";
import ShippingAddress from "./ShippingAddress";
import {Grid, ToggleButton, ToggleButtonGroup, useMediaQuery, useTheme} from "@mui/material";

import EditUserDetails from "./EditUserDetails";
import UserOrders from "./UserOrders";

// TODO- change app title in chrome tab - Currently "React App"

const UserProfile = ({history}) => {

    const {refreshFailed} = useSelector(state => state.auth)
    const userDetails = useSelector(state => state.userDetails)
    const {loading: userOrdersLoading, error: userOrdersError, orders} = useSelector(state => state.userOrders)

    const {loading, error, userInfo} = userDetails

    const dispatch = useDispatch()

    useEffect(() => {
        // check if user has access
        dispatch(getUser())
    }, [dispatch])

    useEffect(() => {
        if (userInfo._id) {
            // once we have userInfo, fetch user's orders
            dispatch(fetchUserOrders())
        }
    }, [userInfo])

    useEffect(() => {
        if (refreshFailed) {
            history.push("/login?redirect=user-profile")
        }
    }, [refreshFailed])

    const [alignment, setAlignment] = useState('user');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    // TODO - fix scrolling for user profile. currently if there are a lot of orders, the left flex box also scrolls. We want
    // the left flexbox to remain fixed when the user scrolls.

    return (
        <Grid container sx={{
            alignItems: 'flex-start',
        }}>
            <Grid item xs={12} >
                <Grid container sx={{height: '20vh',borderBottom: 1, borderWidth: 'thick', borderColor: 'lightgrey'}}>
                    <Header history={history}/>
                </Grid>
                <Grid sx={{height: '80vh'}} container>
                    {error ? <h2>Unable to load user information...</h2> : loading ?
                        <h2>Loading user information...</h2> :
                        userOrdersLoading ? <h2>Fetching your orders</h2> : userOrdersError ? <h2>{error}</h2> :
                            <Fragment>
                                <Grid item xs={12} md={5} sx={{padding: 2}}>
                                    <span style={styles.subtitle}>User Profile</span>
                                    <Grid sx={{display: 'flex', justifyContent: 'center', marginBottom: 5}}>
                                        <ToggleButtonGroup
                                            // orientation={isLargeScreen ? 'horizontal' : 'vertical'}
                                            color="primary"
                                            value={alignment}
                                            exclusive
                                            onChange={handleChange}
                                            size="large"
                                        >
                                            <ToggleButton value="user">User</ToggleButton>
                                            <ToggleButton value="password">Password</ToggleButton>
                                            <ToggleButton value="shipping">Shipping</ToggleButton>
                                        </ToggleButtonGroup>
                                    </Grid>
                                    <Grid sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                                        {alignment === 'user' ? <EditUserDetails userInfo={userInfo}/>
                                            : alignment === 'password' ?
                                                <ResetPassword/>
                                                :
                                                <ShippingAddress shippingDetails={userInfo.shippingDetails}/>
                                        }
                                    </Grid>
                                </Grid>
                                {<Grid item sm={12} md={7} sx={{borderLeft: 1, borderColor: 'lightgrey',borderWidth: 'thick', padding: 2}}>
                                    <span style={styles.subtitle}>Orders</span>
                                    <Grid sx={{justifyContent: 'center', display: 'flex', flexWrap: 'wrap'}}>
                                        <UserOrders orders={orders} history={history}/>

                                    </Grid>
                                </Grid>}

                            </Fragment>
                    }
                </Grid>
            </Grid>

        </Grid>
    )
}

const styles = {
    subtitle: {
        height: '10vh',
        border: 1,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '30px',
        letterSpacing: '1px',
        width: '100%'
    }
}

export default UserProfile
