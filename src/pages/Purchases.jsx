import React, { useEffect, useState } from 'react';
import { Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { purchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const purchases = useSelector(state => state?.purchases)


    useEffect(() => {
        dispatch(purchasesThunk())
    }, [])

    return (
        <div>
            <h1>My Purchases</h1>
            <ListGroup>
                {
                    purchases.map(e => (
                        <ListGroup.Item key={e?.id}>
                            <Row >
                                <h4>{e.createdAt}</h4>
                                <br />
                                {e?.cart?.products.map(e => (
                                <Col style={{cursor: 'pointer'}} md={6} key={e.id} onClick={()=> navigate(`/products/${e.id}`)}>
                                   <div>
                                    <p>{e.title}</p>
                                    <p>{e.quantity}</p>
                                    <p>${e.price}</p>
                                   </div>
                                </Col>
                                ))}
                            </Row>
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
        </div>
    );
};

export default Purchases;