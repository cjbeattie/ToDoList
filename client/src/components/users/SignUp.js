import { useState } from "react";
import axios from "axios"
import { Redirect } from "react-router-dom";

const SignUp = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("/users", formData).then((res) => {
            console.log("response", res)
            setCreated(true);
        }).catch((error) => {
            console.log("error", error)
        })
        // console.log("event", e);
    }

    const [formData, setFormData] =
        useState({ username: "", password: "", isAdmin: false });

    const [created, setCreated] = useState(false);

    if (created) {
        return <Redirect to="/login" />
    }

    return (
        <>
            <h1> SignUp Form</h1>
            <form onSubmit={handleSubmit}>
                Username:
        <input
                    username="username"
                    value={formData.username}
                    onChange={(e) =>
                        setFormData((state) => ({
                            ...state, username: e.target.value
                        }))
                    }
                />
                <br />
    Password:
        <input
                    password="password"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData((state) => ({
                            ...state, password: e.target.value
                        }))
                    }
                />
                <br />

    isAdmin:
    <input type="checkbox" name="isAdmin" value="false" />
                <br />
                <input type="submit" />
            </form>
        </>
    )
}

export default SignUp;