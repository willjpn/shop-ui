import {Container,TextField} from "@mui/material";

const HomeSearch = ({query, setQuery}) => {
    return (
        <Container sx={{marginTop: 3}}>
            <TextField label="Search" variant="filled" value={query} size='large'
                       onChange={e => setQuery(e.target.value)} fullWidth/>
        </Container>
    )
}

export default HomeSearch
