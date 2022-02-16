import {
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    GET_ORDER_FAILURE,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDERS_FAILURE,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    PAY_ORDER_FAILURE,
    PAY_ORDER_REQUEST,
    PAY_ORDER_SUCCESS,
    REMOVE_ORDER,
    REMOVE_ORDER_FAILURE,
    REMOVE_ORDER_REQUEST,
    REMOVE_ORDER_SUCCESS,
    RESET_CREATE_ORDER_STATE
} from "../constants/orderConstants";
import {REMOVE_USER} from "../constants/userConstants";

export const createOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {loading: true, order: {}}
        case CREATE_ORDER_SUCCESS:
            return {loading: false, order: action.payload, success: true}
        case CREATE_ORDER_FAILURE:
            return {loading: false, order: {}, error: action.payload}
        case RESET_CREATE_ORDER_STATE:
            return {}
        default:
            return state
    }
}

export const getOrderReducer = (state = {order: {}}, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return {loading: true, order: {}}
        case GET_ORDER_SUCCESS:
            return {loading: false, order: action.payload}
        case GET_ORDER_FAILURE:
            return {loading: false, error: action.payload, order: {}}
        default:
            return state
    }
}

export const payOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case PAY_ORDER_REQUEST:
            return {loading: true}
        case PAY_ORDER_SUCCESS:
            return {loading: false, success: true}
        case PAY_ORDER_FAILURE:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const ordersReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case GET_ORDERS_REQUEST:
            return {loading: true, orders: []}
        case GET_ORDERS_SUCCESS:
            return {loading: false, orders: action.payload}
        case GET_ORDERS_FAILURE:
            return {loading: false, error: action.payload}
        case REMOVE_ORDER:
            const index = state.orders.findIndex(user => user._id === action.payload)
            if (index > -1) {
                state.orders.splice(index, 1)
            }
            return {loading: false, orders: state.orders}
        default:
            return state
    }
}

export const removeOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case REMOVE_ORDER_REQUEST:
            return {loading: true}
        case REMOVE_ORDER_SUCCESS:
            return {loading: false, success: true}
        case REMOVE_ORDER_FAILURE:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}
