import { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";

const AddTask = (props) => {
  const [formData, setFormData] = useState({
    description: "",
    isCompleted: false,
  });



  // const [created, setCreated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    let updatedList = props.list
    updatedList.tasks.push(formData);

    axios
      .put(`/list/${props.list._id}`, updatedList)
      .then((res) => {
        console.log("response", res);
        // setCreated(true);
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
        Task:
        <input
          className="description"
          name="description"
          placeholder="Enter task"
          value={formData.description}
          onChange={(e) =>
            setFormData((state) => ({
              ...state,
              description: e.target.value,
            }))
          }
        />
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </Form>
    </>
  );
};

export default AddTask;
