import React, { useState, useEffect }  from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate, matchPath, matchRoutes } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProductDetails} from '../actions/productActions'

function ProductScreen() {

  let navigate = useNavigate();

  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product} = productDetails
  let { id } = useParams();

  useEffect(() => {
      dispatch(listProductDetails(id))
  }, [dispatch, matchRoutes])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }
  
  
  return (
    <div>
      <h1>productID</h1>
      <Link to='/' className='btn btn-light my-3'>Go back</Link>

      {
        loading ?
        <Loader />
        : error ?
        <Message variant='danger'>{error}</Message>
        :(
          <Row>
        <Col md={6}>
          {/* <Image src={axios.defaults.baseURL.slice(0, -1) + product.image} alt={product.name} fluid /> */}
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
          
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
            </ListGroup.Item>

            <ListGroup.Item>
              Price : {product.price}
            </ListGroup.Item>
            
            <ListGroup.Item>
              Description : {product.description}
            </ListGroup.Item>

            </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price : </Col>
                  <Col><strong>${product.price}</strong></Col>
                </Row>
              </ListGroup.Item>
              
              <ListGroup.Item>
                <Row>
                  <Col>Status : </Col>
                  <Col>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col>Qty</Col>
                    <Col xs='auto' className='my-1'>
                      <Form.Control 
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        >
                          {
                            [...Array(product.countInStock).keys()].map((x) => (
                              <option key={ x + 1 } value={ x + 1 }>
                                { x + 1 }
                              </option>
                            ))
                          }
                          

                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroupItem>
              )}

              <ListGroup.Item>
                <Button 
                  onClick={addToCartHandler}
                  className='btn-block' 
                  type='button' 
                  disabled={product.countInStock == 0}>
                  Add to cart
                </Button>
              </ListGroup.Item>
              
            </ListGroup>
          </Card>
        </Col>
      </Row>
        )
      }

      
    </div>
  )
}

export default ProductScreen
