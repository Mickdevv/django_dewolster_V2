import React, { useState, useEffect }  from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate, matchPath, matchRoutes } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProductDetails, createProductReview} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

function ProductScreen() {

  let navigate = useNavigate();

  const [qty, setQty] = useState(1)

  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product} = productDetails

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const { loading: loadingProductReview, error: errorProductReview, success: successProductReview} = productReviewCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  let { id } = useParams();

  useEffect(() => {
    if(successProductReview){
      setRating(0)
      setComment('')
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
    }
      dispatch(listProductDetails(id))
  }, [dispatch, matchRoutes, successProductReview, userInfo])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    console.log('Review submitted')
    e.preventDefault()
    dispatch(createProductReview(
      id, 
      {
        rating,
        comment
      }

    ))
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
          <div>
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
      <Row>
        <Col md={6}>
          <h4>Reviews</h4>
          {product.reviews.length === 0 && <Message variant='info'>No reviews</Message>}

          <ListGroup variant='flush'>
            {product.reviews.map((review) =>(
              <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} color='#f8e825'></Rating>
                  <p>{review.createdAt.substring(0,10)}</p>
                  <p>{review.comment}</p>
              </ListGroup.Item>
            ))}

            <ListGroup.Item>
              <h4>Write a review</h4>
              {loadingProductReview && <Loader />}
              {successProductReview && <Message variant='success'>Review submitted</Message>}
              {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

              {userInfo ? (
                <Form
                onSubmit={submitHandler}>
                  <Form.Group controlId='rating'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control 
                    as='select'
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}>
                      <option value=''>Select...</option>
                      <option value='1'>1 - Poor</option>
                      <option value='2'>2 - Fair</option>
                      <option value='3'>3 - Good</option>
                      <option value='4'>4 - Very Good</option>
                      <option value='5'>5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='comment'>
                    <Form.Label>Review</Form.Label>
                    <Form.Control 
                    as='textarea'
                    rows='5'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}>
                    </Form.Control>
                    <Button 
                    variant='primary' 
                    type='submit'
                    disabled={loadingProductReview}>Submit</Button>
                  </Form.Group>
                </Form>
              ) : (
                <Message variant='info'>Please <Link to='/login'>log in</Link> to write a review</Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      </div>
        )
      }

      
    </div>
  )
}

export default ProductScreen
