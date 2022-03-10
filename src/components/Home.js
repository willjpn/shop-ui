import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getProductsByPage, getProductsByQuery} from "../actions/productActions";
import {Grid, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material";
import '../assets/Home.css'
import Header from "./Header";
import HomeSearch from "./HomeSearch";
import HomeProducts from "./HomeProducts";
import HomeBasket from "./HomeBasket";
import {Pagination} from "@mui/material";
import {SET_QUERY} from "../constants/productConstants";

const Home = ({history}) => {

    const dispatch = useDispatch()

    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)

    const queryProductsState = useSelector(state => state.queryProducts)
    const {products, count, totalCount, loading} = queryProductsState

    const basketState = useSelector(state => state.basket)
    const {basket} = basketState

    // whenever query changes, set page to 1
    useEffect(() => {
        dispatch({type: SET_QUERY, payload: query})
        setPage(1)
        dispatch(getProductsByQuery(query))
    }, [query, dispatch])

    // whenever page changes, fetch by page number and the query string saved in redux
    useEffect(() => {
        dispatch(getProductsByPage(page))
    }, [page, dispatch])

    const theme = useTheme();
    const showBasket = useMediaQuery(theme.breakpoints.up('lg'));
    const showImage = useMediaQuery(theme.breakpoints.up('md'))
    const showPrice = useMediaQuery(theme.breakpoints.up('md'))

    return (
        <Grid container sx={{
            alignItems: 'flex-start',
        }}>
            <Grid item xs={12} lg={9} sx={{overflowY: 'auto'}}>
                <Grid container
                      sx={{
                          height: '20vh',
                      }}>
                    <Header history={history}/>
                </Grid>
                <Grid sx={{
                    height: '80vh'
                }}>
                    <HomeSearch products={products} query={query} totalCount={totalCount} setQuery={setQuery}
                                dispatch={dispatch}/>
                    <Grid sx={styles.productCountInfo}>Displaying {products.length} of {totalCount} items</Grid>
                    <HomeProducts products={products} query={query} showImage={showImage} showPrice={showPrice}
                                  dispatch={dispatch} history={history} loading={loading}/>
                    <Grid sx={{paddingY: '20px', display: 'flex', justifyContent: 'center'}}>

                        <Pagination count={count ? Math.ceil(count / 10) : 1} color="primary" size="large"
                                    defaultPage={1}
                                    page={page}
                                    onChange={(e, p) => setPage(p)}/>
                    </Grid>
                </Grid>
            </Grid>
            {showBasket && <Grid item lg={3}
                                 sx={{
                                     borderLeft: 1, borderWidth: 'thick',
                                     borderColor: 'lightgrey',
                                     height: '100vh',
                                     display: 'flex',
                                     flexDirection: 'column'
                                 }}>
                <HomeBasket basket={basket} history={history} dispatch={dispatch}/>
            </Grid>}
        </Grid>
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

export default Home
