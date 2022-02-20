import {Container, Grid, TextField} from "@mui/material";

const HomeSearch = ({query, setQuery, totalCount, products}) => {
    return (
        <Container sx={{marginTop: 3}}>
            <TextField label="Search" variant="filled" value={query} size='large'
                       onChange={e => setQuery(e.target.value)} fullWidth/>
            <Grid sx={styles.productCountInfo}>Displaying {products.length} of {totalCount} items</Grid>
        </Container>
    )
}

const styles = {
    productCountInfo: {
        justifyContent: 'center',
        textAlign: 'center',
        paddingY: 2,
        fontSize: '18',
        letterSpacing: '1px',
    }
}

export default HomeSearch
