import {Fragment} from "react";
import Product from "./Product";

const Products = ({products, count}) => {

    return (
        <Fragment>
            <h2>Showing {count} Items</h2>
            {products.map(product => {
                return (
                    <div key={product._id}>
                        <Product product={product}/>
                    </div>
                )
            })}
        </Fragment>
    )
}

export default Products
