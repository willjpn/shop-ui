import {
    FETCH_PRODUCT_FAILURE,
    FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS
} from "../constants/productConstants";
import axios from "axios";

export const fetchProducts = () => async (dispatch) => {
    try {
        dispatch({type: FETCH_PRODUCTS_REQUEST})

        const response = await axios.get("http://localhost:8000/product")

        dispatch({type: FETCH_PRODUCTS_SUCCESS, payload: response.data})

    } catch (err) {
        dispatch({type: FETCH_PRODUCTS_FAILURE, payload: err.message})
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
        dispatch({type: FETCH_PRODUCT_FAILURE, payload: err.message})
    }
}
