import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";

const NewList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
      axios.get('/lists').then((response) => {
          let cats = [];
          for (let i = 0; i < response.length; i++) {
              if (cats.includes(response[i].name) === false) {
                cats.push(response[i].name)
              }
          }
          setCategories(cats)
      })
  })
  
    const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/lists", formData)
      .then((res) => {
        console.log("response", res);
        setCreated(true);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const [formData, setFormData] = useState({
    category: null,
    tasks: [],
  });

  const [created, setCreated] = useState(false);

  if (created) {
      return <Redirect to='/lists' />
  }

  return (
    <>
      <h1>New List</h1>
      <Form onSubmit={handleSubmit}>
        Name:
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={(e) =>
            setFormData((state) => ({
              ...state,
              name: e.target.value,
            }))
          }
        >
            {categories.map((a) => (
                <option>{a}</option>
            ))}
        </select>
        <br />
        <button type="submit" class='btn btn-primary'>Submit</button>
      </Form>
    </>
  );
};

export default NewList;
