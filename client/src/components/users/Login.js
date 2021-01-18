import axios from 'axios';
import { useState } from 'react';
import { useForm } from  'react-hook-form';
import { Redirect } from 'react-router-dom';

const OK = 'Ok';

const Login = () => {
    const { errors, register, handleSubmit } = useForm();
    const [loginStatus, setLoginStatus] = useState('');

    const onSubmit = data => {
        axios.post('/sessions', data).then((response) => {
            setLoginStatus(OK);
            console.log("response", response)
        }).catch((error) => {
            setLoginStatus(error.message);
        })
    }

    if (loginStatus === OK) {
        return <Redirect to="/list" />
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <h1>Login</h1>
                    <label htmlFor='username'>Username: </label>
                    <input name='username' id='username' required ref={register} />
                    { errors.username && 'Username is required' }
                    <br />
                    <label htmlFor='password'>Password: </label>
                    <input name='password' id='password' required ref={register} />
                    { errors.password && "Password is required" }
                    <br />
                </fieldset>
                <fieldset>
                    <input type="submit" value="Login" />
                    { loginStatus }
                </fieldset>
            </form>
        </>
    )
}

export default Login