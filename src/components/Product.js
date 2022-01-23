import {Link} from "react-router-dom";
import {Fragment} from "react";

const Product = ({product}) => {
    return (
        <Fragment>
            <Link to={`/product/${product._id}`}>
                <h2>{product.name}</h2>
            </Link>
        </Fragment>

    )
}

export default Product
