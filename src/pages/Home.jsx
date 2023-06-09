import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slices';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Accordion, CardGroup, Col, Row, Card } from 'react-bootstrap';
import { addCartThunk, updateCartThunk } from '../store/slices/cartProducts.slice';
import '../styles/home.css'

const Home = () => {
    const [categories, setCategories] = useState([])
    const [filtered, setFiltered] = useState([])
    const [search, setSearch] = useState('')
    const productsList = useSelector(state => state.products)
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getProductsThunk())
        axios
            .get('https://e-commerce-api-v2.academlo.tech/api/v1/categories/')
            .then(res => setCategories(res.data))
    }, [])


    const buyProduct = (id) => {
        let productSelected = cart.filter(e => e.productId === id)
        if(productSelected.length>0){
            let totalQuantity= 1 + productSelected[0].quantity
            const updateProduct = {
                quantity : totalQuantity
            }
            dispatch(updateCartThunk(productSelected[0].id, updateProduct))
        }else{
            const addProduct = {
                quantity: 1,
                productId: id
            }
            dispatch(addCartThunk(addProduct))
        }
    }

    useEffect(() => {
        setFiltered(productsList)
    }, [productsList])

    const filterCategory = (category) => {
        const filter = productsList.filter(e => e.category.name === category)
        setFiltered(filter)
    }

    const searchProducts = () => {
        const filter = productsList.filter(e => e.title.toLowerCase().includes(search.toLowerCase()))
        setFiltered(filter)
    }
    const allProducts = () => {
        setFiltered(productsList)
    }

    return (
        <div>
            <Row >
                <Col lg={2}>
                    <Accordion>
                        <Accordion.Item eventKey="0" >
                            <Accordion.Header  >Categories</Accordion.Header>
                            {
                                categories.map(e => (
                                    <Accordion.Body style={{ cursor: 'pointer' }} key={e.name} onClick={() => filterCategory(e.name)}>{e.name}</Accordion.Body>
                                ))
                            }
                            <Accordion.Body onClick={allProducts}>All</Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <Form.Control
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="What are you looking for?"
                            aria-label="What are you looking for?"
                            aria-describedby="basic-addon2"
                        />
                        <Button onClick={searchProducts} variant="light">
                            Button
                        </Button>
                    </InputGroup>
                    <Row xs={1} md={2} className="g-4">
                        {filtered.map(e => (
                            <Col className='col' key={e.id} >
                                <Card style={{ backgroundColor: '#fff' }} className='card'>
                                    <Card.Img className='card-img' onClick={() => navigate(`/products/${e.id}/`)} variant="top" src={e.images[0].url} />
                                    <Card.Body>
                                        <Card.Title
                                            style={{ color: 'black' }} >{e.title}
                                        </Card.Title>
                                        <Card.Text>
                                            <small>
                                                Price: {e.price}
                                            </small>
                                        </Card.Text>
                                        <Button
                                            onClick={() => buyProduct(e.id)}>
                                            Add to Cart
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>

            </Row>
        </div>
    );
};

export default Home;