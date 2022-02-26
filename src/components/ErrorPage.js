import Header from "./Header";
import {Button, Divider, Grid} from "@mui/material";
import {ArrowBackIosNew} from "@mui/icons-material";

const ErrorPage = ({history}) => {

    const goBack = () => {
        history.push("/")
    }

    return (
        <Grid container sx={{
            alignItems: 'flex-start',
        }}>
            <Grid container sx={{height: '25vh'}}>
                <Header history={history}/>
            </Grid>
            <Divider variant="middle"/>
            <Grid container sx={{display: 'flex', justifyContent: 'center'}}>
                    <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', marginY: '30px'}}>
                        <span style={{fontSize: '40px', letterSpacing: '1px', width: '100%', textAlign: 'center',fontWeight: 'medium'}}>Sorry, we couldn't find the page you're looking for!</span>
                    </Grid>
                    <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                        <Button variant='outlined' size="large" startIcon={<ArrowBackIosNew/>}
                                onClick={(e) => goBack(e)} sx={{textTransform: 'none'}} color="primary"
                        >
                            Go Back
                        </Button>
                    </Grid>
            </Grid>
        </Grid>
    )
}

export default ErrorPage
