import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'

function PlaceOrderScreen() {

  const orderCreate = useSelector(state => state.orderCreate)
  const { order, error, success } = orderCreate
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector(state => state.cart)

  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
  cart.shippingPrice = (cart.itemsPrice > 1000 ? 0 : 10).toFixed(2)
  // console.log(JSON.stringify(cart))
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice)).toFixed(2)

  if(!cart.paymentMethod){
    navigate('/payment')
  }

  useEffect(() => {
    if(success){
      navigate(`/order/${order._id}`)
    }
  }, [success, navigate])

  const placeOrder = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      totalPrice: cart.totalPrice,
    }))
  }

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Shipping: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},
                {'           '}
                {cart.shippingAddress.postCode}, {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment method:</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items :</h2>
              {cart.cartItems.length === 0 ? <Message variant='info'>Your cart is empty</Message> :(
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2} >
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                        </Col>

                      </Row>
                    </ListGroup.Item>
                  ))}

                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order summary</h2>
              </ListGroup.Item>
              
              <ListGroup.Item>
                <Row>
                  <Col>Item:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total price:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Button 
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems ===0}
                  onClick={placeOrder}
                  >
                    Place order
                  </Button>
                </Row>
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PlaceOrderScreen
