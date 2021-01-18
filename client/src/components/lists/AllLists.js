import axios from "axios"
import { useEffect, useState } from 'react';
import List from './List'


const AllLists = () => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        axios.get('/list').then((response) => {
            setLists(response.data);
            // console.log("lists response.data", response.data);
        })
    }, [])

    const handleCheckboxClick = (e) => {
        // e.preventDefault();

        let taskText = e.target.parentNode.textContent;

        console.log("clicked!", taskText);

        // axios
        //     .put(`/lists/${listID}`, formData)
        //     .then((res) => {
        //         console.log("response", res);
        //         setLists((state) => ({
        //             ...state,
        //             isCompleted: e.target.value,
        //         }))
        //         // setChanged(true);
        //     })
        //     .catch((error) => {
        //         console.log("error", error);
        //     });
    }

    const updateDelete = (id) => () => {
        setLists(lists.filter(x => x._id !== id))
    }

    return (
        <>
            <h1>This is the homepage with all the lists</h1>
            {lists.map((list) => (
                <List
                    key={list._id}
                    id={list._id}
                    category={list.category.name}
                    tasks={list.tasks}
                    handleCheckboxClick={handleCheckboxClick}
                />
            ))}
        </>
    )
}

export default AllLists