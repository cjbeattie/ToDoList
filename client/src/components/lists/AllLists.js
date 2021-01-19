import axios from "axios"
import { useEffect, useState } from 'react';
import List from './List'


const AllLists = () => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        axios.get('/list').then((response) => {
            setLists(response.data);
            console.log("lists response.data", response.data);
        })
    }, [])

    const handleCheckboxClick = (e, list) => {
        // e.preventDefault();

        // let taskText = e.target.parentNode.textContent;

        // console.log("clicked!", taskText);
        // console.log("list is... ", list)
        // console.log("e is ", e)
        // console.log("clicked id is ", e.target.id)

        let tempList = list
        tempList.tasks.find(x => x._id === e.target.id).isCompleted = e.target.checked;



        axios
            .put(`/list/${list._id}`, tempList)
            .then((res) => {
                console.log("response", res);
                // setLists((state) => ({
                //     ...state,
                //     isCompleted: e.target.value,
                // }))
                // setChanged(true);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }



    // const updateDelete = (id) => () => {
    //     setLists(lists.filter(x => x._id !== id))
    // }

    return (
        <>
            <h1>This is the homepage with all the lists</h1>
            {lists.map((list) => (
                <List
                    key={list._id}
                    list={list}
                    // tasks={list.tasks}
                    // lists={lists}
                    // id={list._id}
                    // category={list.category.name}
                    // tasks={list.tasks}
                    handleCheckboxClick={(e) => handleCheckboxClick(e, list)}
                />
            ))}
        </>
    )
}

export default AllLists