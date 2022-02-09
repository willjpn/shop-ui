import Header from "./Header";
import {Fragment, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Products from "./Products";
import Basket from "./Basket";
import {queryProducts} from "../actions/productActions";
import {Button, Container, Grid} from "@mui/material";

const Home = () => {

    // TODO - add page button at bottom of page to find products

    // TODO - add carousel to see products on home page

    const dispatch = useDispatch()

    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(1)

    const queryProductsState = useSelector(state => state.queryProducts)
    const {loading, error, products, count} = queryProductsState

    useEffect(() => {
        dispatch(queryProducts(query))
    }, [dispatch, query])

    return (

        <Grid container sx={{
            alignItems: 'flex-start'
        }}>
            <Grid xs={10}>
                <Grid>
                    <Grid container
                          sx={{height: '10vh', backgroundColor: 'lightsteelblue'}}>
                        <Grid item xs={4} sx={{border: 1, borderWidth: 'thin'}}>EMPTY</Grid>
                        <Grid item xs={4} sx={{
                            border: 1,
                            borderWidth: 'thin',
                            justifyContent: 'center',
                            display: 'flex',
                            alignItems: 'center'
                        }}>LOGO</Grid>
                        <Grid item xs={4} sx={{
                            border: 1,
                            borderWidth: 'thin',
                            justifyContent: 'center',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Button>Admin</Button>
                            <Button>Account</Button>
                            <Button>Logout</Button>
                        </Grid>
                    </Grid>
                    <Grid sx={{border: 1, borderWidth: 'thin', height: '25vh', backgroundColor: 'lightblue'}}>
                        Search
                    </Grid>
                    <Grid sx={{border: 1, borderWidth: 'thin', height: '65vh', backgroundColor: 'lightpink'}}>
                        Body
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={2} sx={{border: 1, borderWidth: 'thin', height: '100vh', backgroundColor: 'lightgreen'}}>
                Basket
            </Grid>
        </Grid>

        // {/*<Header/>*/}
        // {/*<Basket/>*/}
        // {/*<h2>Home Page</h2>*/}
        // {/*<input placeholder="Search" value={query} onChange={e => setQuery(e.target.value)}/>*/}
        // {/*{loading ? <h2>Loading products...</h2> : error ? <h2>An error has occurred: {error}</h2> :*/}
        // {/*    <Products products={products} count={count}/>*/}
        // {/*}*/}
    )
}

export default Home
