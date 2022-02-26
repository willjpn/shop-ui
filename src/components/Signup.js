import Header from "./Header"
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createNewUser} from "../actions/userActions";
import {Button, Container, Divider, Grid, TextField} from "@mui/material";
import {ArrowBackIosNew, Save} from "@mui/icons-material";
// import LoadingButton from '@mui/lab/LoadingButton';


const Signup = ({history}) => {

    const signup = useSelector(state => state.signup)
    const {loading, error, success} = signup

    const dispatch = useDispatch()

    const [payload, setPayload] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const editPayload = (e) => {
        setPayload(prevPayload => {
            return {
                ...prevPayload,
                [e.target.name]: e.target.value
            }
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createNewUser(payload))
    }

    const goBack = () => {
        history.push("/")
    }

    useEffect(() => {
        if (success) {
            history.push('/')
        }
    }, [success])


    return (
        <Grid container sx={{
            alignItems: 'flex-start',
        }}>

            <Grid xs={12} sx={{overflowY: 'auto'}}>

                <Grid container sx={{height: '25vh'}}>
                    <Header history={history}/>
                </Grid>
                <Divider variant="middle"/>

                <Grid container sx={{height: '75vh', paddingTop: '25px'}}>
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
                            height: '80%'
                        }}>
                            <span style={{...styles.subtitle, marginTop: '30px'}}>Create Account</span>

                            <TextField type="text" label="First Name"
                                       sx={{width: '90%', marginBottom: '10px', marginTop: '30px'}}
                                       required
                                       name="firstName"
                                       value={payload.firstName}
                                       onChange={(e) => editPayload(e)}/>
                            <TextField type="text" label="Last Name" sx={{width: '90%', marginY: '10px'}}
                                       name="lastName"
                                       required
                                       value={payload.lastName}
                                       onChange={(e) => editPayload(e)}/>
                            <TextField type="text" label="Email" sx={{width: '90%', marginY: '10px'}} name="email"
                                       value={payload.email}
                                       required
                                       onChange={(e) => editPayload(e)}/>
                            <TextField type="password" label="Password" sx={{width: '90%', marginY: '10px'}}
                                       name="password"
                                       value={payload.password}
                                       required
                                       onChange={(e) => editPayload(e)}/>
                            <Grid sx={{...styles.checkoutButtonGrid}}>
                                {/*<LoadingButton variant='outlined' color="success" size="large"*/}
                                {/*               sx={styles.checkoutButton}*/}
                                {/*               startIcon={<Save/>} onClick={(e) => submitHandler(e)}*/}
                                {/*               loading={loading}*/}
                                {/*               disabled={!payload.firstName || !payload.lastName || !payload.email || !payload.password}*/}
                                {/*>*/}
                                {/*    Signup*/}
                                {/*</LoadingButton>*/}
                                <Button variant='outlined' color="success" size="large"
                                               sx={styles.checkoutButton}
                                               startIcon={<Save/>} onClick={(e) => submitHandler(e)}
                                               disabled={!payload.firstName || !payload.lastName || !payload.email || !payload.password}
                                >
                                    Signup
                                </Button>
                                <Button variant="text" color="primary" sx={{
                                    marginTop: '20px', marginBottom: '30px',textDecoration: 'none',
                                    color: 'black',
                                    textTransform: 'none',
                                    letterSpacing: '1px',
                                    fontSize: '18px'
                                }} onClick={() => history.push('/login')}>Already have an account?</Button>
                            </Grid>
                        </Container>
                        {error && <span style={{
                            fontSize: '20px',
                            color: 'red',
                            letterSpacing: '1px',
                            marginTop: 10,
                            textAlign: 'center'
                        }}>{error}</span>}
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
        fontSize: '24px',
        fontWeight: 'thin',
        textAlign: 'center',
    },
    checkoutButton: {marginTop: '10px'},
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

export default Signup
