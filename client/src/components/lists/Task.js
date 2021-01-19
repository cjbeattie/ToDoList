
const Task = (props) => {


    return (
        <>

            <label htmlFor="isCompleted"><input
                type="checkbox"
                id="isCompleted"
                name="isCompleted"
                value={props.task.isCompleted}
                onClick={props.handleCheckboxClick}
            />{props.task.description}</label>
            <br />
        </>)
}

export default Task;