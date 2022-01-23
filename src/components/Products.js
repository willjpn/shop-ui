import {Fragment} from "react";
import Product from "./Product";

const Products = ({products}) => {


    return (
        <Fragment>
            {products.map(product => {
                return (
                    <div key={product._id} >
                        <Product product={product} />
                    </div>
                    )
            })}
        </Fragment>
    )
}

export default Products
