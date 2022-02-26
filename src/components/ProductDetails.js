import {useEffect, useState, Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProduct} from "../actions/productActions";
import Header from "./Header";
import {addToBasket} from "../actions/basketActions";
import {Box, Button, Container, Divider, Grid, MenuItem, Select, useMediaQuery, useTheme} from "@mui/material";
import HomeBasket from "./HomeBasket";
import {ArrowBackIosNew, ShoppingBasket} from "@mui/icons-material";

const ProductDetails = ({match, history}) => {

    // TODO - stop errors from showing in console when in production

    const dispatch = useDispatch()

    const [quantity, setQuantity] = useState(1)
    const productDetails = useSelector(state => state.product)
    const {loading, error, product} = productDetails

    const basketState = useSelector(state => state.basket)
    const {basket} = basketState

    useEffect(() => {
        dispatch(fetchProduct(match.params.id))
    }, [dispatch, match])

    const basketHandler = () => {
        const item = {
            quantity: quantity,
            product: {
                name: product.name,
                _id: product._id,
                price: product.price,
                image: product.image
            }
        }
        dispatch(addToBasket(item))
    }

    const goBack = () => {
        history.push("/")
    }


    const theme = useTheme();
    const showBasket = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <Grid container sx={{
            alignItems: 'flex-start',
        }}>

            <Grid xs={12} lg={9} sx={{overflowY: 'auto'}}>

                <Grid container sx={{height: '25vh'}}>
                    <Header history={history}/>
                    <Container sx={{display: 'flex', alignItems: 'center', marginX: '25px', paddingY: '20px'}}>
                        <Button variant='text' size="large" startIcon={<ArrowBackIosNew/>}
                                onClick={() => goBack()} sx={{textTransform: 'none'}} color="success"
                        >
                            Go Back
                        </Button>
                    </Container>
                </Grid>
                <Divider variant="middle"/>
                {loading ? <span>Fetching product information</span> : error ? <span>{error}</span> :

                    <Fragment>
                        <Grid container sx={{height: '40vh', display: 'flex', paddingTop: '40px'}}>


                            {/*IMAGE*/}
                            <Grid item xs={3}>
                                <Grid container sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                                    <Box>
                                        <img src={product.image} alt={product.name}
                                             style={{width: '100%', objectFit: 'contain'}}/>
                                    </Box>
                                </Grid>
                            </Grid>
                            {/*IMAGE*/}

                            {/*COLUMN 2*/}
                            <Grid item xs={5}
                                // sx={{border: 1}}
                            >
                                <Container>
                                    {/*<div style={{textAlign: 'center'}}>Column 2</div>*/}
                                    <Box>
                                        <Box sx={{
                                            fontSize: '26px',
                                            letterSpacing: '1px',
                                            marginBottom: '15px'
                                        }}>{product.name}</Box>
                                        <Box sx={{
                                            fontSize: '18px',
                                            letterSpacing: '1px',
                                            marginBottom: '15px'
                                        }}>This product currently has no reviews.</Box>
                                        <Box sx={{
                                            fontSize: '18px',
                                            letterSpacing: '1px',
                                        }}>{product.description ? product.description : "This product doesn't have a description."}</Box>
                                    </Box>
                                </Container>
                            </Grid>
                            {/*COLUMN 2*/}

                            {/*COLUMN 3*/}
                            <Grid item sx={{
                                width: '80%',
                                // border: 1
                            }} xs={3}>
                                <Container>
                                    <Grid container sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                                        {/*<div style={{width: '100%', textAlign: 'center', marginBottom: '20px'}}>Column 2</div>*/}
                                        <Box sx={{
                                            border: 1,
                                            borderColor: 'lightgrey',
                                            display: 'flex',
                                            flexWrap: 'wrap'
                                        }}>
                                            <Box sx={{
                                                borderBottom: 1,
                                                borderColor: "lightgrey",
                                                width: '100%',
                                                height: '40px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '20px',
                                                letterSpacing: '1px',
                                            }}>£{product.price}</Box>
                                            <Grid sx={{
                                                borderBottom: 1,
                                                width: '100%',
                                                height: '40px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: product.stockCount === 0 ? "red" : "green",
                                                fontSize: '18px',
                                                letterSpacing: '1px',
                                                borderColor: 'lightgrey'
                                            }}>{product.stockCount !== 0 ? "In stock" : "Out of stock"}</Grid>
                                            <Grid sx={{borderBottom: 1, borderColor: 'lightgrey', height: '75px'}}
                                                  container>
                                                <Grid sx={{
                                                    borderRight: 1,
                                                    alignItems: 'center',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    borderColor: 'lightgrey'
                                                }} item xs={6}><span>Quantity</span></Grid>
                                                <Grid item xs={6}
                                                      sx={{
                                                          display: 'flex',
                                                          justifyContent: 'center',
                                                          alignItems: 'center'
                                                      }}>
                                                    <Select
                                                        value={quantity}
                                                        label="Quantity"
                                                        disabled={product.stockCount === 0}
                                                        onChange={(e) => setQuantity(e.target.value)}
                                                    >
                                                        <MenuItem value={1}>1</MenuItem>
                                                        <MenuItem value={2}>2</MenuItem>
                                                        <MenuItem value={3}>3</MenuItem>
                                                        <MenuItem value={4}>4</MenuItem>
                                                        <MenuItem value={5}>5</MenuItem>
                                                    </Select>
                                                </Grid>

                                            </Grid>
                                            <Grid sx={{
                                                width: '100%',
                                                height: '70px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginTop: '5px'
                                            }}>
                                                <Button variant='outlined' color="error" size="large"
                                                        disabled={product.stockCount === 0}
                                                        startIcon={<ShoppingBasket/>}
                                                        onClick={() => basketHandler(product)}
                                                >
                                                    Add To Basket
                                                </Button>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Container>

                            </Grid>
                            {/*COLUMN 3*/}

                            {/*COLUMN 4*/}
                            <Grid xs={1}/>
                            {/*COLUMN 4*/}

                        </Grid>
                        <Divider variant="middle"/>

                        <Grid sx={{height: '35vh'}} container>
                            {/*REVIEWS*/}
                            <Grid container sx={{
                                display: 'flex',
                                flex: '1 1 auto',
                                justifyContent: 'center',
                                position: 'relative',
                                paddingTop: '15px',
                            }}>
                                <Container>
                                    <Grid item xs={12} sx={{paddingX: '20px'}}>
                                        <div style={{fontSize: '30px', letterSpacing: '1px', marginBottom: '20px'}}>
                                            Product Reviews
                                        </div>
                                        <div style={{
                                            fontSize: '20px',
                                            color: 'grey',
                                            fontWeight: 'thinner',
                                            letterSpacing: '1px',
                                            marginBottom: '20px',
                                        }}>
                                            There are currently no reviews for this product.
                                        </div>
                                    </Grid>
                                </Container>
                            </Grid>
                            {/*REVIEWS*/}
                        </Grid>

                    </Fragment>
                }

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


export default ProductDetails
