import {Button, Grid} from "@mui/material";
import logo from "../assets/logo.png";
import {Fragment} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/userActions";

const Header = ({history, showNavItems, isHomeHeader}) => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const {userInfo} = user


    const signOut = () => {
        dispatch(logout())
        history.push("/")
    }

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
            <Grid item xs={12} sm={12} md={4}>

                {(showNavItems || !isHomeHeader) &&
                <Fragment>

                    {userInfo._id ?

                        <Grid container sx={{display: 'flex', height: '100%'}}>

                            <Grid item xs={userInfo.isAdmin ? 4 : 2}
                                  sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                {userInfo.isAdmin &&
                                <Button size="large" onClick={() => history.push("/product-list")} sx={{
                                    textDecoration: 'none',
                                    color: 'black',
                                    textTransform: 'capitalize',
                                    letterSpacing: '1px',
                                    fontSize: '18px'
                                }}>
                                    Admin
                                </Button>}
                            </Grid>

                            <Grid item xs={4}
                                  sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Button size="large" onClick={() => history.push("/user-profile")} sx={{
                                    textDecoration: 'none',
                                    color: 'black',
                                    textTransform: 'capitalize',
                                    letterSpacing: '1px',
                                    fontSize: '18px'
                                }}>
                                    Account
                                </Button>
                            </Grid>
                            <Grid item xs={4}
                                  sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Button size="large" onClick={signOut} sx={{
                                    textDecoration: 'none',
                                    color: 'black',
                                    textTransform: 'capitalize',
                                    letterSpacing: '1px',
                                    fontSize: '18px'
                                }}>
                                    Logout
                                </Button>
                            </Grid>
                            {!userInfo.isAdmin && <Grid item xs={2} />}

                        </Grid> :
                        <Grid container sx={{display: 'flex', height: '100%'}}>
                            <Grid item xs={2}/>
                            <Grid item xs={4}
                                  sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Button size="large" onClick={() => {history.push("/login")}} sx={{
                                    textDecoration: 'none',
                                    color: 'black',
                                    textTransform: 'capitalize',
                                    letterSpacing: '1px',
                                    fontSize: '18px'
                                }}>
                                    Login
                                </Button>
                            </Grid>
                            <Grid item xs={4}
                                  sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Button size="large" onClick={() => history.push("/signup")} sx={{
                                    textDecoration: 'none',
                                    color: 'black',
                                    textTransform: 'capitalize',
                                    letterSpacing: '1px',
                                    fontSize: '18px'
                                }}>
                                    Register
                                </Button>
                            </Grid>
                            <Grid item xs={2}/>

                        </Grid>
                    }
                </Fragment>
                }
            </Grid>
        </Fragment>
    )
}

export default Header
