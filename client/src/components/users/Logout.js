import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

const Logout = (props) => {
    const [ok, setOk] = useState(false);

    useEffect(() => {
        axios.delete("/api/sessions").then((response) => {
            setOk(true);
            props.handleLogout();
        })
    }, [])

    if (ok) {
        return (
            <>
                <br />
                <p>You have been logged out</p>
            </>)
    }

    return (
        <>
            <br />
            <p>Logging out</p>;
        </>
    )
}

export default Logout;