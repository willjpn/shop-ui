import {ADD_TO_BASKET, REMOVE_FROM_BASKET} from "../constants/basketConstants";

const initialState = {
    basket: [],
    anotherVariable: {}
}


export const basketReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_BASKET:
            // check if item is already in basket
            const {product, quantity} = action.payload
            const index = state.basket.findIndex(item => item.product._id === product._id)
            // if item is already in basket, change quantity
            if (index > -1) {
                const updatedBasket = state.basket.map(item => {
                    if (item.product._id === product._id) {
                        return {...item, quantity: quantity}
                    }
                    return item
                })
                return {...state, basket: updatedBasket}
            }
            // if item isn't already in basket, append to basket
            return {...state, basket: [...state.basket, action.payload]}
        case REMOVE_FROM_BASKET:
            // filter out the item to be removed and return filtered array as basket in redux state
            const filteredBasket = state.basket.filter(item => item.product._id !== action.payload)
            return {...state, basket: filteredBasket}
        default:
            return state
    }
}
