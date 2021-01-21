import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form, Card } from "react-bootstrap";


const NewListUser = () => {
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState(null)
  const [formData, setFormData] = useState({
    category: {
      _id: null,
      name: null,
      color: null,
      __v: 0,
    },
    tasks: [],
  });
  const [user, setUser] = useState({
    _id: null,
    username: null,
    password: null,
    isAdmin: false,
    lists: [],
  });
  const [created, setCreated] = useState(false);

  useEffect(() => {
    const requestCat = axios.get("/api/category");
    const requestList = axios.get("/api/list");
    const requestId = axios.get("/api/sessions");
    axios.all([requestCat, requestList, requestId]).then(
      axios.spread((...responses) => {
        const responseCat = responses[0];
        const responseList = responses[1];
        const responseId = responses[2];
        let cats = [];
        for (let i = 0; i < responseList.data.length; i++) {
          cats.push(responseList.data[i].category);
        }
        // Finds the categories that aren't currently a list
        const result = responseCat.data.filter(
          ({ _id: id1 }) => !cats.some(({ _id: id2 }) => id2 === id1)
        );
        setCategories(result);

        setId(responseId.data.currentUser._id)

      })
    );
  }, []);

//   This is the API call for sessions that might need some async stuff to go on
  useEffect(() => {
      axios.get(`/api/users/${id}`).then((response) => {
        setUser({
            _id: response.data._id,
            username: response.data.username,
            password: response.data.password,
            isAdmin: response.data.isAdmin,
            lists: response.data.lists,
          });
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestList = axios.post("/api/list", formData);
    const requestUser = axios.put(`/api/users/${id}`, user);
    axios.all([requestList, requestUser]).then(
      axios
        .spread((...responses) => {
          // const responseList = responses[0];
          // const responseUser = responses[1];
          console.log("responses", responses);
          setCreated(true);
        })
        // .catch((error) => {
        //   console.log("error", error);
        // })
    );
  };

  if (created) {
    return <Redirect to="/list" />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: "18rem", height: "15rem" }}>
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
                let cats = user.lists.push({ // This is apparently not a function and where the errors are being chucked up
                  category: {
                    _id: e.target.value,
                    name: categories.find((x) => x._id === e.target.value).name,
                    color: categories.find((x) => x._id === e.target.value)
                      .color,
                    __v: categories.find((x) => x._id === e.target.value).__v,
                  },
                  tasks: [],
                });
                setFormData({
                  category: {
                    _id: e.target.value,
                    name: categories.find((x) => x._id === e.target.value).name,
                    color: categories.find((x) => x._id === e.target.value)
                      .color,
                    __v: categories.find((x) => x._id === e.target.value).__v,
                  },
                  tasks: [],
                });
                setUser((state) => ({
                  ...state,
                  lists: cats,
                }));
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

export default NewListUser;
