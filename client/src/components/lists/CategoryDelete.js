import axios from "axios";
import { Button } from 'react-bootstrap';


const CategoryDelete = ({ id, updateFn }) => {
    const doDelete = () => {
        axios.delete(`/api/category/${id}`).then((response) => {
            console.log("delete", response);
            updateFn();
        })
    }

    return (
        <Button variant="primary" onClick={doDelete}>Delete</Button>
    );
}

export default CategoryDelete;