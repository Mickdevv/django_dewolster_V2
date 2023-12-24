import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useNavigate } from 'react-router-dom'

import { listOrders } from '../actions/orderActions'


function OrderListScreen() {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList
    
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        } else {
            navigate('/login')
        }

    }, [dispatch, navigate])

  return (
    <div>
      <h1>Order List</h1>
      {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Table striped responsive bordered hover className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Date</th>
                <th>Total price</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>{order.isPaid ? (
                    <Message variant='success'>Paid on {order.paidAt.substring(0, 19)}</Message>
                  ) : 
                  <i className='fas fa-x' style={{color:'red'}}></i>
                  }</td>
                  <td>{order.isDelivered ? (
                    <Message variant='success'>Delivered on {order.deliveredAt.substring(0, 19)}</Message>
                  ) : 
                  <i className='fas fa-x' style={{color:'red'}}></i>
                  }</td>
                  <td>
                    <LinkContainer to={`/orders/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
    </div>
  )
}

export default OrderListScreen
