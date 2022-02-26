import {
    GET_CLIENT_ID_FAILURE,
    GET_CLIENT_ID_REQUEST,
    GET_CLIENT_ID_SUCCESS,
    REFRESH_FAILURE,
    SET_ACCESS_TOKEN
} from "../constants/authConstants";

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_ACCESS_TOKEN:
            return {token: action.payload}
        case REFRESH_FAILURE:
            return {...state, refreshFailed: true, error: action.payload}
        default:
            return state
    }
}

export const getClientIdReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_CLIENT_ID_REQUEST:
            return {loading: true}
        case GET_CLIENT_ID_SUCCESS:
            return {loading: false, clientId: action.payload}
        case GET_CLIENT_ID_FAILURE:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}
