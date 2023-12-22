import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

function SearchBox() {

    const [keyword, setKeyword] = useState('')
    
    let navigate = useNavigate()
    let location = useLocation()

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword){
            navigate(`/?keyword=${keyword}`)
        } else {
            navigate(location.pathname)
        }
    }

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control
        type='search'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        className='me-2' 
        placeholder="Search2"
        />
        <Button variant="outline-success" type='submit'>Search</Button>    
        </Form>
  )
}

export default SearchBox
