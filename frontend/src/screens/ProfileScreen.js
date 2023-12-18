import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

function ProfileScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
  
    const dispatch = useDispatch()
  
    let location = useLocation()
    let navigate = useNavigate()
  
    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile
  
    useEffect(() => {
      if(!userInfo){
          navigate('/login')
      } else {
        if(!user || !user.name || success){
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(getUserDetails('profile'))
        } else {
            setName(user.name)
            setEmail(user.email)
        }
      }
    }, [dispatch, userInfo, navigate, user, success])
  
    const submitHandler = (e) => {
      e.preventDefault()
      if(password != confirmPassword){
          setMessage("Passwords do not match")
      } else {
          console.log(JSON.stringify(user))
          dispatch(updateUserProfile({
            'id': user._id,
            'name': name,
            'email': email,
            'password': password,
          }))
          setMessage("")
      }
    }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
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
          
          <Form.Group controlId='password' className='pb-1'>
              <Form.Label>Password</Form.Label>
              <Form.Control 
              type='password' 
              placeholder='Enter Password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}>
              </Form.Control>
          </Form.Group>
  
          <Form.Group controlId='passwordConfirm' className='pb-3'>
              <Form.Control 
              type='password' 
              placeholder='Confirm Password' 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}>
              </Form.Control>
          </Form.Group>
  
          <Button type='submit' variant='primary'>Update Profile</Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen
