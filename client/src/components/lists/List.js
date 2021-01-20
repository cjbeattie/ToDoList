import { useEffect, useState } from 'react';
import axios from "axios"
import AddTask from './AddTask'
import Task from './Task'
// import DeleteList from './DeleteList'

const List = (props) => {
    const [list, setList] = useState({ tasks: [] });

    useEffect(() => {
        setList(props.list);
    }, [props]);

    const handleAddTask = (res) => {
        console.log("here is the response from the server after adding a task", res)
        // let tempList = [...list] // error: list is not iterable
        let tempTasks = [...list.tasks]

        tempTasks.push(res.data.tasks.pop())
        // console.log("templist is**** ", tempList)
        // tempLists.splice(props.lists.indexOf(), 1, updatedList)
        // list.task = tempTasks;
        // setList(list)
        setList({ ...list, tasks: tempTasks });
        // console.log("list is now ***** ", list);

    }


    const handleCheckboxClick = (e) => {
        // e.preventDefault();

        // let taskText = e.target.parentNode.textContent;

        // console.log("clicked!", taskText);
        // console.log("list is... ", list)
        // console.log("e is ", e)
        // console.log("clicked id is ", e.target.id)


        // // old - didn't stay checked on window refresh
        // let tempList = list
        // tempList.tasks.find(x => x._id === e.target.id).isCompleted = e.target.checked;

        let tempTasks = [...list.tasks]
        tempTasks.find(x => x._id === e.target.id).isCompleted = e.target.checked;
        let updatedList = { ...list, tasks: tempTasks }




        axios
            .put(`/list/${list._id}`, updatedList)
            .then((res) => {
                console.log("response", res);
                // setLists((state) => ({
                //     ...state,
                //     isCompleted: e.target.value,
                // }))
                // setChanged(true);
                setList(updatedList);


            })
            .catch((error) => {
                console.log("error", error);
            });


        // DELETE*************************************
        if (e.target.checked) {
            setTimeout(() => {
                if (e.target.checked) {
                    // let filteredList = list
                    // filteredList.tasks.filter(x => x._id !== e.target.id);

                    console.log("list", list)

                    let tempTasks2 = [...list.tasks]
                    tempTasks2 = tempTasks2.filter(x => x._id !== e.target.id)
                    console.log("tempTasks2", tempTasks2)
                    console.log("e.target.id", e.target.id)
                    let updatedList2 = { ...list, tasks: tempTasks2 }



                    axios
                        .put(`/list/${list._id}`, updatedList2)
                        .then((res) => {
                            console.log("response", res);
                            // setLists((state) => ({
                            //     ...state,
                            //     isCompleted: e.target.value,
                            // }))
                            // setChanged(true);
                            setList({ ...list, tasks: tempTasks2 });


                        })
                        .catch((error) => {
                            console.log("error", error);
                        });
                }
            }, 1000)
        }
    }

    return (
        <>
            {/* <h2>I am a list component</h2>
            <h3>List id: {props.id}</h3> */}
            <h3>{props.list.category.name}</h3>
            {/* <DeleteList id={list._id} updateFn={updateDelete(list._id)} /> */}
            <br />
            {list.tasks.map((task) => (
                <Task
                    key={task._id}
                    task={task}
                    handleCheckboxClick={handleCheckboxClick}
                // parentListID={props.id}
                />
            ))}
            <AddTask list={list} handleAddTask={handleAddTask} />
        </>
    )
}

export default List;