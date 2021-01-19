
const Task = (props) => {


    return (
        <>

            <label for="isCompleted">
                <input
                    type="checkbox"
                    id={props.task._id}
                    name="isCompleted"
                    value={props.task.isCompleted}
                    onClick={(e) => props.handleCheckboxClick(e)}
                />{props.task.description}</label>
            <br />
        </>)
}

export default Task;