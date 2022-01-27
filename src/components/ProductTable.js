import {deleteProduct} from "../actions/productActions";
import {Fragment} from "react";

const ProductTable = ({products, dispatch, history}) => {

    const removeProduct = (id) => {
        dispatch(deleteProduct(id))
    }

    const updateProduct = (id) => {
        history.push(`/product/edit/${id}`)
    }

    return (
        <Fragment>
            {!products.length ? <h2>No products have been added...</h2> :
                <table style={{minWidth: 650}} aria-label="simple table">
                    <thead>
                    <tr>
                        <th align="left">Name</th>
                        <th align="left">Price</th>
                        <th align="left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>
                                {product.name}
                            </td>
                            <td>
                                {product.price}
                            </td>
                            <td>
                                <button onClick={() => updateProduct(product._id)}>
                                    Edit
                                </button>
                                <button onClick={() => removeProduct(product._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>}

        </Fragment>


    )
}

export default ProductTable
