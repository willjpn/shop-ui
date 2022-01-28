import Header from "./Header";
import {Fragment, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Products from "./Products";
import Basket from "./Basket";
import {queryProducts} from "../actions/productActions";

const Home = () => {

    const dispatch = useDispatch()

    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(1)

    const queryProductsState = useSelector(state => state.queryProducts)
    const {loading, error, products, count} = queryProductsState

    useEffect(() => {
        dispatch(queryProducts(query))
    }, [dispatch, query])

    return (
        <Fragment>
            <Header/>
            <Basket/>
            <h2>Home Page</h2>
            <input placeholder="Search" value={query} onChange={e => setQuery(e.target.value)}/>
            {loading ? <h2>Loading products...</h2> : error ? <h2>An error has occurred: {error}</h2> :
                <Products products={products} count={count}/>
            }
        </Fragment>
    )
}

export default Home
