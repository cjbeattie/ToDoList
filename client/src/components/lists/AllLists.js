import axios from "axios"
import { useEffect, useState } from 'react';
import List from './List'


const AllLists = () => {
    const [lists, setLists] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('/list').then((response) => {
            setLists(response.data);
            console.log("lists response.data", response.data);
        })

        axios.get('/category').then((response) => {
            setCategories(response.data);
            console.log("categories response.data", response.data);
        })
    }, [])

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
                // categoryName={categories.filter(x => x._id === list.category).name}
                />
            ))}
        </>
    )
}

export default AllLists