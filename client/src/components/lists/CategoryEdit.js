import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect, useParams} from "react-router-dom";
import { Form } from "react-bootstrap";


const CategoryEdit = () => {
    let { id } = useParams(); 
    const [changed, setChanged] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/category/${id}`, formData)
      .then((res) => {
        setChanged(true);
        console.log("response", res);
        
    })
      .catch((error) => {
        console.log("error", error);
      });
    console.log("event", e);
};


  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    axios.get(`/category/${id}`).then((response) => {
      setFormData({
        name: response.data.name,
      });
    });
  },[]);

  if (changed) {
    return <Redirect to ="/"></Redirect>
}

  return (
    <>
      <h1> Category Edit</h1>
      <Form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    </>
  );
};

export default CategoryEdit;
