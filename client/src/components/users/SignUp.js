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
    // console.log("event", e);
    console.log("sign up happened********************")
  };



  const [formData, setFormData] = useState({
    username: "",
    password: "",
    isAdmin: false,
  });

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

  const [created, setCreated] = useState(false);

  if (created) {
    return <Redirect to="/login" />;
  }

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
                Admin users can edit categories and see a list of all users. For now, anyone can be an admin user.
              </Form.Text>
            </Form.Group>
            <Button variant="outline-secondary" type="submit">
              Submit
            </Button>

            <Form.Text className="text-muted">
              Already have an account? Please <Link to={`/login`} activeClassName="active">Login</Link>
            </Form.Text>
          </Form>



          {/* <form onSubmit={handleSubmit}>
            Username:
        <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData((state) => ({
                  ...state,
                  username: e.target.value,
                }))
              }
            />
            <br />
        Password:
        <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((state) => ({
                  ...state,
                  password: e.target.value,
                }))
              }
            />
            <br />
            <br />
        Admin user:
        <input
              type="checkbox"
              name="isAdmin"
              value={formData.isAdmin}
              onChange={handleCheckbox}
              style={{ width: 20 }}
            />
            <br />
            <br />
            <input type="submit" />
            <Link to={`/login`} activeClassName="active">Login</Link>
            <Button type="submit" variant="outline-secondary">Signup2</Button>
          </form> */}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignUp;
