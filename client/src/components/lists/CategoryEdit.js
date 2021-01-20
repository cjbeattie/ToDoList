import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect, useParams} from "react-router-dom";
import { Form, Card } from "react-bootstrap";


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
        color: response.data.color
      });
    });
  },[]);

  if (changed) {
    return <Redirect to ="/category"></Redirect>
}

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Card style={{width: '18rem', height: '15rem'}} >
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
        <Form.Control as="select" id="color" name="color" value={formData.color} onChange={(e) =>
            setFormData((state) => ({
              ...state,
              color: e.target.value,
            }))
          }>
            <option>Red</option>
            <option>Orange</option>
            <option>Yellow</option>
            <option>Green</option>
            <option>Blue</option>
            <option>Indigo</option>
            <option>Violet</option>
        </Form.Control>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
      </Card>
    </div>
  );
};

export default CategoryEdit;
