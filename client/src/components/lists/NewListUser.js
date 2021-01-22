import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form, Card } from "react-bootstrap";

const NewListUser = () => {
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState(null);
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
    axios.get(`/api/sessions/`).then((res) => {
      console.log("SESSIONS RESPONSE ID", res.data.currentUser._id);
      setId(res.data.currentUser._id);

      axios.get(`/api/users/${res.data.currentUser._id}`).then((response) => {
        const user = {
          _id: response.data._id,
          username: response.data.username,
          password: response.data.password,
          isAdmin: response.data.isAdmin,
          lists: response.data.lists,
        };
        let cats = [];
        for (let i = 0; i < user.lists.length; i++) {
          cats.push(user.lists[i].category);
        }
        console.log(cats);

        axios.get("/api/category").then((response3) => {
          // Finds the categories that aren't currently a list
          const result = response3.data.filter(
            ({ _id: id1 }) => !cats.some(({ _id: id2 }) => id2 === id1)
          );
          console.log(result);
          setCategories(result);
          setUser(user)
        });
      });

      // const requestCat = axios.get("/api/category");
      // // const requestList = axios.get(`/api/users/${id}`);

      // axios.all([requestCat])
      //   .then(
      //     axios.spread((...responses) => {
      //       const responseCat = responses[0];
      //       const responseList = responses[1];
      //       let cats = [];
      //       for (let i = 0; i < responseList.data.length; i++) {
      //         cats.push(responseList.data[i].category);
      //       }
      //       // Finds the categories that aren't currently a list
      //       const result = responseCat.data.filter(
      //         ({ _id: id1 }) => !cats.some(({ _id: id2 }) => id2 === id1)
      //       );
      //       setCategories(result);

      //     }))
      //   .catch((error) => {
      //     console.log("error", error);
      //   })
    });
  }, []);

  // //   This is the API call for sessions that might need some async stuff to go on
  // useEffect(() => {
  //   axios.get(`/api/users/${id}`).then((response) => {
  //     setUser({
  //       _id: response.data._id,
  //       username: response.data.username,
  //       password: response.data.password,
  //       isAdmin: response.data.isAdmin,
  //       lists: response.data.lists,
  //     });
  //   })
  // }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("e*******", e);
    console.log("e*******", e.target["0"].value);

    // construct listData from category id (event.target.id)
    // do axios call with the listData to make new list in db, get the response which the new listID
    // construct the user - that takes from the user state (already got) + new listID
    // do axios call with userData to edit the user and give them a new list
    const listData = {
      category: e.target["0"].value,
      tasks: [],
    };

    axios
      .post(`/api/list/`, listData)
      .then((res) => {
        let newListID = res.data._id;
        let tempLists = user.lists;
        let updatedUser = {
          ...user,
          lists: [...tempLists, newListID],
        };
        axios
          .put(`/api/users/${id}`, updatedUser)
          .then((res) => {
            setCreated(true);
            console.log(
              "hopefully this worked!!!! New list created and added to current user"
            );
          })
          .catch((error) => {
            console.log("error", error);
          });
      })
      .catch((error) => {
        console.log("error", error);
      });

    // const requestList = axios.post("/api/list", formData);
    // const requestUser = axios.put(`/api/users/${id}`, user);
    // axios.all([requestList, requestUser]).then(
    //   axios
    //     .spread((...responses) => {
    //       // const responseList = responses[0];
    //       // const responseUser = responses[1];
    //       console.log("responses", responses);
    //       setCreated(true);
    //     })
    //   // .catch((error) => {
    //   //   console.log("error", error);
    //   // })
    // );
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
      <Card style={{ width: "18rem" }} className="text-left mt-3">
        <Card.Header as="h5">New List</Card.Header>
        {/* <h1>New List</h1> */}
        <Card.Body variant="flush" classname="mb-3">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                as="select"
                multiple
                id="category"
                name="category"
                value={formData.category._id}
              // onChange={(e) => {
              //   console.log(e.target.value);
              //   let cats = user.lists.push({ // This is apparently not a function and where the errors are being chucked up
              //     category: {
              //       _id: e.target.value,
              //       name: categories.find((x) => x._id === e.target.value).name,
              //       color: categories.find((x) => x._id === e.target.value)
              //         .color,
              //       __v: categories.find((x) => x._id === e.target.value).__v,
              //     },
              //     tasks: [],
              //   });
              //   setFormData({
              //     category: {
              //       _id: e.target.value,
              //       name: categories.find((x) => x._id === e.target.value).name,
              //       color: categories.find((x) => x._id === e.target.value)
              //         .color,
              //       __v: categories.find((x) => x._id === e.target.value).__v,
              //     },
              //     tasks: [],
              //   });
              //   setUser((state) => ({
              //     ...state,
              //     lists: cats,
              //   }));
              // }}
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
        </Card.Body>

      </Card>
    </div>
  );
};

export default NewListUser;

// const requestCat = axios.get("/api/category");
// const requestList = axios.get(`/api/users/${id}`);
// // const requestId = axios.get("/api/sessions");
// axios.all([requestCat, requestList, requestId]).then(
//   axios.spread((...responses) => {
//     const responseCat = responses[0];
//     const responseList = responses[1];
//     const responseId = responses[2];
//     let cats = [];
//     for (let i = 0; i < responseList.data.length; i++) {
//       cats.push(responseList.data[i].category);
//     }
//     // Finds the categories that aren't currently a list
//     const result = responseCat.data.filter(
//       ({ _id: id1 }) => !cats.some(({ _id: id2 }) => id2 === id1)
//     );
//     setCategories(result);

//     // setId(responseId.data.currentUser._id)

//     axios.get(`/api/users/${responseId.data.currentUser._id}`).then((response) => {
//       setUser({
//         _id: response.data._id,
//         username: response.data.username,
//         password: response.data.password,
//         isAdmin: response.data.isAdmin,
//         lists: response.data.lists,
//       });
//     })

// axios
//   .get(`/api/sessions/`)
//   .then((res) => {
//     console.log("SESSIONS RESPONSE ID", res.data.currentUser._id)
//     setId(res.data.currentUser._id)

//     const requestCat = axios.get("/api/category");
//     const requestList = axios.get(`/api/users/${id}`);

//     axios.all([requestCat, requestList])
//       .then(
//         axios.spread((...responses) => {
//           const responseCat = responses[0];
//           const responseList = responses[1];
//           let cats = [];
//           for (let i = 0; i < responseList.data.length; i++) {
//             cats.push(responseList.data[i].category);
//           }
//           // Finds the categories that aren't currently a list
//           const result = responseCat.data.filter(
//             ({ _id: id1 }) => !cats.some(({ _id: id2 }) => id2 === id1)
//           );
//           setCategories(result);

//           axios.get(`/api/users/${res.data.currentUser._id}`).then((response) => {
//             setUser({
//               _id: response.data._id,
//               username: response.data.username,
//               password: response.data.password,
//               isAdmin: response.data.isAdmin,
//               lists: response.data.lists,
//             });
//           })

//         }))
//       .catch((error) => {
//         console.log("error", error);
//       })

//   })
