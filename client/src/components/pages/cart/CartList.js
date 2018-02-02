import React from 'react'
import CartCard from './CartCard';
import Button from 'material-ui/Button'
import {Link} from 'react-router-dom'

const totalItems = (products) => products.reduce((sum, product) => sum + product.price, 0)

const uniquifyItems = (products) => {
    const uniquifyFlags = products.map(product => product._id).map((id, indx) => indx === products.map(product => product._id).indexOf(id) ? true : false)
    return products.filter((product,idx) => uniquifyFlags[idx] === true)
}

const calcQuantity = (uniqueItems, allItems) => uniqueItems.map(uniqItem => allItems.reduce((sum, item) => (item._id === uniqItem._id) ? sum + 1 : sum + 0, 0))

const addQuantities = (items, quantities) => items.map((item,idx) => ({...item, 'quantity': quantities[idx]}))


const CartList = ({domainData}) => {
    const uniqueProducts = uniquifyItems(domainData.cart)
    const quantities = calcQuantity(uniqueProducts, domainData.cart)
    const loadedItems = addQuantities(uniqueProducts, quantities)
    const total = totalItems(domainData.cart)
    console.log('TOTAL',total)
    return(
        <div>
        {
            domainData.cart.length > 0 ?
            loadedItems.map((product, _id) => <CartCard key={_id} product={product} 
                                                    addToCart={() => domainData.addToCart(product)}
                                                    removeFromCart={() => domainData.removeFromCart(product)}
                                                    quantities={quantities} 
                                                    />)
            : <h1>Cart is empty!</h1>
        }
        <div>
            {
                domainData.cart.length > 0 ?
                <div>
                    <h1>Total: {total}</h1>
                    <Button raised onClick={() => domainData.submitOrder(total)}><Link to='/orders'>Checkout</Link></Button>
                </div>
                : null
            }
        </div>
        </div>
    )
}
    

export default CartList