import './App.css';
import {Switch, Route} from "react-router-dom"
import Home from "./components/Home";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {refreshToken} from "./actions/authActions"
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import ProductDetails from "./components/ProductDetails";
import Signup from "./components/Signup";
import ProductList from "./components/ProductList";
import ErrorPage from "./components/ErrorPage";
import NewProduct from "./components/NewProduct";
import EditProduct from "./components/EditProduct";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";
import NewUser from "./components/NewUser";
import CheckoutShipping from "./components/CheckoutShipping";
import CheckoutConfirm from "./components/CheckoutConfirm";
import OrderOverview from "./components/OrderOverview";
import OrderList from "./components/OrderList";

function App() {

    // TODO - add cookie consent
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(refreshToken())
    }, [dispatch])

    return (
        <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/product-list" component={ProductList}/>
            <Route path="/user-profile" component={UserProfile}/>
            <Route path='/product/new' component={NewProduct}/>
            <Route path='/product/edit/:id' component={EditProduct}/>
            <Route path="/product/:id" component={ProductDetails}/>
            <Route path="/user-list" component={UserList}/>
            <Route path='/user/edit/:id' component={EditUser}/>
            <Route path='/user/new' component={NewUser}/>
            <Route path='/checkout/shipping' component={CheckoutShipping}/>
            <Route path='/checkout/confirm' component={CheckoutConfirm}/>
            <Route path='/orders/:id' component={OrderOverview}/>
            <Route path='/order-list' component={OrderList}/>
            <Route component={ErrorPage}/>
        </Switch>
    )
}

export default App;
