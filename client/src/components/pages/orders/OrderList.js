import React from 'react'
import OrderCard from './OrderCard'


const OrderList = ({ domainData }) => {
    domainData.getUserOrders(domainData.user)
    return(
    <div>
        {
            domainData.loggedIn ?
            domainData.user.orders.map((order, _id) => <OrderCard key={_id} order={order}/>)
            : <h1>Please log in to view your orders.</h1>
        }
    </div>
    )
} 

export default OrderList