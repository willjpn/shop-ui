import React, {Fragment, useEffect, useState} from "react";
import {getUser} from "../actions/userActions";
import {useDispatch, useSelector} from "react-redux";
import Header from "./Header";
import {ADD_PRODUCT_RESET} from "../constants/productConstants";
import {addProduct} from "../actions/productActions";

const NewProduct = ({history}) => {


    const userDetails = useSelector(state => state.userDetails)
    const addNewProduct = useSelector(state => state.addProduct)

    const {loading: userLoading, error: userError, userInfo} = userDetails
    const {loading: addProductLoading, error: addProductError, success} = addNewProduct

    const dispatch = useDispatch()

    const [payload, setPayload] = useState({
        name: null,
        price: null,
        image: null,
        stockCount: 0,
        productCode: null,
        description: null
    })

    const [file, setFile] = useState()



    const editPayload = (e) => {
        setPayload(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const {refreshFailed} = useSelector(state => state.auth)

    useEffect(() => {
        if (refreshFailed) {
            history.push(`/login?redirect=product/new`)
        }
    }, [refreshFailed])

    // first thing to do is check for admin access

    useEffect(() => {
        // check if user has admin rights
        dispatch(getUser())
    }, [dispatch])

    useEffect(() => {
        if (userInfo._id && !userInfo.isAdmin) {
            history.push("/")
        }
    }, [userInfo, history])

    useEffect(() => {
        if (success) {
            history.push("/product-list")
            dispatch({type: ADD_PRODUCT_RESET})
        }
    }, [success, history, dispatch])

    const submitProduct = (e) => {
        e.preventDefault()
        dispatch(addProduct({name: payload.name, price: payload.price, productCode: payload.productCode, stockCount: payload.stockCount, description: payload.description, file}))
        history.push("/product-list")
    }

    const goBack = () => {
        history.push("/product-list")
    }

    return (
        <Fragment>
            <Header/>
            <button onClick={goBack}>Go Back</button>
            <h2>Create A New Product</h2>
            {userLoading ? <h2>Loading user information</h2>
                : userError ? <h2>An error has occurred whilst fetching user information</h2>
                    : addProductLoading ? <h2>Creating new product</h2>
                        : addProductError ? <h2>An error has occurred whilst creating this product</h2>
                            : <div>
                                <form>
                                    <div>
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" id="name" name="name"
                                               onChange={(e) => editPayload(e)}/>
                                    </div>
                                    <div>
                                        <label htmlFor="price">Price:</label>
                                        <input type="number" id="price" name="price"
                                               onChange={(e) => editPayload(e)}/>
                                    </div>
                                    <div>
                                        <label htmlFor="productCode">Product Code:</label>
                                        <input type="text" id="productCode" name="productCode"
                                               onChange={(e) => editPayload(e)}/>
                                    </div>
                                    <div>
                                        <label htmlFor="stockCount">Stock Count:</label>
                                        <input type="number" id="stockCount" name="stockCount"
                                               onChange={(e) => editPayload(e)}/>
                                    </div>
                                    <div>
                                        <label htmlFor="description">Description:</label>
                                        <input type="text" id="description" name="description"
                                               onChange={(e) => editPayload(e)}/>
                                    </div>
                                    <div>
                                        <label htmlFor="image">Image:</label>
                                        <input type="file" id="image" name="image"
                                               onChange={(e) => setFile(e.target.files[0])}/>
                                    </div>

                                    <div>
                                        <button onClick={(e) => submitProduct(e)}>
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>

            }
        </Fragment>
    )
}

export default NewProduct
