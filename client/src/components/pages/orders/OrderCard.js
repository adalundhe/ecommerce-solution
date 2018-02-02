import React from 'react'


const OrderCard = ({ order }) =>
    <div>
        <h1>Order:</h1>
        <h3>Total: {order.total}</h3>
        <h3>Created: {order.created}</h3>
    </div>

export default OrderCard