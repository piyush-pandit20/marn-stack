import React, { useEffect, useState } from 'react'
import { dummyOrders } from "../assets/assets"; 

function MyOrders() {

  const [myOrders, setMyOrders] = useState([]);

  const fetchOrders = async () => {
    setMyOrders(dummyOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className='mt-12 pb-16'>
      <div>
        <p className='text-2xl font-medium md:text-3xl'>
          My Orders
        </p>
      </div>

      {myOrders.map((order, index) => (
        <div key={index} className='my-8 border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl bg-white'>
          
          {/* Header Row */}
          <p className='flex justify-between items-center text-gray-800 mb-4'>
            <span>Order ID:{order._id}</span>
            <span>Payment:{order.paymentType}</span>
            <span>TotalAmount:${order.amount}</span>
          </p>

          {/* Items */}
          {order.items.map((item, item_index) => (
            <div 
              key={item_index} 
              className={`relative bg-white text-gray-800
                ${order.items.length !== item_index + 1 && "border-b border-gray-300"} 
                flex flex-col md:flex-row md:items-center justify-between 
                p-4 w-full`
              }
            >

              {/* Product Info */}
              <div className='flex items-center mb-4 md:mb-0'>
                <div className='p-4 rounded-lg'>
                  <img src={item.product.image[0]} alt="" className='w-16 h-16' />
                </div>
                <div className="ml-4">
                  <h2 className='text-lg font-medium'>{item.product.name}</h2>
                  <p className='text-gray-500'>{item.product.category}</p>
                </div>
              </div>

              {/* Middle Section */}
              <div className="text-md font-medium text-gray-700">
                <p>Quantity: {item.quantity}</p>
                <p>Status: {order.Status}</p>
                <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
              </div>

              {/* Amount */}
              <p className='text-lg font-semibold text-gray-800 mt-3 md:mt-0'>
                Amount: ${item.product.offerPrice * item.quantity}
              </p>

            </div>
          ))}

        </div>
      ))}
    </div>
  )
}

export default MyOrders;
