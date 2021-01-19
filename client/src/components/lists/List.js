import { useEffect, useState } from 'react';
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

    return (
        <>
            {/* <h2>I am a list component</h2>
            <h3>List id: {props.id}</h3> */}
            <h3>{props.list.category.name}</h3>
            {list.tasks.map((task) => (
                <Task
                    key={task._id}
                    task={task}
                    handleCheckboxClick={props.handleCheckboxClick}
                // parentListID={props.id}
                />
            ))}
            <AddTask list={list} handleAddTask={handleAddTask} />
        </>
    )
}

export default List;