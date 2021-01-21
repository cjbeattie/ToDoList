import { useEffect, useState } from 'react';
import axios from "axios"
import AddTask from './AddTask'
import Task from './Task'
// import DeleteList from './DeleteList'

const List = (props) => {
    const [list, setList] = useState({ tasks: [] });

    useEffect(() => {
        setList(props.list);
        console.log("setList called, here is props.list", props.list)

        if (list.tasks !== undefined && list.tasks.length !== 0) {
            let tempTasks = [...list.tasks]
            tempTasks = tempTasks.filter(x => !x.isCompleted)
            let updatedList = { ...list, tasks: tempTasks }
            console.log("made it to the part where we delete on load, this is updatedList", updatedList)

            axios
                .put(`/api/list/${list._id}`, updatedList)
                .then((res) => {
                    console.log("response", res);
                    setList({ ...list, tasks: tempTasks });
                })
                .catch((error) => {
                    console.log("error", error);
                });
        }
    }, [props]);

    const handleAddTask = (res) => {
        console.log("here is the response from the server after adding a task", res)
        let tempTasks = [...list.tasks]
        tempTasks.push(res.data.tasks.pop())
        setList({ ...list, tasks: tempTasks });
    }

    const handleEditTask = (text, taskID) => {
        let tempTasks = [...list.tasks]
        tempTasks.find(x => x._id === taskID).description = text;
        let updatedList = { ...list, tasks: tempTasks }

        // Update description
        axios
            .put(`/api/list/${list._id}`, updatedList)
            .then((res) => {
                console.log("response", res);
                setList(updatedList);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }


    const handleCheckboxClick = (e) => {
        // e.preventDefault();

        let tempTasks = [...list.tasks]
        tempTasks.find(x => x._id === e.target.id).isCompleted = e.target.checked;
        let updatedList = { ...list, tasks: tempTasks }

        // Update isCompleted
        axios
            .put(`/api/list/${list._id}`, updatedList)
            .then((res) => {
                console.log("response", res);
                setList(updatedList);
            })
            .catch((error) => {
                console.log("error", error);
            });


        // Delete after 1 second if the task was checked
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
                        .put(`/api/list/${list._id}`, updatedList2)
                        .then((res) => {
                            console.log("response", res);
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
            <h3>{props.list.category.name}</h3>
            {/* <DeleteList id={list._id} updateFn={updateDelete(list._id)} /> */}
            <br />
            {list.tasks.map((task) => (
                <Task
                    key={task._id}
                    task={task}
                    handleCheckboxClick={handleCheckboxClick}
                    handleEditTask={handleEditTask}
                />
            ))}
            <AddTask list={list} handleAddTask={handleAddTask} />
        </>
    )
}

export default List;