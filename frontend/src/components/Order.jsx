import axios from 'axios';
import React, { useEffect, useState } from 'react';
import productService from "../service/login/product/productService";
import "../service/login/OrderList.css" ;

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const order = await productService.orderProductList();
                console.log(order); 
                setOrders(order);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            }
        };
        fetchProduct();
    }, []);

    const renderOrderDetails = (order) => {
        return order.oderDetailSet.map(detail => (
            <tr key={detail.id}>
                <td>{order.id}</td>
                <td>{new Date(order.oderDate).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                <td>{order.user.name}</td>
                <td>{order.phoneNumber}</td>
                <td>{order.shippingAddress}</td>
                <td>{detail.product.name}</td>
                <td>{detail.quantity}</td>
                <td>{detail.subtotal}</td>
            </tr>
        ));
    };

    return (
        <div className="order-list-container">
            <h1>Order List</h1>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Order Date</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Total Pay</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map(order => (
                        <React.Fragment key={order.id}>
                            {renderOrderDetails(order)}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderList;
