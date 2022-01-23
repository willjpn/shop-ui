import './App.css';
import {Switch, Route} from "react-router-dom"
import Home from "./components/Home";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {refreshToken} from "./actions/authActions"
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import ProductDetails from "./components/ProductDetails";

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(refreshToken())
    })

    return (
        <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/login" component={Login}/>
            <Route path="/user-profile" component={UserProfile}/>
            <Route path="/product/:id" component={ProductDetails}/>
        </Switch>
    )
}

export default App;
