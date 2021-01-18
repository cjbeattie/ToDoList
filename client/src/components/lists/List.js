import React from 'react'
import AddTask from './AddTask'

const List = (props) => {
    return (
        <>
            <h2>I am a list component</h2>
            <h3>List id: {props.id}</h3>
            <h3>List category: {props.category}</h3>
            <AddTask category_id={props.id} />
        </>
    )
}

export default List;