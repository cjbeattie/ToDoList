import { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";

const AddTask = (props) => {
  const [formData, setFormData] = useState({
    description: "Please enter a task",
    isCompleted: false,
  });

  // const [created, setCreated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/list/${props.id}`, formData)
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
          id="description"
          name="description"
          value={formData.description}
          onChange={(e) =>
            setFormData((state) => ({
              ...state,
              description: e.target.value,
            }))
          }
        />
        <button type="submit" class="btn btn-primary">
          Add Task
        </button>
      </Form>
    </>
  );
};

export default AddTask;
