import axios from 'axios';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom"

const OK = 'Ok';

const Login = (props) => {
    const { errors, register, handleSubmit, control } = useForm();
    const [loginStatus, setLoginStatus] = useState('');

    if (loginStatus === OK) {
        return <Redirect to="/list" />
    }

    const onSubmit = data => {
        axios.post('/api/sessions', data).then((response) => {
            setLoginStatus(OK);
            console.log("response", response)
            props.handleLogin();
        }).catch((error) => {
            setLoginStatus(error.message);
        })
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card style={{ width: '18rem' }} className="text-left mt-3">
                <Card.Header as="h5">Login</Card.Header>
                <Card.Body variant="flush" classname="mb-3">

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Controller
                                name="username"
                                control={control}
                                as={<Form.Control
                                    name="username"
                                    id="username"
                                    type="text"
                                    placeholder="Enter Username"
                                    required ref={register}
                                />}
                            />

                            <Form.Text className="text-muted">
                                {errors.username && 'Username is required'}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Controller
                                name="password"
                                control={control}
                                as={<Form.Control
                                    name="password"
                                    id="password"
                                    type="password"
                                    placeholder="Enter Password"
                                    required ref={register}
                                />}
                            />

                            <Form.Text className="text-muted">
                                {errors.password && "Password is required"}
                            </Form.Text>
                        </Form.Group>

                        <Button variant="outline-secondary" type="submit" value="Login">
                            Login
                        </Button>
                        <br />
                        <br />
                        <Form.Text className="text-muted">
                            {loginStatus}
                        </Form.Text>
                        <Form.Text className="text-muted">
                            Don't have an account? Please <Link to={`/signup`} activeClassName="active">Sign Up</Link>
                        </Form.Text>
                    </Form>




                    {/* <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset>

                            <label htmlFor='username'>Username: </label>
                            <input name='username' id='username' required ref={register} />
                            {errors.username && 'Username is required'}
                            <br />
                            <label htmlFor='password'>Password: </label>
                            <input type="password" name='password' id='password' required ref={register} />
                            {errors.password && "Password is required"}
                            <br />
                        </fieldset>
                        <br />
                        <fieldset>
                            <input type="submit" value="Login" />
                            {loginStatus}
                        </fieldset>
                        <Link to="/signup">SignUp</Link>
                    </form> */}
                </Card.Body>

            </Card>
        </div>
    )
}

export default Login