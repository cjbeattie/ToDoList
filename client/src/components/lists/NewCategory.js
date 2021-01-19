import { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";

const NewCategory = () => {
  const handleSubmit = (e) => {
    e.preventDefault;
    axios
      .post("/category", formData)
      .then((res) => {
        console.log("Response", res);
        setCreated(true);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const [formData, setFormData] = useState({
    name: null,
    color: null,
  });

  const [created, setCreated] = useState(false);

  if (created) {
      return <Redirect to="/category" />
  }

  return (
    <>
      <h1> Category Edit</h1>
      <Form onSubmit={handleSubmit}>
        Name:
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
        <input
          id="color"
          name="color"
          value={formData.color}
          onChange={(e) =>
            setFormData((state) => ({
              ...state,
              color: e.target.value,
            }))
          }
        />
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    </>
  );

};

export default NewCategory