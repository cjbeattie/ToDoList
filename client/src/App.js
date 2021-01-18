import './App.css';
import { Switch, BrowserRouter as Router, Route, NavLink } from "react-router-dom"
import AllLists from "./components/lists/AllLists"
import Login from "./components/users/Login"
import Logout from "./components/users/Logout"
import SignUp from "./components/users/SignUp"
import Profile from "./components/users/Profile"
import AddTask from "./components/lists/AddTask"
import NewList from "./components/lists/NewList"
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
                <NavLink to="/list/new" className="nav-link">New List</NavLink>
              </Nav>
              <Nav>
                <NavLink to="/signup" className="nav-link">SignUp</NavLink>
                <NavLink to="/login" className="nav-link">Login</NavLink>
                <NavLink to="/logout" className="nav-link">Logout</NavLink>
                <NavLink to="/profile" className="nav-link">Profile</NavLink>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route exact path="/">
              <AllLists />
            </Route>
            <Route path="/list/new">
              {/* <AddTask /> */}
              <NewList />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/list">
              <TaskList />
            </Route>
          </Switch>
        </div>
      </Router>

    </div>
  );
}

export default App;
