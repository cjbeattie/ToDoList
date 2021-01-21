import axios from "axios"
import { useEffect, useState } from 'react';
import List from './List'
// import DeleteList from './DeleteList'
import { CardDeck } from "react-bootstrap";



const AllLists = () => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        axios.get('/api/list').then((response) => {
            setLists(response.data);
            console.log("lists response.data", response.data);
        })


    }, [])


    const updateDelete = () => {
        axios.get('/api/list').then((response) => {
            setLists(response.data);
            console.log("response", response)
        })
    }

    return (
        <CardDeck>
            {lists.map((list) => (
                <>
                    <List
                        key={list._id}
                        list={list}
                        updateDelete={updateDelete}
                    // tasks={list.tasks}
                    // lists={lists}
                    // id={list._id}
                    // category={list.category.name}
                    // tasks={list.tasks}
                    // handleCheckboxClick={(e) => handleCheckboxClick(e, list)}
                    />
                    {/* <DeleteList id={list._id} updateFn={updateDelete} /> */}
                </>
            ))}
        </CardDeck>
    )
}

export default AllLists