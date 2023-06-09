import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addCartThunk, updateCartThunk } from '../store/slices/cartProducts.slice';
import { getProductsThunk } from '../store/slices/products.slices';
import '../styles/home.css'


const ProductDetail = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)
    const cart = useSelector(state => state.cart)
    const { id } = useParams()
    const navigate = useNavigate()
    const [count, setCount] = useState(1)
    const product = products.find(e => e.id === Number(id))
    const relatedProducts = products.filter(e => e.category.id === product.category.id)

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])
    
    const buyProduct = (id, quantity) => {
        
        let productSelected = cart.filter(e => e.productId === id)
        if(productSelected.length>0){
            let totalQuantity= quantity + productSelected[0].quantity
            const updateProduct = {
                quantity : totalQuantity
            }
            dispatch(updateCartThunk(productSelected[0].id, updateProduct))
        }else{
            const addProduct = {
                quantity: quantity,
                productId: id
            }
            dispatch(addCartThunk(addProduct))
        }
    }

    useEffect(() => {
        setCount(5)
    }, [id])

    return (
        <>
        
            <Carousel className="mb-3" style={{ padding: '1rem', backgroundColor: '#fff' }}>
                <Carousel.Item>
                    <img
                        className="d-block "
                        src={product.images[0].url}

                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block "
                        src={product.images[1].url}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block "
                        src={product.images[2].url}
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
            <Row className="mb-5">
                <Col className='info'>
                    <h1 className='title'>{product?.title}</h1>
                    <p className='description'>{product.description}</p>
                    <p>price: {product.price}</p>
                    <p>Quantity</p>
                    <Button
                        onClick={() => setCount(count - 1)}>-</Button>
                        <p className='count'>
                            {count}
                        </p>
                    <Button onClick={() => setCount(count + 1)}>+</Button>
                    <Button onClick={() => buyProduct(product.id, count)}>Add to Cart</Button>
                </Col>
            </Row>
            <ListGroup variant="flush">
                <p>Discover similar items</p>
                <Row xs={1} md={2} className="g-4">
                    {
                        relatedProducts.map(e => (
                            <Col className='col' key={e?.title} >
                                <Card style={{ backgroundColor: '#fff' }} className='card'>
                                    <Card.Img className='card-img' onClick={() => navigate(`/products/${e.id}`)} variant="top" src={e.images[0].url} />
                                    <Card.Body>
                                        <Card.Title style={{ color: 'black' }} >{e.title}</Card.Title>
                                        <Card.Text>
                                            <small>Price: {e.price}</small>
                                        </Card.Text>
                                        <Button onClick={() => buyProduct(e.id, 1)}>Add to Cart</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </ListGroup>
        </>
    );
};

export default ProductDetail;