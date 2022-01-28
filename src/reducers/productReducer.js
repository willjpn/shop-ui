import {
    ADD_PRODUCT,
    ADD_PRODUCT_FAILURE,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_RESET,
    ADD_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAILURE,
    EDIT_PRODUCT_REQUEST,
    EDIT_PRODUCT_RESET,
    EDIT_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILURE,
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS, QUERY_PRODUCTS_FAILURE, QUERY_PRODUCTS_REQUEST, QUERY_PRODUCTS_SUCCESS,
    REMOVE_PRODUCT,
    REMOVE_PRODUCT_FAILURE,
    REMOVE_PRODUCT_REQUEST,
    REMOVE_PRODUCT_SUCCESS
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
        case ADD_PRODUCT:
            state.products.push(action.payload)
            return {loading: false, products: state.products}
        case REMOVE_PRODUCT:
            const index = state.products.findIndex(product => product._id === action.payload)
            state.products.splice(index, 1)
            return {loading: false, products: state.products}
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

export const addProductReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_PRODUCT_REQUEST:
            return {loading: true}
        case ADD_PRODUCT_SUCCESS:
            return {loading: false, success: true}
        case ADD_PRODUCT_FAILURE:
            return {loading: false, error: action.payload}
        case ADD_PRODUCT_RESET:
            return {}
        default:
            return state
    }
}

export const editProductReducer = (state = {}, action) => {
    switch (action.type) {
        case EDIT_PRODUCT_REQUEST:
            return {loading: true}
        case EDIT_PRODUCT_SUCCESS:
            return {loading: false, success: true}
        case EDIT_PRODUCT_FAILURE:
            return {loading: false, error: action.payload}
        case EDIT_PRODUCT_RESET:
            return {}
        default:
            return state

    }
}


export const deleteProductReducer = (state = {}, action) => {
    switch (action.type) {
        case REMOVE_PRODUCT_REQUEST:
            return {loading: true}
        case REMOVE_PRODUCT_SUCCESS:
            return {loading: false, success: true}
        case REMOVE_PRODUCT_FAILURE:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}


export const queryProductsReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case QUERY_PRODUCTS_REQUEST:
            return {loading: true, products: []}
        case QUERY_PRODUCTS_SUCCESS:
            return {loading: false, products: action.payload.products, count: action.payload.count}
        case QUERY_PRODUCTS_FAILURE:
            return {loading: false, products: [], error: action.payload}
        default:
            return state
    }
}
