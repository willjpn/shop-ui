import {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../actions/userActions";
import {fetchProducts} from "../actions/productActions";
import Header from "./Header";
import ProductTable from "./ProductTable";

const ProductList = ({history}) => {

    const userDetails = useSelector(state => state.userDetails)
    const productsList = useSelector(state => state.products)
    const deleteProduct = useSelector(state => state.deleteProduct)

    const {loading: userLoading, error: userError, userInfo} = userDetails
    const {loading: productsLoading, error: productsError, products} = productsList
    const {loading: deleteProductLoading, error: deleteProductError} = deleteProduct

    const dispatch = useDispatch()

    useEffect(() => {
        // check if user has admin rights
        dispatch(getUser())
    }, [dispatch])

    useEffect(() => {
        if (userInfo._id && !userInfo.isAdmin) {
            history.push("/")
        } else {
            dispatch(fetchProducts())
        }
    }, [userInfo, dispatch, history])

    const addProduct = () => {
        history.push("/product/new")
    }

    const {refreshFailed} = useSelector(state => state.auth)

    useEffect(() => {
        if (refreshFailed) {
            history.push(`/login?redirect=product-list`)
        }
    }, [refreshFailed])
    return (
        <Fragment>
            <Header history={history}/>
            <h2>Product List</h2>
            {userLoading ? <h2>Loading user information</h2>
                : userError ? <h2>An error has occurred whilst fetching user information</h2>
                    : productsLoading ? <h2>Loading products</h2>
                        : productsError ? <h2>An error has occurred whilst fetching products</h2>
                            : deleteProductLoading ? <h2>Deleting product...</h2>
                                : deleteProductError ? <h2>An error occurred whilst deleting the product</h2>
                                    : <div>
                                        <button onClick={() => addProduct()}>
                                            CREATE PRODUCT
                                        </button>
                                        <ProductTable products={products} dispatch={dispatch} history={history}/>
                                    </div>

            }
        </Fragment>
    )
}

export default ProductList
