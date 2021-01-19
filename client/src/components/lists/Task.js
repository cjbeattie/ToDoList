
const Task = (props) => {


    return (
        <>

            <label htmlFor="isCompleted" key={props.task._id}>
                <input
                    type="checkbox"
                    id={props.task._id}
                    name="isCompleted"
                    value={props.task.isCompleted}
                    checked={props.task.isCompleted}
                    onChange={(e) => props.handleCheckboxClick(e)}
                />{props.task.description}</label>
            <br />
        </>)
}

export default Task;