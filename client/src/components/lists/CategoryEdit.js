import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect, useParams} from "react-router-dom";
import { Form } from "react-bootstrap";


const CategoryEdit = () => {
    let { id } = useParams();
  const handleSubemit = (e) => {
    e.preventDefault();
    axios
      .put(`/category/${id}`, formData)
      .then((res) => {
        console.log("response", res);
        // setChanged(true);
      })
      .catch((error) => {
        console.log("error", error);
      });
    // console.log("event", e);
  };

  const [changed, setChanged] = useState(false);

//   if (changed) {
//     return <Redirect to="/category" />;
//   }

  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    axios.get(`/category/${id}`).then((response) => {
      setFormData({
        name: response.name,
      });
    });
  });

  return (
    <>
      <h1> Category Edit</h1>
      <Form onSubmit={handleSubemit}>
        Name:
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) =>
            setFormData((state) => ({
              ...state,
              name: e.target.value,
            }))
          }
        />
        <br />
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </Form>
    </>
  );
};

export default CategoryEdit;
