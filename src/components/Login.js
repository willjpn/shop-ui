import {Fragment, useState} from "react";
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../actions/userActions";
import {useEffect} from "react";
import {Link} from "react-router-dom";

const Login = ({history, location}) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const {loading, userInfo, error} = user

    const redirect = location.search ? location.search.split("=")[1] : "/"

    useEffect(() => {
        if (userInfo._id) {
            history.push(redirect)
        }
    }, [userInfo, history])

    const submit = (e) => {
        e.preventDefault()
        dispatch(login(username, password))
    }

    return (
        <Fragment>
            <Header/>
            {loading ?
                <h2>Logging you in!</h2> :
                <Fragment>
                    <h2>Login</h2>
                    <form>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" value={username}
                               onChange={(e) => setUsername(e.target.value)}/>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                        <button onClick={(e) => submit(e)}>Submit</button>
                        <Link to="/signup">Don't Have An Account?</Link>
                    </form>
                    {error && <h2>{error.message}</h2>}
                </Fragment>
            }
        </Fragment>
    )
}

export default Login
