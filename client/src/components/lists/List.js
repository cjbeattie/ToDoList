import AddTask from './AddTask'
import Task from './Task'

const List = (props) => {
    return (
        <>
            {/* <h2>I am a list component</h2>
            <h3>List id: {props.id}</h3> */}
            <h3>{props.list.category.name}</h3>
            {props.list.tasks.map((task) => (
                <Task
                    // key??????
                    task={task}
                    handleCheckboxClick={props.handleCheckboxClick}
                // parentListID={props.id}
                />
            ))}
            <AddTask list={props.list} />
        </>
    )
}

export default List;