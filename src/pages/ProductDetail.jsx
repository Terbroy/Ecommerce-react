import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addCartThunk } from '../store/slices/cartProducts.slice';
import { getProductsThunk } from '../store/slices/products.slices';
import '../styles/home.css'


const ProductDetail = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])
    const products = useSelector(state => state.products)
    const { id } = useParams()
    const [count, setCount] = useState(5)

    const product = products.find(e => e.id === Number(id))
    const relatedProducts = products.filter(e => e.category.id === product.category.id)


    const buyProduct = () => {
        const addProduct = {
            id: id,
            quantity: count
        }

        dispatch(addCartThunk(addProduct))
    }

    useEffect(() => {
       setCount(5)
    }, [id])

    return (
        <>
        <Row className="mb-5">
            <Col>
                <h1>{product?.title}</h1>
                <p>PRODUCTO {id}</p>
            <Button
            onClick={()=>setCount(count-1)}>-</Button>
            {count}
            <Button onClick={()=>setCount(count+1)}>+</Button>
            <Button onClick={buyProduct}>Add to Cart</Button>
            </Col>
        </Row>
            <ListGroup variant="flush">
                <p>Discover similar items</p>
                <Row xs={1} md={2} className="g-4">
                    {
                        relatedProducts.map(e => (
                            <Col className='col'  key={e?.title} >
                                <Card style={{ backgroundColor: '#fff' }} className='card'>
                                    <Card.Img className='card-img' onClick={() => navigate(`/products/${e.id}`)} variant="top" src={e.productImgs[0]} />
                                    <Card.Body>
                                        <Card.Title style={{ color: 'black' }} >{e.title}</Card.Title>
                                        <Card.Text>
                                            <small>Price: {e.price}</small>
                                        </Card.Text>
                                        <Button onClick={() => addProduct(e.id)}>Add to Cart</Button>
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