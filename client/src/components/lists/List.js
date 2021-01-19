import { useEffect, useState } from 'react';
import axios from "axios"
import AddTask from './AddTask'
import Task from './Task'

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

    return (
        <>
            {/* <h2>I am a list component</h2>
            <h3>List id: {props.id}</h3> */}
            <h3>{props.list.category.name}</h3>
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