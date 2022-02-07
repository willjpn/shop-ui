import {Fragment} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/userActions";

const Header = () => {
    const user = useSelector(state => state.user)
    const {userInfo} = user

    const dispatch = useDispatch()

    const signOut = () => {
        dispatch(logout())
    }

    return (
        <Fragment>
            <button>
                <Link to="/">Home</Link>
            </button>
            {userInfo._id ?
                <Fragment>
                    <button onClick={signOut}>
                        <Link to="/">Logout</Link>
                    </button>
                    <button>
                        <Link to="/user-profile">Profile</Link>
                    </button>
                    {userInfo.isAdmin &&
                    <Fragment>
                        <button>
                            <Link to="/product-list">Webshop Products</Link>
                        </button>
                        <button>
                            <Link to="/user-list">See Users</Link>
                        </button>
                        <button>
                            <Link to="/order-list">See Orders</Link>
                        </button>
                    </Fragment>
                    }
                </Fragment>
                :
                <button>
                    <Link to="/login">Login</Link>
                </button>
            }
            <button>
                <Link to="/basket">Basket</Link>
            </button>

        </Fragment>
    )
}

export default Header
