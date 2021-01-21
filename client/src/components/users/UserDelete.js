import axios from "axios";
import { Button } from 'react-bootstrap';


const UserDelete = ({ id, updateFn }) => {
    const doDelete = () => {
        axios.delete(`/api/users/${id}`).then((response) => {
            console.log("delete", response);
            updateFn();
        })
    }

    return (
        <Button variant="primary" onClick={doDelete}>Delete</Button>
    );
}

export default UserDelete;