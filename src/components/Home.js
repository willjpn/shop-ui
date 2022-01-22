import Header from "./Header";
import {Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../actions/productActions";
import {useEffect} from "react";

const Home = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const {loading, products, error} = useSelector(state => state.products)

    return (
        <Fragment>
            <Header />
            <h2>Home Page</h2>
            {loading ? <h2>Loading products...</h2> : error ? <h2>An error has occurred: {error}</h2> :
                products.map(product => {
                    return (
                        <div key={product._id} >
                            {product._id}: {product.name}
                        </div>
                    )
                })
            }
        </Fragment>
    )
}

export default Home
