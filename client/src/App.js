import './App.css';
import { Switch, BrowserRouter as Router, Route, NavLink, Link } from "react-router-dom"
import List from "./components/lists/List"
import Login from "./components/users/Login"
import Logout from "./components/users/Logout"
import SignUp from "./components/users/SignUp"
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
        <Router>
        <div>
      <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Donesy!</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <NavLink to="/list" className="nav-link">Lists</NavLink>
                <NavLink to="/list/new" className="nav-link">New Task</NavLink>
              </Nav>
              <Nav>
                <NavLink to="/signup" className="nav-link">SignUp</NavLink>
                <NavLink to="/login" className="nav-link">Login</NavLink>
                <NavLink to="/logout" className="nav-link">Logout</NavLink>
                <NavLink to="/" className="nav-link">Profile</NavLink>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route exact path="/">
              <List />
            </Route>
            <Route path="/">
              <Logout />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/list">
              <List />
            </Route>
          </Switch>
        </div>
      </Router>

    </div>
  );
}

export default App;
