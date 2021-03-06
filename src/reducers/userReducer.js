import {
    ADD_ADDRESS_FAILURE,
    ADD_ADDRESS_REQUEST,
    ADD_ADDRESS_SUCCESS,
    ADD_CHECKOUT_ADDRESS,
    ADD_CHECKOUT_ADDRESS_FAILURE,
    ADD_CHECKOUT_ADDRESS_REQUEST,
    ADD_CHECKOUT_ADDRESS_SUCCESS,
    ADD_USER,
    ADD_USER_FAILURE,
    ADD_USER_REQUEST,
    ADD_USER_RESET,
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
    RESET_PASSWORD_SUCCESS, RESET_TEMPORARY_ADDRESS_STATE, RESET_USER_INFO,
    SET_DEFAULT_ADDRESS_ADD,
    SET_DEFAULT_PASSWORD_RESET,
    SIGNUP_DEFAULT,
    SIGNUP_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    UPDATE_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_RESET,
    UPDATE_USER_SUCCESS
} from "../constants/userConstants";

export const userReducer = (state = {userInfo: {}}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {loading: true, userInfo: {}}
        case LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case LOGIN_FAILURE:
            return {loading: false, userInfo: {}, error: action.payload}
        case LOGOUT:
            return {userInfo: {}}
        default:
            return state
    }
}

const userDetailsInitialState = {
    userInfo: {}
}

export const userDetailsReducer = (state = userDetailsInitialState, action) => {
    switch (action.type) {
        case GET_USER_REQUEST:
            return {loading: true, userInfo: {}}
        case GET_USER_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case GET_USER_FAILURE:
            return {loading: false, userInfo: {}, error: action.payload}
        case RESET_USER_INFO:
            return {userInfo: {}}
        default:
            return state
    }
}


const signupInitialState = {}

export const signupReducer = (state = signupInitialState, action) => {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return {loading: true}
        case SIGNUP_SUCCESS:
            return {loading: false, success: true}
        case SIGNUP_FAILURE:
            return {loading: false, success: false, error: action.payload}
        case SIGNUP_DEFAULT:
            return {}
        default:
            return state
    }
}

const usersInitialState = {
    users: []
}

export const usersReducer = (state = usersInitialState, action) => {
    switch (action.type) {
        case GET_USERS_REQUEST:
            return {loading: true, users: []}
        case GET_USERS_SUCCESS:
            return {loading: false, users: action.payload}
        case GET_USERS_FAILURE:
            return {loading: false, users: [], error: action.payload}
        case REMOVE_USER:
            const index = state.users.findIndex(user => user._id === action.payload)
            if (index > -1) {
                state.users.splice(index, 1)
            }
            return {loading: false, users: state.users}
        case ADD_USER:
            state.users.push(action.payload)
            return {loading: false, users: state.users}
        default:
            return state
    }
}

export const deleteUserReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_USER_REQUEST:
            return {loading: true}
        case DELETE_USER_SUCCESS:
            return {loading: false, success: true}
        case DELETE_USER_FAILURE:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const editUserReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case FETCH_EDIT_USER_REQUEST:
            return {loading: true, user: {}}
        case FETCH_EDIT_USER_SUCCESS:
            return {loading: false, user: action.payload}
        case FETCH_EDIT_USER_FAILURE:
            return {loading: false, user: {}, error: action.payload}
        default:
            return state
    }
}

export const addUserReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_USER_REQUEST:
            return {loading: true}
        case ADD_USER_SUCCESS:
            return {loading: false, success: true}
        case ADD_USER_FAILURE:
            return {loading: false, error: action.payload}
        case ADD_USER_RESET:
            return {}
        default:
            return state
    }
}

export const updateUserReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USER_REQUEST:
            return {loading: true}
        case UPDATE_USER_SUCCESS:
            return {loading: false, success: true}
        case UPDATE_USER_FAILURE:
            return {loading: false, error: action.payload}
        case UPDATE_USER_RESET:
            return {}
        default:
            return state
    }
}

export const resetPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return {loading: true}
        case RESET_PASSWORD_SUCCESS:
            return {loading: false, success: true}
        case RESET_PASSWORD_FAILURE:
            return {loading: false, error: action.payload}
        case SET_DEFAULT_PASSWORD_RESET:
            return {}
        default:
            return state
    }
}

export const addAddressReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_ADDRESS_REQUEST:
            return {loading: true}
        case ADD_ADDRESS_SUCCESS:
            return {loading: false, success: true}
        case ADD_ADDRESS_FAILURE:
            return {loading: false, error: action.payload}
        case SET_DEFAULT_ADDRESS_ADD:
            return {}
        default:
            return state
    }
}

export const addCheckoutAddressReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_CHECKOUT_ADDRESS:
            return {address: action.payload}
        default:
            return state
    }
}

export const editUserDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case EDIT_USER_DETAILS_REQUEST:
            return {loading: true}
        case EDIT_USER_DETAILS_SUCCESS:
            return {loading: false, success: true}
        case EDIT_USER_DETAILS_FAILURE:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const userOrdersReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case FETCH_USER_ORDERS_REQUEST:
            return {loading: true, orders: []}
        case FETCH_USER_ORDERS_SUCCESS:
            return {loading: false, orders: action.payload}
        case FETCH_USER_ORDERS_FAILURE:
            return {loading: false, orders: [], error: action.payload}
        default:
            return state
    }
}

export const addTemporaryAddressReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_CHECKOUT_ADDRESS_REQUEST:
            return {loading: true}
        case ADD_CHECKOUT_ADDRESS_SUCCESS:
            return {loading: false, success: true}
        case ADD_CHECKOUT_ADDRESS_FAILURE:
            return {loading: false, error: action.payload}
        case RESET_TEMPORARY_ADDRESS_STATE:
            return {}
        default:
            return state
    }
}
