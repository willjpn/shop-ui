import {useEffect, useState} from "react";
import {Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProduct} from "../actions/productActions";
import Header from "./Header";
import {addToBasket} from "../actions/basketActions";

const ProductDetails = ({match}) => {

    const dispatch = useDispatch()

    const [quantity, setQuantity] = useState(1)
    const productDetails = useSelector(state => state.product)
    const {loading, error, product} = productDetails

    useEffect(() => {
        dispatch(fetchProduct(match.params.id))
    }, [dispatch, match])

    const editQuantity = (e) => {
        setQuantity((e.target.value))
    }



    const basketHandler = () => {
        const item = {
            quantity: quantity,
            product: {
                name: product.name,
                _id: product._id,
                price: product.price
            }
        }
        dispatch(addToBasket(item))
    }

    return (
        <Fragment>
            <Header/>
            {loading ? <h2>Loading product details...</h2>
                : error ? <h2>An error has occurred</h2>
                    :
                    <Fragment>
                        <h2>{product.name}</h2>
                        <select value={quantity} onChange={e => editQuantity(e)} aria-label="quantity">
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                        </select>
                        <button onClick={basketHandler}>Add To Basket</button>
                    </Fragment>
            }

        </Fragment>
    )
}

export default ProductDetails
