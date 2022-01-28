import axios from "axios";
import {refreshToken} from "../actions/authActions";
import {REFRESH_FAILURE} from "../constants/authConstants";

let store

export const injectStore = _store => {
    store = _store
}

let fetchingAccessToken = false;
let alreadyRetriedRefresh = false

let subscribers = [];

// this works by slotting creating a promise that resolves before the .then() part of the request
// for example: if we request products but it requires authorization and the user doesn't have a valid access token, this axios interceptor will run
// before the .then() of the fetch products action which will allow the rest of the action to continue once we have access token

const refreshTokenAndRequest = (config) => {
    const retryRequest = new Promise((resolve, reject) => addSubscriber(() => {
        axios(config).then(resolve).catch(reject);
    }));


    if (!fetchingAccessToken) {
        fetchingAccessToken = true;
        return axios.get("http://localhost:8000/admin/refreshToken").then(() => {
            alreadyRetriedRefresh = true
            onAccessTokenFetched();
            fetchingAccessToken = false;
            return retryRequest;
        }).catch(error => {
            console.log("error occurred when refreshing")
            store.dispatch({type: REFRESH_FAILURE})
            subscribers = [];
            return Promise.reject(error);
        });
    }
    return retryRequest;
}

function onAccessTokenFetched() {
    subscribers.forEach(callback => {
        callback()
    });
    subscribers = [];
}

function addSubscriber(callback) {
    if (!alreadyRetriedRefresh) {
        subscribers.push(callback)
    }

}

axios.interceptors.request.use(function (config) {
    config.withCredentials = true
    config.headers = {
        'Access-Control-Allow-Origin': "http://localhost:8000",
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

    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // runs when 2XX status code
    return response;
}, function (error) {
    console.log("error.response in axios interceptor", error.response)
    console.log("error.response.data", error.response.data)
    console.log("error.response.status", error.response.status)


    // if 401 / invalid access token
    if (error.response.status === 401) {
        return refreshTokenAndRequest(error.response.config)
    }

    // any other status code / error
    return Promise.reject(error);
});
