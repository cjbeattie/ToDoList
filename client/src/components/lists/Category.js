import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Table } from "react-bootstrap";
import CategoryEdit from "./CategoryEdit"
// import categoryDelete from "./categoryDelete"

const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get("/category").then((response) => {
      setCategory(response.data);
    });
  }, [category]);

  const updateDelete = (id) => () => {
    setCategory(category.filter((x) => x._id !== id));
  };

  return (
    <>
      <h1>Categories</h1>
      <p>These are all the categories</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Admin Actions</th>
          </tr>
        </thead>
        <tbody>
          {category.map((categories) => (
            <tr key={categories._id}>
              <td>{categories.name}</td>
              <td><Link to={`/category/${categories._id}`}>Edit</Link> </td>
              {/* <td><categoryDelete id={categories._id} updateFn={updateDelete(category._id)} /></td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Category;
