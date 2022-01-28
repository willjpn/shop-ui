import {REFRESH_FAILURE, SET_ACCESS_TOKEN} from "../constants/authConstants";

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_ACCESS_TOKEN:
            return {token: action.payload}
        case REFRESH_FAILURE:
            return {...state, refreshFailed: true}
        default:
            return state
    }
}
