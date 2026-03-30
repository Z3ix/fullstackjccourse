import { useState, useEffect, useRef } from "react";

import blogService from "./services/blogs";
import loginServices from "./services/login";
import "./App.css";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { setInfo, setError, setTimedError } from "./reducers/notification";
import { setUser } from "./reducers/user";
import BlogList from "./components/BlogList";
import { Link, Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import UserDetails from "./components/UserDetails";
import BlogDetails from "./components/BlogDetails";
import Protected from "./components/Protected";
import NavigationBar from "./components/NavigationBar";
import { Container } from "react-bootstrap";
import Login from "./components/Login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const logged = !!user;

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  async function login(loginData) {
    try {
      let response = await loginServices.login(loginData);
      blogService.setToken(response.token);
      window.localStorage.setItem("user", JSON.stringify(response));
      dispatch(setUser(response));
      return true;
    } catch {
      dispatch(setTimedError("Incorrect login or password", 5));
      return false;
    }
  }

  function logOut() {
    window.localStorage.removeItem("user");
    blogService.setToken(null);
    dispatch(setUser(null));
  }

  return (
    <Container fluid="md" className="px-0 border">
      <Notification />
      {!logged && <Login login={login} />}
      {logged && <NavigationBar user={user} logOut={logOut} />}
      <Routes>
        <Route element={<Protected />}>
          <Route path="/" element={<BlogList />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Route>
      </Routes>
      {console.log("RENDER FINISHED")}
    </Container>
  );
};

export default App;
