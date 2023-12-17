import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

import { register, login } from '../actions/userActions'

function RegisterScreen() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  let location = useLocation()
  let navigate = useNavigate()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userRegister = useSelector(state => state.userRegister)
  const { error, loading, userInfo } = userRegister

  useEffect(() => {
    if(userInfo){
        navigate(redirect)
    }
  }, [userInfo, navigate, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if(password != confirmPassword){
        setMessage("Passwords do not match")
    } else {
        dispatch(register(name, email, password))
    }
  }
    return (
        <FormContainer>
        <h1>Register</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control 
              required
              type='name' 
              placeholder='Enter name' 
              value={name} 
              onChange={(e) => setName(e.target.value)}>
              </Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control 
              required
              type='email' 
              placeholder='Enter email' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}>
              </Form.Control>
          </Form.Group>
          
          <Form.Group controlId='password' className=''>
              <Form.Label>Password</Form.Label>
              <Form.Control 
              required
              type='password' 
              placeholder='Enter Password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}>
              </Form.Control>
          </Form.Group>
  
          <Form.Group controlId='passwordConfirm' className='pb-3'>
              <Form.Control 
              required
              type='password' 
              placeholder='Confirm Password' 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}>
              </Form.Control>
          </Form.Group>
  
          <Button type='submit' variant='primary'>Register</Button>
        </Form>
        <Row className='py-3'>
          <Col>
              Already have an account? <Link
              to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign in</Link> 
          </Col>
        </Row>
      </FormContainer>
  )
}

export default RegisterScreen
