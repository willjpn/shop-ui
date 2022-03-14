import {Box, Button, CircularProgress, Grid} from "@mui/material";
import {ShoppingBasket} from "@mui/icons-material";
import {addToBasket} from "../actions/basketActions";

const HomeProducts = ({products, query, showPrice, showImage, dispatch, history, loading}) => {

    const basketHandler = (e, product) => {
        e.stopPropagation()
        const item = {
            quantity: 1,
            product: {
                name: product.name,
                _id: product._id,
                price: product.price,
                image: product.image
            }
        }
        dispatch(addToBasket(item, true))
    }

    const seeProductDetails = (id) => {
        history.push(`/product/${id}`)
    }

    return (
        <Grid sx={styles.productsContainer}>
            <Grid sx={styles.productsHeader} container>
                {showImage && <Grid item md={2}/>}
                <Grid item xs={6} sm={6}
                      sx={{paddingX: '30px', fontSize: '20px', color: 'darkgrey'}}>Product</Grid>
                {showPrice && <Grid item md={2} sx={{fontSize: '20px', color: 'darkgrey'}}>Price</Grid>}
                <Grid item xs={6} md={2} sx={{}}/>
            </Grid>
            {loading ?
                <Grid container style={styles.productImageGrid}>
                    <Grid item sx={{display: 'flex', justifyContent: 'center'}}>
                        <CircularProgress sx={{marginY: '150px'}}/>
                    </Grid>
                </Grid>

                : !products.length && <span
                style={styles.noProducts}>{query ? "There are no products that match your query!" : "There are no products in the shop!"}</span>}
            {products.map((product) =>
                (
                    <Grid container key={product._id} item xs={12} sx={styles.productContainer} onClick={() => seeProductDetails(product._id)}>
                        {showImage && <Grid item md={2} sx={styles.productImageGrid}>
                            <img src={product.image} style={styles.productImage} alt={product.name}/>
                        </Grid>}
                        <Grid item xs={6} sm={6} sx={styles.productDetailsContainer}>
                            <Box sx={{fontWeight: '200'}}>{product.productCode}</Box>
                            <Box sx={{fontSize: '20px', marginY: '10px'}}>{product.name}</Box>
                            <Box sx={{
                                ...styles.productStockInfo,
                                backgroundColor: product.stockCount === 0 ? 'orangered' : 'seagreen'
                            }}>
                                {product.stockCount === 0 ? "Item Currently Not In Stock" : "In Stock"}</Box>
                        </Grid>
                        {showPrice && <Grid item md={2} sx={{
                            alignItems: 'center',
                            display: 'flex',
                            fontSize: '20px'
                        }}>£{product.price}</Grid>}
                        <Grid item xs={6} md={2} sx={{display: 'flex', alignItems: 'center'}}>
                            <Button variant='outlined' color="error" size="large"
                                    disabled={product.stockCount === 0} startIcon={<ShoppingBasket/>}
                                    onClick={(e) => basketHandler(e, product)}
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                )
            )}
        </Grid>
    )
}

const styles = {
    productsContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        position: 'relative'
    },
    productsHeader: {
        position: 'sticky',
        top: 0,
        backgroundColor: 'white',
        borderBottom: 1,
        borderWidth: 'thinner',
        borderColor: 'lightgrey',
        paddingBottom: 2,
        paddingTop: 4,
        zIndex: 1,
    },
    noProducts: {
        fontSize: '24px',
        color: 'darkgrey',
        marginTop: '30px',
        textAlign: 'center'
    },
    productContainer: {
        marginY: 1, paddingY: 1,
        ":hover": {
            backgroundColor: 'rgba(0, 150, 225, 0.125)',
            cursor: 'pointer',
            borderRadius: '15px'
        }
    },
    productImageGrid: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        paddingX: '20px',
    },
    productImage: {
        width: '100%',
        height: '150px',
        objectFit: 'contain',
    },
    productDetailsContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingX: '30px',
    },
    productStockInfo: {
        color: 'white',
        padding: '8px',
        borderRadius: '5px',
        width: 'fit-content'
    }
}

export default HomeProducts
