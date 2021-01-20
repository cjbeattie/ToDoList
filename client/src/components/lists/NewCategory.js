import { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form, Card } from "react-bootstrap";

const NewCategory = () => {
  const [created, setCreated] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
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
    __v: 0
  });


  if (created) {
      return <Redirect to="/category" />
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Card style={{width: '18rem', height: '15rem'}}>
      <Card.Title> New Category </Card.Title>
      <Card.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Label>Name:</Form.Label>
        <br />
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
        <Form.Label>Colour:</Form.Label>
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
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
      </Card.Body>
      </Card>
    </div>
  );

};

export default NewCategory