import axios from "axios"
import { useEffect, useState } from 'react';
import List from './List'
// import DeleteList from './DeleteList'
import { CardDeck } from "react-bootstrap";



const AllLists = () => {
    const [lists, setLists] = useState([]);
    // const [id, setID] = useState([]);

    useEffect(() => {
        // axios.get('/api/list').then((response) => {
        //     setLists(response.data);
        //     console.log("lists response.data", response.data);
        // })

        axios
            .get(`/api/sessions/`)
            .then((res) => {
                if (res.data.currentUser) {
                    console.log("SESSIONS RESPONSE ID", res.data.currentUser._id)
                    // setId(res.data.currentUser._id)

                    axios.get(`/api/users/${res.data.currentUser._id}`)
                        .then((response) => {
                            // setUser({
                            //     _id: response.data._id,
                            //     username: response.data.username,
                            //     password: response.data.password,
                            //     isAdmin: response.data.isAdmin,
                            //     lists: response.data.lists,
                            // });
                            setLists(response.data.lists);
                        });
                }

            });


    }, [])


    const updateDelete = () => {
        axios.get('/api/list').then((response) => {
            setLists(response.data);
            console.log("response", response)
        })
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'left' }}>
            <CardDeck className="mt-3">
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
        </div >
    )
}

export default AllLists