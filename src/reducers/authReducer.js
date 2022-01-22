import {SET_ACCESS_TOKEN} from "../constants/authConstants";

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_ACCESS_TOKEN:
            return {token: action.payload}
        default:
            return state
    }
}
