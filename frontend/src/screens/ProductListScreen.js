import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useNavigate } from 'react-router-dom'

import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'


function ProductListScreen() {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate
    
    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        if(!userInfo.isAdmin){
            navigate('/login')
        } 
        if (successCreate) {
            console.log(JSON.stringify(createdProduct))
            navigate(`/admin/products/${createdProduct._id}/edit`)
        }else {
            dispatch(listProducts())
        }
        
        
    }, [dispatch, navigate, userInfo, successDelete, successCreate])

    const deleteProductHandler = (id) => {
        console.log('Delete product')
        if (window.confirm('Are you sure you want to delete this product?')){
            dispatch(deleteProduct(id))
            // console.log('Delete product')
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

  return (
    <div>
        <Row className='alin-items-center'>
            <Col><h1>Products</h1></Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'> Create product</i>
                </Button>
            </Col>
        </Row>

        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      <h1>Product List</h1>
      {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Table striped responsive bordered hover className='table-sm'>
            <thead>
              <tr>
                <th className='alin-items-center'>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Stock</th>
                <th>Review</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td className='alin-items-center'>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>{product.countInStock > 0 ? (
                    product.countInStock
                  ) : 
                  <i className='fas fa-x' style={{color:'red'}}></i>
                  }</td>
                  <td>{product.review}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button variant='danger' className='btn-sm' onClick={() => deleteProductHandler(product._id)}>
                        <i className='fas fa-trash'></i>
                      </Button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </Table>
        )}
    </div>
  )
}

export default ProductListScreen
