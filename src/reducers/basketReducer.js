import {
    ADD_TO_BASKET,
    DECREMENT_PRODUCT,
    EMPTY_BASKET,
    INCREMENT_PRODUCT,
    REMOVE_FROM_BASKET
} from "../constants/basketConstants";

const initialState = {
    basket: [],
}


export const basketReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_BASKET:
            const {obj, fromHomeScreen} = action.payload
            const {product, quantity} = obj
            let updatedBasket = []

            // check if item is already in basket
            const index = state.basket.findIndex(item => item.product._id === product._id)


            // if item is already in basket, change quantity
            if (index > -1) {
                if (fromHomeScreen) {
                    updatedBasket = state.basket.map(item => {
                        if (item.product._id === product._id) {
                            return {...item, quantity: item.quantity + 1}
                        } return item
                    })
                } else {
                    updatedBasket = state.basket.map(item => {
                        if (item.product._id === product._id) {
                            return {...item, quantity: quantity}
                        }
                        return item
                    })
                }
                return {...state, basket: updatedBasket}
            }

            // if item isn't already in basket, append to basket
            return {...state, basket: [...state.basket, {product, quantity}]}
        case REMOVE_FROM_BASKET:
            // filter out the item to be removed and return filtered array as basket in redux state
            const filteredBasket = state.basket.filter(item => item.product._id !== action.payload)
            return {...state, basket: filteredBasket}
        case EMPTY_BASKET:
            return {basket: []}
        case INCREMENT_PRODUCT:
            const incrementBasket = state.basket.map(item => {
                if (item.product._id === action.payload) {
                    return {...item, quantity: item.quantity + 1}
                }
                return item
            })
            return {...state, basket: incrementBasket}
        case DECREMENT_PRODUCT:
            const item = state.basket.find(item => item.product._id === action.payload)
            let decrementBasket = []
            // if the item we want to decrement only has quantity 1, remove it entirely
            if (item.quantity === 1) {
                decrementBasket = state.basket.filter((item) => item.product._id !== action.payload)
            } else {
                // else deduct one from quantity
                decrementBasket = state.basket.map(item => {
                    if (item.product._id === action.payload) {
                        return {...item, quantity: item.quantity - 1}
                    }
                    return item
                })
            }
            return {...state, basket: decrementBasket}
        default:
            return state
    }
}
