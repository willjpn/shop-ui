import {Grid} from "@mui/material";

const ExampleScrolling = () => {
    return (
        <Grid container sx={{
            alignItems: 'flex-start',
        }}>
            <Grid item sx={{backgroundColor: 'red', height: '100vh', overflowY: 'auto'}} xs={6}>
                <Grid sx={{position: 'relative'}}>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                    <div>Test</div>
                </Grid>
            </Grid>
            <Grid item sx={{backgroundColor: 'blue', height: '100vh'}} xs={6}>Grid 2</Grid>
        </Grid>
    )
}

export default ExampleScrolling
