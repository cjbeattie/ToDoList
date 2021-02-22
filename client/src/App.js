import "./App.css";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  NavLink,
} from "react-router-dom";
import AllLists from "./components/lists/AllLists";
import Login from "./components/users/Login";
import Logout from "./components/users/Logout";
import SignUp from "./components/users/SignUp";
import Profile from "./components/users/Profile";
import AddTask from "./components/lists/AddTask";
import Category from "./components/lists/Category";
import CategoryEdit from "./components/lists/CategoryEdit";
import NewCategory from "./components/lists/NewCategory";
import NewList from "./components/lists/NewList";
import NewListUser from "./components/lists/NewListUser";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get(`/api/sessions/`)
  //     .then((res) => {
  //       setIsSignedIn(true)
  //     })
  // }, []);

  const handleLogout = () => {
    setIsSignedIn(false)
  }

  const handleLogin = () => {
    setIsSignedIn(true)
  }

  const hideSignUp = (isSignedIn) => {
    if (isSignedIn) {
      return (
        <>
          <Nav className="mr-auto">
            <NavLink to="/list" className="nav-link">
              Lists
                </NavLink>
            <NavLink to="/category" className="nav-link">
              Categories
                </NavLink>
            <NavLink to="/list/new" className="nav-link">
              New List
                </NavLink>
          </Nav>
          <Nav>
            <NavLink to="/sessions" className="nav-link">
              Logout
          </NavLink>
            <NavLink to="/profile" className="nav-link">
              Profile
          </NavLink>
          </Nav>
        </>
      );
    } else {
      return (
        <>
          <Nav className="mr-auto"></Nav>
          <Nav>
            <NavLink to="/login" className="nav-link">
              Login/SignUp
        </NavLink>
          </Nav >
        </>

      );
    }
  };


  return (
    <div className="App">
      <Router>
        <div>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">DONSEY</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

              {hideSignUp(isSignedIn)}
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route exact path="/">
              {isSignedIn ? <AllLists /> : <SignUp />}
            </Route>
            <Route path="/category/new">
              <NewCategory />
            </Route>
            <Route path="/category/:id">
              <CategoryEdit />
            </Route>
            <Route path="/category">
              <Category />
            </Route>
            <Route path="/list/new">
              <NewListUser />
            </Route>
            <Route path="/sessions">
              <Logout handleLogout={handleLogout} />
            </Route>
            <Route path="/login">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/list">
              <AllLists />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
