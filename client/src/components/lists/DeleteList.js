import axios from 'axios';
import { Button } from 'react-bootstrap';

const DeleteList = ({ id, updateFn }) => {
    const doDelete = () => {
        axios.delete(`/api/list/${id}`).then((response) => {
            console.log("delete", response);
            updateFn();
        })
    }

    return (
        <>
            <Button variant="primary" onClick={doDelete}>Delete This List</Button>
        </>
    )
}

export default DeleteList