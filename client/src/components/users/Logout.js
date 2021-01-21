import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

const Logout = () => {
    const [ok, setOk] = useState(false);

    useEffect(() => {
        axios.delete("/api/sessions").then((response) => {
            setOk(true);
        })
    }, [])

    if (ok) {
        return <h1>Logged out</h1>
    }

    return <p>Logging out</p>;
}

export default Logout;