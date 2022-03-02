import axios from "axios";
import {REFRESH_FAILURE, SET_ACCESS_TOKEN} from "../constants/authConstants";
import {GET_USER_SUCCESS, LOGIN_SUCCESS} from "../constants/userConstants";
import {ErrorMessage} from "../utils/errorHandler";

let store

export const injectStore = _store => {
    store = _store
}

let alreadyRetriedRefresh = false
let fetchingAccessToken = false
let subscribers = []

const refreshToken = async (config) => {
    const request = new Promise((resolve, reject) => pushSubscriber(() => {
        axios(config).then(resolve).catch(reject)
    }))

    if (!fetchingAccessToken) {
        try {
            fetchingAccessToken = true
            const response = await axios.get("/admin/refreshToken")

            alreadyRetriedRefresh = true

            // once we've fetched new access token, we need to save it in redux store and then reattempt original request
            const {userInfo, accessToken} = response.data

            await store.dispatch({type: LOGIN_SUCCESS, payload: userInfo})
            await store.dispatch({type: SET_ACCESS_TOKEN, payload: accessToken})
            await store.dispatch({type: GET_USER_SUCCESS, payload: userInfo})
            subscriberHandler()
            fetchingAccessToken = false
            return request
        } catch (error) {
            store.dispatch({type: REFRESH_FAILURE, payload: new ErrorMessage(error).message})
            subscribers = []
            return Promise.reject(error)
        }
    }
    return request
}

function subscriberHandler() {
    subscribers.forEach(callback => {
        callback()
    })
    subscribers = []
}

function pushSubscriber(cb) {
    if (!alreadyRetriedRefresh) {
        subscribers.push(cb)
    }

}


// TODO - if logged out, what happens when trying to access admin only screens

axios.interceptors.request.use(function (config) {
    config.withCredentials = true
    config.baseURL = "https://will-webshop-2a82k.ondigitalocean.app"
    // config.baseURL = "http://localhost:8000"
    config.headers = {
        'Access-Control-Allow-Origin': "https://will-webshop-2a82k.ondigitalocean.app",
        // 'Access-Control-Allow-Origin': "http://localhost:8000",
        "Content-Type": "application/json"
    }
    // if access token exists
    if (store.getState().auth.token) {
        config.headers.authorization = "Bearer " + store.getState().auth.token
    }
    // if access token doesn't exist
    else {
        config.headers.authorization = "Bearer"
    }

    return config
}, function (error) {
    return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
    // runs when 2XX status code
    return response
}, function (error) {
    // if 401 / invalid access token
    if (error.response.status === 401) {
        return refreshToken(error.response.config)
    }

    // any other status code / error
    return Promise.reject(error)
})
