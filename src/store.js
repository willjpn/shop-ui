import {createStore, applyMiddleware, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {productReducer, productsReducer} from "./reducers/productReducer";
import {authReducer} from "./reducers/authReducer";
import {userDetailsReducer, userReducer} from "./reducers/userReducer";
import {basketReducer} from "./reducers/basketReducer";

const reducer = combineReducers({
    products: productsReducer,
    user: userReducer,
    auth: authReducer,
    userDetails: userDetailsReducer,
    basket: basketReducer,
    product: productReducer,
})

const localStorageBasket = localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")) : []


const initialState = {
    basket: {basket: localStorageBasket}
}



const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store
