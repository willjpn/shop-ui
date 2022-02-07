import {createStore, applyMiddleware, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
    addProductReducer,
    deleteProductReducer,
    editProductReducer,
    productReducer,
    productsReducer, queryProductsReducer
} from "./reducers/productReducer";
import {authReducer} from "./reducers/authReducer";
import {
    addAddressReducer, addCheckoutAddressReducer,
    addUserReducer,
    deleteUserReducer,
    editUserReducer, resetPasswordReducer,
    signupReducer, updateUserReducer,
    userDetailsReducer,
    userReducer,
    usersReducer
} from "./reducers/userReducer";
import {basketReducer} from "./reducers/basketReducer";
import {queryProducts} from "./actions/productActions";
import {
    createOrderReducer,
    getOrderReducer,
    getOrdersReducer,
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
    removeOrder: removeOrderReducer
})

// TODO- we use cookies fyi / PAGINATION / AUTOCOMPLETE DELIVERY ADDRESS

//
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
