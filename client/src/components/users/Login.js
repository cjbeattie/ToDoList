import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom"

const OK = 'Ok';

const Login = (props) => {
    const { errors, register, handleSubmit } = useForm();
    const [loginStatus, setLoginStatus] = useState('');

    const onSubmit = data => {
        axios.post('/api/sessions', data).then((response) => {
            setLoginStatus(OK);
            console.log("response", response)
            props.handleLogin();
        }).catch((error) => {
            setLoginStatus(error.message);
        })
    }

    if (loginStatus === OK) {
        return <Redirect to="/list" />
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card style={{ width: '18rem' }} className="text-left mt-3">
                <Card.Header as="h5">Login</Card.Header>
                <Card.Body variant="flush" classname="mb-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset>
                            {/* <h1>Login</h1> */}
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
                    </form>
                </Card.Body>

            </Card>
        </div>
    )
}

export default Login