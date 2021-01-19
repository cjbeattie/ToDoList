import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";

const NewList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/category").then((response) => {
      //   console.log(response)
      //   let cats = [];
      //   for (let i = 0; i < response.data.length; i++) {
      //       if (cats.includes(response.data[i].name) === false) {
      //         cats.push(response.data[i].name)
      //       }
      //   } setCategories(cats)
      setCategories(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/list", formData)
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
    <>
      <h1>New List</h1>
      <Form onSubmit={handleSubmit}>
        Name:
        <select
          id="category"
          name="category"
          value={formData}
          onChange={(e) => {
              console.log(e.target.value)
            setFormData(
              {category: {
                  _id: e.target.value,
                  name: categories.find(x => x._id === e.target.value).name,
                  color: categories.find(x => x._id === e.target.value).color,
                  __v: categories.find(x => x._id === e.target.value).__v
              }, tasks: []},
            )
          }}
        >
          {categories.map((a) => (
            <option value={a._id}>{a.name}</option>
          ))}
        </select>
        <br />
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </Form>
    </>
  );
};

export default NewList;
