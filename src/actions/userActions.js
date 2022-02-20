import axios from "axios";
import {
    ADD_ADDRESS_FAILURE,
    ADD_ADDRESS_REQUEST,
    ADD_ADDRESS_SUCCESS,
    ADD_CHECKOUT_ADDRESS,
    ADD_CHECKOUT_ADDRESS_FAILURE,
    ADD_CHECKOUT_ADDRESS_REQUEST, ADD_CHECKOUT_ADDRESS_SUCCESS,
    ADD_USER,
    ADD_USER_FAILURE,
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    DELETE_USER_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    EDIT_USER_DETAILS_FAILURE,
    EDIT_USER_DETAILS_REQUEST,
    EDIT_USER_DETAILS_SUCCESS,
    FETCH_EDIT_USER_FAILURE,
    FETCH_EDIT_USER_REQUEST,
    FETCH_EDIT_USER_SUCCESS,
    FETCH_USER_ORDERS_FAILURE,
    FETCH_USER_ORDERS_REQUEST,
    FETCH_USER_ORDERS_SUCCESS,
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USERS_FAILURE,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    REMOVE_USER,
    RESET_PASSWORD_FAILURE,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    SIGNUP_DEFAULT,
    SIGNUP_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    UPDATE_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS
} from "../constants/userConstants";
import {SET_ACCESS_TOKEN} from "../constants/authConstants";
import {ErrorMessage} from "../utils/errorHandler";


// TODO: update payload; errorMessage to errorMessage.message and add these error messages to html
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: LOGIN_REQUEST})

        const response = await axios.post("http://localhost:8000/user/login", {email, password})
        const {userInfo, accessToken} = response.data

        dispatch({type: LOGIN_SUCCESS, payload: userInfo})

        dispatch({type: SET_ACCESS_TOKEN, payload: accessToken})
    } catch (err) {
        const errorMessage = new ErrorMessage(err).message
        dispatch({type: LOGIN_FAILURE, payload: errorMessage})
    }
}

export const logout = () => async (dispatch) => {
    try {

        // remove refresh token
        await axios.get("http://localhost:8000/admin/removeRefreshToken")

        // remove userInfo
        dispatch({type: LOGOUT})

        // remove access token
        dispatch({type: SET_ACCESS_TOKEN, payload: ""})

        // restore signup reducer state to default
        dispatch({type: SIGNUP_DEFAULT})

    } catch (err) {

    }
}

export const getUser = () => async (dispatch) => {

    dispatch({type: GET_USER_REQUEST})

    axios.get('http://localhost:8000/user/get-user').then((response) => {
        dispatch({type: GET_USER_SUCCESS, payload: response.data})
    }).catch(err => {
        dispatch({type: GET_USER_FAILURE, payload: new ErrorMessage(err).message})
    })

    // try {
    //     dispatch({type: GET_USER_REQUEST})
    //
    //     const response = await axios.get('http://localhost:8000/user/get-user')
    //         console.log("response.data on getUser", response.data)
    //
    //     dispatch({type: GET_USER_SUCCESS, payload: response.data})
    //
    // } catch (err) {
    //     const errorMessage = new ErrorMessage(err)
    //     dispatch({type: GET_USER_FAILURE, payload: errorMessage})
    // }
}

export const createNewUser = (payload) => async (dispatch) => {
    try {
        dispatch({type: SIGNUP_REQUEST})
        await axios.post("http://localhost:8000/user", payload)

        await dispatch(login(payload.email, payload.password))

        dispatch({type: SIGNUP_SUCCESS})
    } catch (err) {
        const errorMessage = new ErrorMessage(err).message
        dispatch({type: SIGNUP_FAILURE, payload: errorMessage})
    }
}

