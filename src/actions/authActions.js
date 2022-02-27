import axios from "axios";
import {LOGIN_SUCCESS} from "../constants/userConstants";
import {
    GET_CLIENT_ID_FAILURE,
    GET_CLIENT_ID_REQUEST,
    GET_CLIENT_ID_SUCCESS, REFRESH_FAILURE,
    SET_ACCESS_TOKEN
} from "../constants/authConstants";
import {ErrorMessage} from "../utils/errorHandler";

export const refreshToken = () => async (dispatch) => {
    try {
        const response = await axios.get("/admin/refreshToken")

        const {userInfo, accessToken} = response.data

        dispatch({type: LOGIN_SUCCESS, payload: userInfo})
        dispatch({type: SET_ACCESS_TOKEN, payload: accessToken})

    } catch (err) {
        dispatch({type: REFRESH_FAILURE, payload: new ErrorMessage(err).message})
    }
}

export const getClientId = () => async (dispatch) => {
    try {
        dispatch({type: GET_CLIENT_ID_REQUEST})

        const response = await axios.get("/paypal")

        dispatch({type: GET_CLIENT_ID_SUCCESS, payload: response.data})
    } catch (err) {
        dispatch({type: GET_CLIENT_ID_FAILURE, payload: new ErrorMessage(err).message})
    }
}
