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
    SET_ORDER_PAID_STATE,
} from "../constants/orderConstants";
import {ErrorMessage} from "../utils/errorHandler";
import axios from "axios";

export const createOrder = (payload) => async (dispatch) => {
    try {
        dispatch({type: CREATE_ORDER_REQUEST})

        const response = await axios.post("/order", payload)

        dispatch({type: CREATE_ORDER_SUCCESS, payload: response.data})
    } catch (err) {
        dispatch({type: CREATE_ORDER_FAILURE, payload: new ErrorMessage(err).message})
    }
}

export const getOrder = (id) => async (dispatch) => {
    try {
        dispatch({type: GET_ORDER_REQUEST})

        const response = await axios.get(`/order/${id}`)

        dispatch({type: GET_ORDER_SUCCESS, payload: response.data})

    } catch (err) {

        dispatch({type: GET_ORDER_FAILURE, payload: new ErrorMessage(err).message})
    }
}

export const payOrder = (id) => async (dispatch) => {
    try {

        dispatch({type: PAY_ORDER_REQUEST})

        await axios.post(`/order/${id}/pay`)

        dispatch({type: PAY_ORDER_SUCCESS})
        dispatch({type: SET_ORDER_PAID_STATE, id})
    } catch (err) {
        dispatch({type: PAY_ORDER_FAILURE, payload: new ErrorMessage(err).message})
    }
}

export const getOrders = () => async (dispatch) => {
    try {
        dispatch({type: GET_ORDERS_REQUEST})

        const response = await axios.get("/order")

        dispatch({type: GET_ORDERS_SUCCESS, payload: response.data})
    } catch (err) {
        dispatch({type: GET_ORDERS_FAILURE, payload: new ErrorMessage(err).message})
    }
}

export const removeOrder = (id) => async (dispatch) => {
    try {
        dispatch({type: REMOVE_ORDER_REQUEST})

        await axios.delete(`/order/${id}`)

        dispatch({type: REMOVE_ORDER, payload: id})
        dispatch({type: REMOVE_ORDER_SUCCESS})
    } catch (err) {
        dispatch({type: REMOVE_ORDER_FAILURE, payload: new ErrorMessage(err).message})
    }
}