export const getUsers = () => async (dispatch) => {
    try {
        dispatch({type: GET_USERS_REQUEST})

        const response = await axios.get('http://localhost:8000/user')
        dispatch({type: GET_USERS_SUCCESS, payload: response.data})

    } catch (err) {
        const errorMessage = new ErrorMessage(err).message
        dispatch({type: GET_USERS_FAILURE, payload: errorMessage})
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_USER_REQUEST})

        await axios.delete(`http://localhost:8000/user/${id}`)

        dispatch({type: REMOVE_USER, payload: id})
        dispatch({type: DELETE_USER_SUCCESS})
    } catch (err) {
        dispatch({type: DELETE_USER_FAILURE, payload: new ErrorMessage(err).message})
    }
}

export const fetchEditUser = (id) => async (dispatch) => {
    try {
        dispatch({type: FETCH_EDIT_USER_REQUEST})

        const response = await axios.get(`http://localhost:8000/user/get-edit-user/${id}`)

        dispatch({type: FETCH_EDIT_USER_SUCCESS, payload: response.data})
    } catch (err) {
        dispatch({type: FETCH_EDIT_USER_FAILURE, payload: new ErrorMessage(err).message})
    }
}

export const createUser = (payload) => async (dispatch) => {
    try {
        dispatch({type: ADD_USER_REQUEST})

        const response = await axios.post('http://localhost:8000/user', payload)

        dispatch({type: ADD_USER, payload: response.data})

        dispatch({type: ADD_USER_SUCCESS})

    } catch (err) {
        dispatch({type: ADD_USER_FAILURE, payload: new ErrorMessage(err).message})
    }
}

export const updateUser = (id, payload) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_USER_REQUEST})

        const response = await axios.put(`http://localhost:8000/user/${id}`, payload)

        dispatch({type: UPDATE_USER_SUCCESS, payload: response.data})
    } catch (err) {
        dispatch({type: UPDATE_USER_FAILURE, payload: new ErrorMessage(err).message})
    }
}

export const resetPassword = (payload) => async (dispatch) => {
    try {
        dispatch({type: RESET_PASSWORD_REQUEST})

        await axios.post("http://localhost:8000/user/change-password", payload)

        dispatch({type: RESET_PASSWORD_SUCCESS})
    } catch (err) {
        dispatch({type: RESET_PASSWORD_FAILURE, payload: new ErrorMessage(err).message})
    }
}

export const addAddress = (payload) => async (dispatch) => {
    try {
        dispatch({type: ADD_ADDRESS_REQUEST})

        await axios.post("http://localhost:8000/user/shipping-address", payload)

        dispatch({type: ADD_ADDRESS_SUCCESS})

    } catch (err) {
        dispatch({type: ADD_ADDRESS_FAILURE, payload: new ErrorMessage(err).message})
    }
}

export const editUserDetails = (payload) => async (dispatch) => {
    try {
        dispatch({type: EDIT_USER_DETAILS_REQUEST})

        const response = await axios.post("http://localhost:8000/user/details", payload)
        console.log("response.data", response.data)

        dispatch({type: EDIT_USER_DETAILS_SUCCESS})

    } catch (err) {
        dispatch({type: EDIT_USER_DETAILS_FAILURE, payload: new ErrorMessage(err).message})
    }
}

export const fetchUserOrders = () => async (dispatch) => {
    try {
        dispatch({type: FETCH_USER_ORDERS_REQUEST})

        const response = await axios.get("http://localhost:8000/order/user-orders")

        console.log("response.data", response.data)

        dispatch({type: FETCH_USER_ORDERS_SUCCESS, payload: response.data})
    } catch (err) {
        dispatch({type: FETCH_USER_ORDERS_FAILURE, payload: new ErrorMessage(err).message})
    }
}

export const addTemporaryAddress = (payload) => async (dispatch) => {
    try {
        dispatch({type: ADD_CHECKOUT_ADDRESS_REQUEST})

        const response = await axios.post("http://localhost:8000/user/checkout-address", payload)

        console.log("response.data", response.data)

        dispatch({type: ADD_CHECKOUT_ADDRESS_SUCCESS})
    } catch (err) {
        dispatch({type: ADD_CHECKOUT_ADDRESS_FAILURE, payload: new ErrorMessage(err).message})
    }
}
