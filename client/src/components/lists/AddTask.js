import { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";

const AddTask = () => {
  const [formData, setFormData] = useState({
    description: "Please enter a task",
    isCompleted: false,
  });

  const [created, setCreated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("/list/:id", formData)
      .then((res) => {
        console.log("response", res);
        setCreated(true);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  if (created) {
    return <Redirect to="/list" />;
  }

  return (
    <>
      <h1> Add Task</h1>
      <Form onSubmit={handleSubmit}>
        Task:
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) =>
            setFormData((state) => ({
              ...state,
              name: e.target.value,
            }))
          }
        />
        <br />
        <label for="sel1">Category:</label>
        <select class="addTaskForm">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
        <br />
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </Form>
    </>
  );
};

export default AddTask;
