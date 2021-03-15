import { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Card, Button, Form } from 'react-bootstrap'
import { Link } from "react-router-dom"

const SignUp = (e) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/users", formData)
      .then((res) => {
        console.log("response", res);
        setCreated(true);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    isAdmin: false,
  });
  const [created, setCreated] = useState(false);

  if (created) {
    return <Redirect to="/login" />;
  }

  const handleCheckbox = (e) => {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    if (target.checked) {
      value = true;
    }
    console.log(target)
    console.log(value)
    console.log(name)
    setFormData((state) => ({
      ...state,
      isAdmin: value,
    }))
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card style={{ width: '18rem' }} className="text-left mt-3">
        <Card.Header as="h5">Sign Up</Card.Header>
        {/* <h1> SignUp Form</h1> */}
        <Card.Body variant="flush" classname="mb-3">

          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData((state) => ({
                    ...state,
                    username: e.target.value,
                  }))
                } />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((state) => ({
                    ...state,
                    password: e.target.value,
                  }))
                } />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Admin User"
                value={formData.isAdmin}
                onChange={handleCheckbox} />
              <Form.Text className="text-muted">
                Admins can delete users. For now, anyone can be an admin user.
              </Form.Text>
            </Form.Group>
            <Button variant="outline-secondary" type="submit">
              Submit
            </Button>
            <br />
            <br />
            <Form.Text className="text-muted">
              Already have an account? Please <Link to={`/login`} activeClassName="active">Login</Link>
            </Form.Text>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignUp;
