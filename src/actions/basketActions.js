import {
    ADD_TO_BASKET,
    DECREMENT_PRODUCT,
    EMPTY_BASKET,
    INCREMENT_PRODUCT,
    REMOVE_FROM_BASKET
} from "../constants/basketConstants";

export const addToBasket = (item, fromHomeScreen) => async (dispatch, getState) => {

    try {
        dispatch({
            type: ADD_TO_BASKET,
            payload: {obj: item, fromHomeScreen}
        })
        localStorage.setItem("basket", JSON.stringify(getState().basket.basket))
    } catch (err) {
        console.error(err.message)
    }
}

export const removeFromBasket = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REMOVE_FROM_BASKET,
            payload: id
        })
        localStorage.setItem("basket", JSON.stringify(getState().basket.basket))
    } catch (err) {
        console.error(err.message)
    }
}

export const emptyBasket = () => async (dispatch, getState) => {
    try {
        dispatch({type: EMPTY_BASKET})
        localStorage.setItem("basket", JSON.stringify(getState().basket.basket))
    } catch (err) {
        console.error(err.message)
    }
}

export const incrementProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: INCREMENT_PRODUCT, payload: id})
        localStorage.setItem("basket", JSON.stringify(getState().basket.basket))
    } catch (err) {
        console.error(err.message)
    }
}

export const decrementProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: DECREMENT_PRODUCT, payload: id})
        localStorage.setItem("basket", JSON.stringify(getState().basket.basket))
    } catch (err) {
        console.error(err.message)
    }
}
