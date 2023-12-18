import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress, savePaymentMethod } from '../actions/cartActions'


function PaymentScreen() {
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if (!shippingAddress.address) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeOrder')
    }

  return (

    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>
        <Form.Group>
            <Form.Label as='legend' className='mb-3'>Select Method</Form.Label>
            <Col>
                <Form.Check
                type='radio'
                label='PayPal or credit card'
                id='paypal'
                name='paymentMethod'
                checked
                onChange={(e) => {
                    setPaymentMethod(e.target.value)
                }}
                >

                </Form.Check>
            </Col>
        </Form.Group>
        <Button type='submit' variant='primary' className='mt-3'>Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
