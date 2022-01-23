import axios from "axios";
import {
    GET_USER_FAILURE,
    GET_USER_REQUEST, GET_USER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT
} from "../constants/userConstants";
import {SET_ACCESS_TOKEN} from "../constants/authConstants";
import {ErrorMessage} from "../utils/errorHandler";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: LOGIN_REQUEST})

        const response = await axios.post("http://localhost:8000/user/login", {email, password})
        const {userInfo, accessToken} = response.data

        dispatch({type: LOGIN_SUCCESS, payload: userInfo})

        dispatch({type: SET_ACCESS_TOKEN, payload: accessToken})
    } catch (err) {
        const errorMessage = new ErrorMessage(err)
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


    } catch (err) {

    }
}

export const getUser = () => async (dispatch) => {
    try {
        dispatch({type: GET_USER_REQUEST})

        const response = await axios.get('http://localhost:8000/user/get-user')


        dispatch({type: GET_USER_SUCCESS, payload: response.data})

    } catch (err) {
        const errorMessage = new ErrorMessage(err)
        dispatch({type: GET_USER_FAILURE, payload: errorMessage})
    }
}
