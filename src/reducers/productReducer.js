import {
    FETCH_PRODUCT_FAILURE,
    FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS
} from "../constants/productConstants";

const initialProductsState = {
    products: [],
}

const initialProductState = {
    product: {}
}

export const productsReducer = (state = initialProductsState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {loading: true, products: []}
        case FETCH_PRODUCTS_SUCCESS:
            return {loading: false, products: action.payload}
        case FETCH_PRODUCTS_FAILURE:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const productReducer = (state = initialProductState, action) => {
    switch (action.type) {
        case FETCH_PRODUCT_REQUEST:
            return {loading: true, product: {}}
        case FETCH_PRODUCT_SUCCESS:
            return {loading: false, product: action.payload}
        case FETCH_PRODUCT_FAILURE:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

