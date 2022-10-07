import React, { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/nav.css'
import Cart from './Cart';



const MyNavBar = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  

    const navigate = useNavigate()

    const logout = () => {
        localStorage.setItem("token", "")
        navigate('/login')
    }

    return (
        <div>
            <Navbar style={{padding: '1rem'}} bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand to='/' as={Link}>E-COMMERCE</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            <Nav.Link to='/login' as={Link}>LOGIN</Nav.Link>
                            <Nav.Link to='/purchases' as={Link}>PURCHASES</Nav.Link>
                            <Nav.Link onClick={handleShow}>CART</Nav.Link>
                            <Nav.Link onClick={logout}>LOGOUT</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Cart show={show} handleClose={handleClose}/>
        </div >
    );
};

export default MyNavBar;