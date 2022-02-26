import React, {useState} from "react";
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../actions/userActions";
import {useEffect} from "react";
import {Button, Container, Divider, Grid, TextField} from "@mui/material";
import {ArrowBackIosNew, Save} from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";

const Login = ({history, location}) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const {loading, userInfo, error} = user

    const redirect = location.search ? location.search.split("=")[1] : "/"

    useEffect(() => {
        if (userInfo._id) {
            history.push(redirect)
        }
    }, [userInfo, history])

    const submit = (e) => {
        e.preventDefault()
        dispatch(login(username, password))
    }

    const goBack = () => {
        history.push("/")
    }

    return (
        <Grid container sx={{
            alignItems: 'flex-start',
        }}>

            <Grid item xs={12} sx={{overflowY: 'auto'}}>

                <Grid container sx={{height: '25vh'}}>
                    <Header history={history}/>
                </Grid>
                <Divider variant="middle"/>

                <Grid container sx={{height: '60vh', paddingTop: '25px'}}>
                    <Grid item xs={3}>
                        <Container sx={{display: 'flex', alignItems: 'center'}} maxWidth="xl">
                            <Button variant='text' size="large" startIcon={<ArrowBackIosNew/>}
                                    onClick={(e) => goBack(e)} sx={{textTransform: 'none'}} color="success"
                            >
                                Go Back
                            </Button>
                        </Container>
                    </Grid>
                    <Grid item xs={6}>
                        <Container maxWidth="md" sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            border: 1,
                            borderWidth: 'medium',
                            borderColor: '#1f18a1',
                            height: '90%',
                            marginTop: '60px'
                        }}>
                            <span style={{...styles.subtitle, marginTop: '30px'}}>Sign In</span>

                            <TextField type="text" label="Email" sx={{width: '90%', marginY: '10px'}} name="email"
                                       value={username}
                                       required
                                       onChange={(e) => setUsername(e.target.value)}/>
                            <TextField type="password" label="Password" sx={{width: '90%', marginY: '10px'}}
                                       name="password"
                                       value={password}
                                       required
                                       onChange={(e) => setPassword(e.target.value)}/>
                            <Grid sx={{...styles.checkoutButtonGrid}}>
                                <LoadingButton variant='outlined' color="success" size="large"
                                               sx={styles.checkoutButton}
                                               startIcon={<Save/>} onClick={(e) => submit(e)}
                                               loading={loading}
                                               disabled={!username || !password}
                                >
                                    Login
                                </LoadingButton>
                                <Button variant="text" color="primary" sx={{
                                    marginTop: '20px', marginBottom: '30px',textDecoration: 'none',
                                    color: 'black',
                                    textTransform: 'none',
                                    letterSpacing: '1px',
                                    fontSize: '18px'
                                }} onClick={() => history.push('/signup')}>Don't have an account?</Button>
                                {error && <span style={{
                                    fontSize: '20px',
                                    color: 'red',
                                    letterSpacing: '1px',

                                    textAlign: 'center'
                                }}>{error}</span>}
                            </Grid>
                        </Container>
                    </Grid>
                    <Grid item xs={3}/>
                </Grid>

            </Grid>
        </Grid>
    )
}

const styles = {
    checkoutButtonGrid: {
        display: 'flex', marginTop: 'auto', marginBottom: '20px',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        borderWidth: 'thick',
        borderColor: 'lightgrey',
    },
    checkoutButtonBox: {
        marginTop: '20px',
        fontSize: '24px',
        fontWeight: 'thin',
        textAlign: 'center',
    },
    checkoutButton: {marginTop: '20px'},
    subtitle: {
        border: 1,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '30px',
        letterSpacing: '1px',
        width: '90%',
        marginBottom: '15px'
    }
}

export default Login
