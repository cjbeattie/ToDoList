import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form, Card } from "react-bootstrap";

const NewList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const requestCat = axios.get("/api/category");
    const requestList = axios.get("/api/list");
    axios.all([requestList, requestCat]).then(
      axios.spread((...responses) => {
        const responseList = responses[0]; //array of current lists
        const responseCat = responses[1]; //array of all categories
        let cats = [];
        for (let i = 0; i < responseList.data.length; i++) {
          cats.push(responseList.data[i].category);
        }
        // Function to find the difference between the two arrays
        const result = responseCat.data.filter(
          ({ _id: id1 }) => !cats.some(({ _id: id2 }) => id2 === id1)
        );
        setCategories(result);
      })
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/list", formData)
      .then((res) => {
        console.log("response", res);
        setCreated(true);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const [formData, setFormData] = useState({
    category: {
      _id: null,
      name: null,
      color: null,
      __v: 0,
    },
    tasks: [],
  });

  const [created, setCreated] = useState(false);

  if (created) {
    return <Redirect to="/list" />;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card style={{ width: '18rem', height: '15rem' }} >
        <h1>New List</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              as="select"
              multiple
              id="category"
              name="category"
              value={formData.category._id}
              onChange={(e) => {
                console.log(e.target.value);
                setFormData({
                  category: {
                    _id: e.target.value,
                    name: categories.find((x) => x._id === e.target.value).name,
                    color: categories.find((x) => x._id === e.target.value).color,
                    __v: categories.find((x) => x._id === e.target.value).__v,
                  },
                  tasks: [],
                });
              }}
            >
              {categories.map((a) => (
                <option value={a._id}>{a.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <br />
          <button type="submit" class="btn btn-primary">
            Submit
        </button>
          <br />
        </Form>
      </Card>
    </div>
  );
};

export default NewList;
