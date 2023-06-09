import React, { useEffect, useState } from 'react';
import { Button, ListGroup, ListGroupItem, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCartThunk, productsCartThunk, purchaseCartThunk } from '../store/slices/cartProducts.slice';

const Cart = ({ handleClose, show }) => {
  const [total, setTotal] = useState(0);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const valor = cart.reduce((e, i) => {
      return (e += Number(i.product.price * i.quantity));
    }, 0);

    setTotal(valor);
  }, [cart]);

  useEffect(() => {
    dispatch(productsCartThunk());
  }, []);

  return (
    <Offcanvas placement={'end'} show={show} onHide={handleClose} className="cart-container">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup className="cart-list">
          {cart.map((e) => (
            <ListGroup.Item key={e.id} className="cart-item">
              <div className="product-details">
                <div className="product-image">
                  <img src={e.product.images[1].url} alt="Product Thumbnail" />
                </div>
                <div className="product-info">
                  <small>{e.product.brand}</small>
                  <br />
                  <Link to={`/products/${e.productId}`}>{e.product.title}</Link>
                  <p>{e.quantity}</p>
                  <p>total: ${e.product.price * e.quantity}</p>
                  <Button onClick={() => dispatch(deleteCartThunk(e.id))}>Delete</Button>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="total-section">
          <small>Total: </small>
          <p>{total}</p>
          <Button onClick={() => dispatch(purchaseCartThunk())}>Checkout</Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
