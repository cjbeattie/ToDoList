import React, { useState, useRef, useEffect } from "react";

const Task = props => {
    // We use hooks to declare "initial" states
    const inputRef = useRef(null);
    const [inputVisible, setInputVisible] = useState(false);
    const [text, setText] = useState(props.task.description);

    const onClickOutSide = (e) => {
        // Check if user is clicking outside of <input>
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            setInputVisible(false); // Disable text input
            props.handleEditTask(text, props.task._id);
        }
    }

    const handleKeyDown = (event) => {
        if (event.code === "Enter") {
            setInputVisible(false); // Disable text inpu
            props.handleEditTask(text, props.task._id);
        }
    }

    useEffect(() => {
        // Handle outside clicks on mounted state
        if (inputVisible) {
            document.addEventListener("mousedown", onClickOutSide);
        }

        // This is a necessary step to "dismount" unnecessary events when we destroy the component
        return () => {
            document.removeEventListener("mousedown", onClickOutSide);
        };
    });

    return (
        <React.Fragment>
            <input
                type="checkbox"
                id={props.task._id}
                name="isCompleted"
                value={props.task.isCompleted}
                checked={props.task.isCompleted}
                onChange={(e) => props.handleCheckboxClick(e)}
            />
            {inputVisible ? (
                <>
                    <input
                        ref={inputRef} // Set the Ref
                        value={text} // Now input value uses local state
                        onChange={e => {
                            setText(e.target.value);
                        }}
                        onKeyDown={handleKeyDown}
                    // id={props.task._id}
                    />
                    <br />
                </>
            ) : (
                    // <span onClick={() => setInputVisible(true)}>{text}</span>
                    <>
                        <label
                            htmlFor="isCompleted"
                            key={props.task._id}
                            onClick={() => setInputVisible(true)}
                        // id={props.task._id}
                        >
                            {text}
                        </label>
                        <br />
                    </>
                )}
        </React.Fragment>
    );
};

export default Task; // We got our component!







// import { useState } from "react";

// const Task = (props) => {
//     const [editing, setEditing] = useState(false);
//     const [textValue, setTextValue] = useState("");

//     const handleDoubleClick = (event) => {
//         setEditing(true);
//         console.log("editing!")

//     }

//     const handleKeyDown = (event) => {
//         if (event.code === "Enter") {
//             console.log("Axios!");
//             setEditing(false);
//         }
//     }

//     const handleBlur = (event) => {
//         setEditing(false);
//         console.log("blur!")
//     }

//     if (editing) {
//         // return <input
//         //     value={textValue}
//         //     onChange={(event) => setTextValue(event.target.value)}
//         //     onKeyDown={handleKeyDown}
//         // />
//         return (
//             <>

//                 <label htmlFor="isCompleted" key={props.task._id}>
//                     <input
//                         type="checkbox"
//                         id={props.task._id}
//                         name="isCompleted"
//                         value={props.task.isCompleted}
//                         checked={props.task.isCompleted}
//                         onChange={(e) => props.handleCheckboxClick(e)}
//                         onDoubleClick={handleDoubleClick}
//                         onBlur={handleBlur}
//                         onFocus={editing ? true : false}
//                     />
//                     {/* {props.task.description} */}
//                     <input
//                         value={props.task.description}
//                         onChange={(event) => setTextValue(event.target.value)}
//                         onKeyDown={handleKeyDown}
//                     /></label>
//                 <br />
//             </>)

//     }
//     // return <span onDoubleClick={handleDoubleClick}>{textValue}</span>


//     return (
//         <>

//             <label htmlFor="isCompleted" key={props.task._id} onDoubleClick={handleDoubleClick}>
//                 <input
//                     type="checkbox"
//                     id={props.task._id}
//                     name="isCompleted"
//                     value={props.task.isCompleted}
//                     checked={props.task.isCompleted}
//                     onChange={(e) => props.handleCheckboxClick(e)}
//                     onDoubleClick={handleDoubleClick}
//                     onBlur={handleBlur}
//                     onFocus={editing ? true : false}

//                 />{props.task.description}</label>
//             <br />
//         </>)
// }

// export default Task;