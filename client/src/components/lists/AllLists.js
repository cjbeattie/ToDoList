import axios from "axios"
import { useEffect, useState } from 'react';
import List from './List'
import DeleteList from './DeleteList'


const AllLists = () => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        axios.get('/list').then((response) => {
            setLists(response.data);
            console.log("lists response.data", response.data);
        })


    }, [])


    const updateDelete = (id) => () => {
        setLists(lists.filter(x => x._id !== id))
    }

    return (
        <>
            {lists.map((list) => (
                <>
                    <List
                        key={list._id}
                        list={list}
                    // tasks={list.tasks}
                    // lists={lists}
                    // id={list._id}
                    // category={list.category.name}
                    // tasks={list.tasks}
                    // handleCheckboxClick={(e) => handleCheckboxClick(e, list)}
                    />
                    <DeleteList id={list._id} updateFn={updateDelete(list._id)} />
                </>
            ))}
        </>
    )
}

export default AllLists