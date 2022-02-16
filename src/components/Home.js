import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {queryProducts} from "../actions/productActions";
import {Grid, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material";
import '../assets/Home.css'
import Header from "./Header";
import HomeSearch from "./HomeSearch";
import HomeProducts from "./HomeProducts";
import HomeBasket from "./HomeBasket";

const Home = ({history}) => {

    // TODO - pagination at bottom of page to find products

    const dispatch = useDispatch()

    const [query, setQuery] = useState('')

    const queryProductsState = useSelector(state => state.queryProducts)
    const {products, count, totalCount} = queryProductsState

    const basketState = useSelector(state => state.basket)
    const {basket} = basketState

    useEffect(() => {
        dispatch(queryProducts(query))
    }, [dispatch, query])

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
                    <Header/>
                </Grid>
                <Grid sx={{
                    height: '15vh', display: 'flex', justifyContent: 'center',
                }}>
                    <HomeSearch query={query} count={count} totalCount={totalCount} setQuery={setQuery}
                                dispatch={dispatch}/>
                </Grid>
                <Grid sx={{
                    height: '65vh',
                }}>
                    <HomeProducts products={products} query={query} showImage={showImage} showPrice={showPrice}
                                  dispatch={dispatch} history={history}/>
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

export default Home
