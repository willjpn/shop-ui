import {FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS} from "../constants/productConstants";

const initialState = {
    products: []
}

export const productsReducer = (state = initialState, action) => {
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
