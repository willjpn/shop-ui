import {
    ADD_PRODUCT,
    ADD_PRODUCT_FAILURE,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAILURE,
    EDIT_PRODUCT_REQUEST,
    EDIT_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILURE,
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS, QUERY_PRODUCTS_FAILURE, QUERY_PRODUCTS_REQUEST, QUERY_PRODUCTS_SUCCESS, REMOVE_PRODUCT,
    REMOVE_PRODUCT_FAILURE,
    REMOVE_PRODUCT_REQUEST,
    REMOVE_PRODUCT_SUCCESS
} from "../constants/productConstants";
import axios from "axios";
import {ErrorMessage} from "../utils/errorHandler";

export const fetchProducts = () => async (dispatch) => {
    try {
        dispatch({type: FETCH_PRODUCTS_REQUEST})

        const response = await axios.get("http://localhost:8000/product")

        dispatch({type: FETCH_PRODUCTS_SUCCESS, payload: response.data})

    } catch (err) {
        const errorMessage = new ErrorMessage(err)
        dispatch({type: FETCH_PRODUCTS_FAILURE, payload: errorMessage})
    }
}

export const queryProducts = (query, pageNumber) => async (dispatch) => {
    try {
        dispatch({type: QUERY_PRODUCTS_REQUEST})

        const response = await axios.post("http://localhost:8000/product/query", {query: query, pageNumber: pageNumber})

        dispatch({type: QUERY_PRODUCTS_SUCCESS, payload: response.data})

    } catch (err) {
        dispatch({type: QUERY_PRODUCTS_FAILURE, payload: new ErrorMessage(err)})
    }
}

export const fetchProduct = (id) => async (dispatch) => {
    try {
        dispatch({type: FETCH_PRODUCT_REQUEST})
        const response = await axios.get(`http://localhost:8000/product/${id}`)
        dispatch({
            type: FETCH_PRODUCT_SUCCESS,
            payload: response.data
        })
    } catch (err) {
        const errorMessage = new ErrorMessage(err)
        dispatch({type: FETCH_PRODUCT_FAILURE, payload: errorMessage})
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({type: REMOVE_PRODUCT_REQUEST})
        await axios.delete(`http://localhost:8000/product/${id}`)
        dispatch({type: REMOVE_PRODUCT, payload: id})
        dispatch({type: REMOVE_PRODUCT_SUCCESS})
    } catch (err) {
        const errorMessage = new ErrorMessage(err)
        dispatch({
            type: REMOVE_PRODUCT_FAILURE,
            payload: errorMessage
        })
    }
}

export const addProduct = ({name, price, file}) => async (dispatch) => {
    try {
        dispatch({type: ADD_PRODUCT_REQUEST})

        const formData = new FormData()
        formData.append("name", name)
        formData.append("price", price)
        formData.append("image", file)

        const response = await axios.post("http://localhost:8000/product", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        // when a product is added, database contains new product but redux store doesn't reflect change
        dispatch({type: ADD_PRODUCT, payload: response.data})

        dispatch({type: ADD_PRODUCT_SUCCESS})


    } catch (err) {
        const errorMessage = new ErrorMessage(err)
        dispatch({
            type: ADD_PRODUCT_FAILURE,
            payload: errorMessage
        })
    }
}

export const editProduct = (id, payload) => async (dispatch) => {
    try {
        dispatch({type: EDIT_PRODUCT_REQUEST})

        await axios.put(`http://localhost:8000/product/${id}`, payload)

        dispatch({type: EDIT_PRODUCT_SUCCESS})
    } catch (err) {
        const errorMessage = new ErrorMessage(err)

        dispatch({type: EDIT_PRODUCT_FAILURE, payload: errorMessage})
    }
}
