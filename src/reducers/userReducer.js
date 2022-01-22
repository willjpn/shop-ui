import {
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT
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
        default:
            return state
    }
}
