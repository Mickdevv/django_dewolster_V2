import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation, useParams, json } from 'react-router-dom'
import { Form, Row, Col, Button, check } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { USER_UPDATE_RESET } from '../constants/userConstants'

import { getUserDetails, updateUser } from '../actions/userActions'

function UserEditScreen() {

  const userId = useParams()['id']
//   console.log(JSON.stringify(userId))

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userDetails = useSelector(state => state.userDetails)
  const { error, loading, user } = userDetails
  
  const userUpdate = useSelector(state => state.userUpdate)
  const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

  useEffect(() => {
    if(successUpdate){
        dispatch({type: USER_UPDATE_RESET })
        navigate('/admin/userlist')
    } else {
        if (!user.name || user._id !== Number(userId)){
        dispatch(getUserDetails(userId))
        }
        else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
            console.log(JSON.stringify(user))
        }
    }
    
  }, [userId, user, successUpdate, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({_id:user._id, name, email, isAdmin}))
  }
    return (
        <div>
            <Link to='/admin/userlist'>Go Back</Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
                : (
                    <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='mb-3'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            // required
                            type='name' 
                            placeholder='Enter name' 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email' className='mb-3'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                        // required
                        type='email' 
                        placeholder='Enter email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId='isadmin' className='mb-3'>
                        <Form.Label>Admin</Form.Label>
                        <Form.Check 
                            // required
                            type='checkbox' 
                            label='Is Admin'
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}>
                        </Form.Check>
                    </Form.Group>
            
                    <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                )}
            </FormContainer>
        </div>
    )
}

export default UserEditScreen
