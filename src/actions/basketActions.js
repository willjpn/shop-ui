import {ADD_TO_BASKET, EMPTY_BASKET, REMOVE_FROM_BASKET} from "../constants/basketConstants";

export const addToBasket = (payload) => async (dispatch, getState) => {

    try {
        dispatch({
            type: ADD_TO_BASKET,
            payload: payload
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
