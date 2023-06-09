import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isLoading } from '../store/slices/loading.slice';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isRegisterForm, setIsRegisterForm] = useState(false);

  useEffect(() => {
    dispatch(isLoading(false));
  }, []);

  const toggleForm = () => {
    setIsRegisterForm(!isRegisterForm);
  };

  const submit = (data) => {
    dispatch(isLoading(true));
    const endpoint = isRegisterForm
      ? 'https://e-commerce-api-v2.academlo.tech/api/v1/users'
      : 'https://e-commerce-api-v2.academlo.tech/api/v1/users/login/';

    axios
      .post(endpoint, data)
      .then((res) => {
        if (isRegisterForm) {
          alert('Registration successful!');
          setIsRegisterForm(false);
        } else {
          localStorage.setItem('token', res.data.token);
          navigate('/');
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          alert(error.response.data.message);
        }
      })
      .finally(() => dispatch(isLoading(false)));
  };

  return (
    <div className="login-container">
      <h1>{isRegisterForm ? 'REGISTER' : 'LOGIN'}</h1>
      <Form onSubmit={handleSubmit(submit)}>
        {isRegisterForm && (
          <>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control {...register('firstName')} type="text" placeholder="Enter first name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control {...register('lastName')} type="text" placeholder="Enter last name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control {...register('phone')} type="text" placeholder="Enter phone" />
            </Form.Group>
          </>
        )}

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
          {isRegisterForm ? 'Register' : 'Submit'}
        </Button>
        <Button variant="link" onClick={toggleForm}>
          {isRegisterForm ? 'Back to Login' : 'Register'}
        </Button>
      </Form>
    </div>
  );
};

export default Login;
