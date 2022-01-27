import React, {Fragment, useEffect, useState} from "react";
import {getUser} from "../actions/userActions";
import {editProduct, fetchProduct} from "../actions/productActions";
import {useDispatch, useSelector} from "react-redux";
import Header from "./Header";
import {EDIT_PRODUCT_RESET} from "../constants/productConstants";

const EditProduct = ({match, history}) => {

    const id = match.params.id

    const userDetails = useSelector(state => state.userDetails)
    const productDetails = useSelector(state => state.product)
    const editProductDetails = useSelector(state => state.editProduct)

    const {loading: userLoading, error: userError, userInfo} = userDetails
    const {loading: productLoading, error: productError, product} = productDetails
    const {loading: editProductLoading, error: editProductError, success} = editProductDetails

    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")

    // first thing to do is check for admin access

    useEffect(() => {
        // check if user has admin rights
        dispatch(getUser())
    }, [dispatch])

    useEffect(() => {
        if (userInfo._id && !userInfo.isAdmin) {
            history.push("/")
        } else {
            dispatch(fetchProduct(id))
        }
    }, [userInfo, dispatch, history, id])

    useEffect(() => {
        if (product.name) {
            setName(product.name)
            setPrice(product.price)
        }
    }, [product])

    const goBack = () => {
        history.push("/product-list")
    }

    const submitProduct = async () => {
        const payload = {name, price}
        dispatch(editProduct(id, payload))
    }

    useEffect(() => {
        if (success) {
            history.push('/product-list')
            dispatch({type: EDIT_PRODUCT_RESET})
        }
    }, [success, history, dispatch])

    return (
        <Fragment>
            <Header/>
            <button onClick={goBack}>Go Back</button>
            <h2>Edit Product</h2>
            {userLoading ? <h2>Loading user information</h2>
                : userError ? <h2>An error has occurred whilst fetching user information</h2>
                    : productLoading ? <h2>Loading products</h2>
                        : productError ? <h2>An error has occurred whilst fetching products</h2>
                            : editProductLoading ? <h2>Saving changes to product...</h2>
                                : editProductError ? <h2>An error occurred whilst updating the product</h2>
                                    : <div>
                                        <form>
                                            <div>
                                                <label htmlFor="name">Name:</label>
                                                <input type="text" id="name" name="name" value={name}
                                                       onChange={(e) => setName(e.target.value)}/>
                                            </div>
                                            <div>
                                                <label htmlFor="price">Price:</label>
                                                <input type="number" id="price" name="price" value={price}
                                                       onChange={(e) => setPrice(e.target.value)}/>
                                            </div>
                                            <div>
                                                <button onClick={submitProduct}>
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </div>

            }
        </Fragment>
    )
}

export default EditProduct

