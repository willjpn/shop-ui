import axios from "axios";
import {LOGIN_SUCCESS} from "../constants/userConstants";
import {SET_ACCESS_TOKEN} from "../constants/authConstants";

export const refreshToken = () => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:8000/admin/refreshToken")

        const {userInfo, accessToken} = response.data

        dispatch({type: LOGIN_SUCCESS, payload: userInfo})
        dispatch({type: SET_ACCESS_TOKEN, payload: accessToken})

    } catch (err) {
        console.error(err.message)
    }
}
