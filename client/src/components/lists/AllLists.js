import axios from "axios"
import { useEffect, useState } from 'react';
import List from './List'

// const AllLists = () => {

//     return (
//         <>
//             <h1>This is the homepage with all the lists</h1>
//             <List />
//             <List />
//             <List />
//         </>
//     )
// }

const AllLists = () => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        axios.get('/list').then((response) => {
            setLists(response.data);
            console.log("response.data", response.data)
        })
    }, [lists])

    const updateDelete = (id) => () => {
        setLists(lists.filter(x => x._id !== id))
    }

    return (
        <>
            <h1>This is the homepage with all the lists</h1>
            {lists.map((list) => (
                <h1>List</h1>
                // <List key={list._id} category={list.category} />
            ))}
        </>
    )
}

export default AllLists