import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Table } from "react-bootstrap";
import UserDelete from "./UserDelete"

const UserProfile = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get("/api/users").then((response) => {
      setUser(response.data);
    });
  }, []);

  const updateDelete = (id) => () => {
    setUser(user.filter((x) => x._id !== id));
  };

  return (
    <>
      <h2>Profile</h2>
      <p>This is the current user</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name: {user.name}</th>
          </tr>
        </thead>
      </Table>
      <p>This is a list of all users in our database. ONLY Admin can remove users</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>isAdmin</th>
            <th>Admin Actions</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.isAdmin.toString()}</td>
              <td><UserDelete id={user._id} updateFn={updateDelete(user._id)} /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserProfile;
