import {
    ADD_USER,
    ADD_USER_FAILURE,
    ADD_USER_REQUEST,
    ADD_USER_RESET,
    ADD_USER_SUCCESS,
    DELETE_USER_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    FETCH_EDIT_USER_FAILURE,
    FETCH_EDIT_USER_REQUEST,
    FETCH_EDIT_USER_SUCCESS,
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
    SIGNUP_DEFAULT,
    SIGNUP_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS, UPDATE_USER_FAILURE,
    UPDATE_USER_REQUEST, UPDATE_USER_RESET,
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

