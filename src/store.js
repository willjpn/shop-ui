import {createStore, applyMiddleware, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
    addProductReducer,
    deleteProductReducer,
    editProductReducer,
    productReducer,
    productsReducer, queryProductsReducer, queryReducer
} from "./reducers/productReducer";
import {authReducer, getClientIdReducer} from "./reducers/authReducer";
import {
    addAddressReducer, addCheckoutAddressReducer, addTemporaryAddressReducer,
    addUserReducer,
    deleteUserReducer, editUserDetailsReducer,
    editUserReducer, resetPasswordReducer,
    signupReducer, updateUserReducer,
    userDetailsReducer, userOrdersReducer,
    userReducer,
    usersReducer
} from "./reducers/userReducer";
import {basketReducer} from "./reducers/basketReducer";
import {
    createOrderReducer,
    getOrderReducer,
    ordersReducer,
    payOrderReducer, removeOrderReducer
} from "./reducers/orderReducer";

const reducer = combineReducers({
    basket: basketReducer,
    auth: authReducer,
    signup: signupReducer,
    products: productsReducer,
    product: productReducer,
    addProduct: addProductReducer,
    editProduct: editProductReducer,
    deleteProduct: deleteProductReducer,
    users: usersReducer,
    user: userReducer,
    userDetails: userDetailsReducer,
    addUser: addUserReducer,
    editUser: editUserReducer,
    updateUser: updateUserReducer,
    deleteUser: deleteUserReducer,
    resetPassword: resetPasswordReducer,
    addAddress: addAddressReducer,
    queryProducts: queryProductsReducer,
    addCheckoutAddress: addCheckoutAddressReducer,
    createOrder: createOrderReducer,
    getOrder: getOrderReducer,
    payOrder: payOrderReducer,
    orders: ordersReducer,
    removeOrder: removeOrderReducer,
    editUserDetails: editUserDetailsReducer,
    userOrders: userOrdersReducer,
    addTemporaryAddress: addTemporaryAddressReducer,
    getClientId: getClientIdReducer,
    query: queryReducer,
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
