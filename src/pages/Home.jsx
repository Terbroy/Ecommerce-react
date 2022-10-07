import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slices';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Accordion, CardGroup, Col, Row, Card } from 'react-bootstrap';
import { addCartThunk } from '../store/slices/cartProducts.slice';
import '../styles/home.css'

const Home = () => {
    const [categories, setCategories] = useState([])
    const [filtered, setFiltered] = useState([])
    const [search, setSearch] = useState('')
    const productsList = useSelector(state => state.products)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(getProductsThunk())
        axios
            .get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories))
    }, [])

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

    const addProduct = (id) => {

        const addProduct = {
            id: id,
            quantity: 1
        }

        dispatch(addCartThunk(addProduct))
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
                        ))}
                    </Row>
                </Col>

            </Row>
        </div>
    );
};

export default Home;