import { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Card } from 'react-bootstrap'

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
      <Card style={{ width: '18rem', height: '15rem' }} >
        <h1> SignUp Form</h1>
        <form onSubmit={handleSubmit}>
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
        isAdmin:
        <input
            type="checkbox"
            name="isAdmin"
            value={formData.isAdmin}
            onChange={handleCheckbox}
          />
          <br />
          <input type="submit" />
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
