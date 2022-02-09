import {Fragment} from 'react'
import {Box, Button, Container, Grid, IconButton, Typography} from "@mui/material";
import {Settings} from "@mui/icons-material";


const Header = () => {
    return (
        <Container>
            <Grid container sx={{}}>
                <Grid item xs={12} md={4} sx={{border: 1, borderWidth: 'thin'}}>

                </Grid>
                <Grid item xs={12} md={4} sx={{
                    border: 1,
                    borderWidth: 'thin',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography>Webshop</Typography>
                </Grid>
                <Grid item xs={12} md={4} sx={{
                    border: 1, borderWidth: 'thin', display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Button sx={{mx: 2, padding: 2}}>Admin</Button>
                    <Button sx={{mx: 2, padding: 2}}>Account</Button>
                    <Button sx={{mx: 2, padding: 2}}>Logout</Button>
                </Grid>
            </Grid>

        </Container>


    )
}

export default Header


// import {Fragment} from "react";
// import {Link} from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux";
// import {logout} from "../actions/userActions";
// import {Box, AppBar, Toolbar, IconButton, Typography, Button} from "@mui/material";
//
// const Header = () => {
//     const user = useSelector(state => state.user)
//     const {userInfo} = user
//
//     const dispatch = useDispatch()
//
//     const signOut = () => {
//         dispatch(logout())
//     }
//
//
//
//     return (
//         <Box sx={{flexGrow: 1}}>
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton
//                         size="large"
//                         edge="start"
//                         color="inherit"
//                         aria-label="menu"
//                         sx={{mr: 2}}
//                     >
//                     </IconButton>
//                     <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
//                         <Link to="/">Webshop</Link>
//                     </Typography>
//                     {userInfo._id ?
//                         <Fragment>
//                             <Button color="inherit" onClick={signOut}>
//                                 <Link to="/">Logout</Link>
//                             </Button>
//                             <Button color="inherit">
//                                 <Link to='/user-profile'>
//                                     Profile
//                                 </Link>
//                             </Button>
//                             {userInfo.isAdmin &&
//                             <Fragment>
//                                 <Button color="inherit">
//                                     <Link to="/product-list">Webshop Products</Link>
//                                 </Button>
//                                 <Button color="inherit">
//                                     <Link to="/user-list">See Users</Link>
//                                 </Button>
//                                 <Button color="inherit">
//                                     <Link to="/order-list">See Orders</Link>
//                                 </Button>
//                             </Fragment>
//                             }
//                         </Fragment>
//                         : <Button color="inherit">
//                             <Link to="/login">Login</Link>
//                         </Button>
//                     }
//                     <Button color="inherit">
//                         <Link to="/basket">Basket</Link>
//                     </Button>
//                 </Toolbar>
//             </AppBar>
//         </Box>
//     );
// }
//
// export default Header
