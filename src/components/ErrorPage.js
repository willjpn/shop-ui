import {Fragment} from "react";
import {Link} from "react-router-dom";
import Header from "./Header";

const ErrorPage = ({history}) => {
    return (
        <Fragment>
            <Header history={history}/>
            <h2>Sorry, we couldn't find that page.</h2>
            <h3>
                <Link to="/">Click to go back to our home page</Link>
            </h3>
        </Fragment>
    )
}

export default ErrorPage
