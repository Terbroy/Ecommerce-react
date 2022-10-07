import React, { useEffect, useState } from 'react';
import { Button, ListGroup, ListGroupItem, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCartThunk, productsCartThunk, purchaseCartThunk } from '../store/slices/cartProducts.slice';

const Cart = ({handleClose, show}) => {

    const [total, setTotal] = useState(0)
    const cart = useSelector(state => state.cart)
    const dispatch =useDispatch()

    useEffect(()=>{
        // cart.products?.reduce((e,i)=>{
            
        //     setTotal(e.price+i.price)
        // })

        const valor = cart.products?.reduce((e,i)=>{
            return e += Number(i.quantity)
        }, 0)

        setTotal(valor)
    },[cart])

    useEffect(() => {
        dispatch(productsCartThunk())
    }, [])

    return (
        <Offcanvas placement={'end'} show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body >
                <ListGroup  style={{height:'70vh', marginBottom:'1rem', overflow:'scroll'}}>
                    {
                        cart.products && cart.products.map(e => (
                            <ListGroup.Item key={e.id}>
                                <small>{e.brand}</small>
                                <br />
                                <Link to={`/products/${e.id}`}>
                                    {e.title}
                                </Link> 
                                <p>{e.productsInCart.quantity}</p>
                                <p>total: ${e.quantity}</p>
                                <Button onClick={()=>dispatch(deleteCartThunk(e.id))}>Delete</Button>
                            </ListGroup.Item>

                        ))
                    }
                </ListGroup>
                <small>Total: </small>
                <p>{total}</p>
                <Button onClick={()=>dispatch(purchaseCartThunk())}>Checkout</Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Cart;