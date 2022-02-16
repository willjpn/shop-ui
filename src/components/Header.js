import {Grid} from "@mui/material";
import logo from "../assets/logo.png";
import {Fragment, useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/userActions";

const Header = ({history}) => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const {userInfo} = user


    const signOut = () => {
        dispatch(logout())
    }

    // TODO - have to click on the account text to go to account instead of clicking on the box padding currently

    return (
        <Fragment>
            <Grid item xs={4} sx={{}}/>
            <Grid item xs={4} sx={{
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
            }}>
                <Link to="/">
                    <img src={logo} style={{
                        objectFit: 'contain',
                        width: '100%'
                    }} alt="logo"/>
                </Link>

            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{
                display: 'flex',
                alignItems: 'center',
                // border: 1, borderWidth: 'thin',
                justifyContent: 'space-evenly'

            }}>

                <Fragment>
                    {userInfo._id ?
                        <Fragment>
                            {userInfo.isAdmin &&
                            <Grid item xs={2} sx={{
                                // border: 1, borderWidth: 'thin',
                                height: '60px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '10px',
                                paddingX: '60px',

                                ":hover": {
                                    backgroundColor: 'rgba(0, 150, 225, 0.125)',
                                    cursor: 'pointer',
                                }

                            }}>
                                <Link style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                    textTransform: 'capitalize',
                                    letterSpacing: '1px',
                                    fontSize: '18px',

                                }} to="/product-list">Admin</Link>
                            </Grid>
                            }
                            <Grid item xs={2} sx={{
                                height: '60px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '10px',
                                paddingX: '60px',

                                ":hover": {
                                    backgroundColor: 'rgba(0, 150, 225, 0.125)',
                                    cursor: 'pointer',
                                }
                            }}>
                                <Link style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                    textTransform: 'capitalize',
                                    letterSpacing: '1px',
                                    fontSize: '18px',
                                }} to="/user-profile">Account</Link>
                            </Grid>
                            <Grid item xs={2} onClick={signOut} sx={{
                                height: '60px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '10px',
                                paddingX: '60px',

                                ":hover": {
                                    backgroundColor: 'rgba(0, 150, 225, 0.125)',
                                    cursor: 'pointer',
                                }
                            }}>
                                <Link style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                    textTransform: 'capitalize',
                                    letterSpacing: '1px',
                                    fontSize: '18px'
                                }} to="/">Logout</Link>
                            </Grid>

                        </Fragment>
                        :
                        <Fragment>
                            <Grid item xs={3}/>
                            <Grid item xs={3}/>
                            <Grid item xs={3} sx={{
                                height: '60px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '10px',
                                paddingX: '60px',

                                ":hover": {
                                    backgroundColor: 'rgba(0, 150, 225, 0.125)',
                                    cursor: 'pointer',
                                }
                            }}>
                                <Link style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                    textTransform: 'capitalize',
                                    letterSpacing: '1px',
                                    fontSize: '18px'
                                }} to="/login">Login</Link>
                            </Grid>
                        </Fragment>

                    }

                </Fragment>
            </Grid>
        </Fragment>
    )
}

export default Header
