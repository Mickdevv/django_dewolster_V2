import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router-dom'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

function HomeScreen() {

  const location = useLocation()
  let keyword = location.search

  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
    const { error, loading, products, page, pages } = productList

  useEffect(() =>{
      dispatch(listProducts(keyword))

  }, [dispatch, keyword])

  // const products = []w

  return (
    <div>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      { loading ? <Loader />
      : error ? <Message variant='danger'>{error}</Message>
      : 
      <Row>
        {products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
            </Col>
        ))}
      </Row>}
      
        
      {/* <Paginate page={page} pages={pages} keyword={keyword} /> */}
    </div>
  )
}

export default HomeScreen
