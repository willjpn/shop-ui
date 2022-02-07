import {useDispatch, useSelector} from "react-redux";
import {Fragment, useEffect, useState} from "react";
import Header from "./Header";
import {removeFromBasket} from "../actions/basketActions";

const BasketPage = ({history}) => {

    const dispatch = useDispatch()

    const basketState = useSelector(state => state.basket)
    const {basket} = basketState

    const [total, setTotal] = useState()

    useEffect(() => {
        if (basket.length) {
            let totalPrice = 0
            for (let item of basket) {
                totalPrice += item.quantity * item.product.price
            }
            setTotal(totalPrice)
        }
    }, [basket])

    const deleteFromBasket = (id) => {
        dispatch(removeFromBasket(id))
    }


    const checkout = (e) => {
        e.preventDefault()
        history.push('/checkout/shipping')
    }

    return (
        <Fragment>
            <Header />
            <h2>Basket</h2>
            {basket.length ? <Fragment>
                {basket.map(item => {
                    return (
                        <div key={item.product._id}>
                            <span>{item.product.name} x {item.quantity}
                                <button
                                    onClick={() => deleteFromBasket(item.product._id)}
                                >
                                    REMOVE FROM BASKET</button></span>
                        </div>
                    )
                })}
                <h2>TOTAL: £{total}</h2>
                <button onClick={e => checkout(e)}>Proceed To Checkout</button>
            </Fragment> : <h2>Basket is currently empty</h2>}

        </Fragment>
    )
}

export default BasketPage
