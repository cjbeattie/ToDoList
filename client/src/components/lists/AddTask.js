import { useState } from "react";
import axios from "axios";
// import { Redirect } from "react-router-dom";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";

const AddTask = (props) => {
  const [formData, setFormData] = useState({
    description: "",
    isCompleted: false,
  });


  // const [created, setCreated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // works but duplicate
    // let updatedList = props.list
    // updatedList.tasks.push(formData);

    let updatedTasks = [...props.list.tasks]
    updatedTasks.push(formData);
    let updatedList = { ...props.list, tasks: updatedTasks };


    // let updatedLists = props.lists
    // updatedLists.find(x => x._id === props.list._id).splice()
    // console.log("this is the found one in updatedLists", updatedLists.find(x => x._id === props.list._id)) // = updatedList;

    // get the index of the updatedList
    // console.log("INDEX", props.lists.indexOf(updatedList))

    // props.lists.splice(props.lists.indexOf(updatedList), 1, updatedList)
    // console.log("Updated Lists state", props.lists)

    // reset form input to be blank
    console.log("Setting form data...**********")
    setFormData({
      description: "",
      isCompleted: false,
    });

    axios
      .put(`/api/list/${props.list._id}`, updatedList)
      .then((res) => {
        console.log("response", res);
        props.handleAddTask(res);
        // setCreated(true);
        // setFormData((state) => ({
        //   ...state,
        //   _id: res.data.tasks.find(x => x. === props.list._id), /// ARRRGH
        // }))
      })
      .catch((error) => {
        console.log("error", error);
      });



  };

  // if (created) {
  //   return <Redirect to="/list" />;
  // }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputGroup
          className="description mb-3"
          name="description"
          placeholder="Enter task"
          // value={formData.description}
          onChange={(e) =>
            setFormData((state) => ({
              ...state,
              description: e.target.value,
            }))
          }
        >
          {/* <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">+</InputGroup.Text>
          </InputGroup.Prepend> */}
          <FormControl
            placeholder="Add Task"
            value={formData.description}
            aria-label=""
          // aria-describedby="basic-addon1"
          />
          <InputGroup.Append>
            <Button type="submit" variant="outline-secondary">+</Button>
          </InputGroup.Append>
        </InputGroup>

        {/* <button type="submit" className="btn btn-primary">
          Add Task
        </button> */}
      </Form>
    </>
  );
};

export default AddTask;
