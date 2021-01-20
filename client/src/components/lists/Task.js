import { useState } from "react";

const Task = (props) => {
    const [editing, setEditing] = useState(false);
    const [textValue, setTextValue] = useState("");

    const handleDoubleClick = (event) => {
        setEditing(true);
        console.log("editing!")

    }

    const handleKeyDown = (event) => {
        if (event.code === "Enter") {
            console.log("Axios!");
            setEditing(false);
        }
    }

    const handleBlur = (event) => {
        setEditing(false);
        console.log("blur!")
    }

    if (editing) {
        // return <input
        //     value={textValue}
        //     onChange={(event) => setTextValue(event.target.value)}
        //     onKeyDown={handleKeyDown}
        // />
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
                        onDoubleClick={handleDoubleClick}
                        onBlur={handleBlur}
                        onFocus={editing ? true : false}
                    />
                    {/* {props.task.description} */}
                    <input
                        value={props.task.description}
                        onChange={(event) => setTextValue(event.target.value)}
                        onKeyDown={handleKeyDown}
                    /></label>
                <br />
            </>)

    }
    // return <span onDoubleClick={handleDoubleClick}>{textValue}</span>


    return (
        <>

            <label htmlFor="isCompleted" key={props.task._id} onDoubleClick={handleDoubleClick}>
                <input
                    type="checkbox"
                    id={props.task._id}
                    name="isCompleted"
                    value={props.task.isCompleted}
                    checked={props.task.isCompleted}
                    onChange={(e) => props.handleCheckboxClick(e)}
                    onDoubleClick={handleDoubleClick}
                    onBlur={handleBlur}
                    onFocus={editing ? true : false}

                />{props.task.description}</label>
            <br />
        </>)
}

export default Task;