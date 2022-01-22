import {createStore, applyMiddleware, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {productsReducer} from "./reducers/productReducer";
import {authReducer} from "./reducers/authReducer";
import {userDetailsReducer, userReducer} from "./reducers/userReducer";

const reducer = combineReducers({
    products: productsReducer,
    user: userReducer,
    auth: authReducer,
    userDetails: userDetailsReducer
})

const initialState = {}

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store
