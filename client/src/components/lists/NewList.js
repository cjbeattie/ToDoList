import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";

const NewList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
      axios.get('/list').then((response) => {
          console.log(response)
          let cats = [];
          for (let i = 0; i < response.data.length; i++) {
              if (cats.includes(response.data[i].category) === false) {
                cats.push(response.data[i].category)
              } 
          } setCategories(cats)
      })
  }, [])
  

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
                <option key={categories._id} >{a}</option>
            ))}
        </select>
        <br />
        <button type="submit" className='btn btn-primary'>Submit</button>
      </Form>
    </>
  );
};

export default NewList;
