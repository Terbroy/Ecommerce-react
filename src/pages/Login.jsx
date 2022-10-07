import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isLoading } from '../store/slices/loading.slice';

const Login = () => {


    const { register, handleSubmit } = useForm()

    const navigate = useNavigate()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(isLoading(false))
    }, [])

    const submit = data => {
        dispatch(isLoading(true))
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data)
            .then(res =>{ 
                console.log(res.data.data.token)
                localStorage.setItem("token", res.data.data.token)
                navigate("/")
            })
            .catch(error => {
                if (error.response.status === 404) {
                    alert(error.response.data.message)
                }
            })
            .finally(()=> dispatch(isLoading(false)))
    }


    return (
        <div style={{maxWidth: '500px', margin: '0 auto'}}>
            <h1>LOGIN</h1>
            <Form onSubmit={handleSubmit(submit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control {...register('email')} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control {...register('password')} type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="outline-dark" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Login;