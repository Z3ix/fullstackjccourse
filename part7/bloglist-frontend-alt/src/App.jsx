import { useState, useEffect, useRef, useReducer } from "react";

import blogService from "./services/blogs";
import loginServices from "./services/login";
import "./App.css";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { setInfo, setError, notificationReducer } from "./reducers/notification";
import { setUser, userReducer } from "./reducers/user";
import BlogList from "./components/BlogList";
import { NotificationContext, UserContext } from "./contexts";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authUser, dispatchAuthUser] = useReducer(userReducer,{})
  
  const [notification, dispatchNotification] = useReducer(notificationReducer, {
    info:{
      message: null,
      current: 0
    },
    error: {
      message: null,
      current: 0
    }
  })
  const dispatch = useDispatch()
  console.log(notification)
  

  const logged = !!authUser;



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatchAuthUser({type: 'LOGIN', payload:user});
      blogService.setToken(user.token);
    }
  }, []);







  async function loginHandler(e) {
    e.preventDefault();
    try {
      let response = await loginServices.login({ username, password });
      blogService.setToken(response.token);
      window.localStorage.setItem("user", JSON.stringify(response));
      dispatchAuthUser({type: 'LOGIN', payload:response});
      setUsername("");
      setPassword("");
    } catch {
      setError("Incorrect login or password");
      setTimeout(() => {
        setError("");
      }, 5000);
      setPassword("");
    }
  }

  function logOut() {
    window.localStorage.removeItem("user");
    dispatchAuthUser({type: 'LOGOUT'});
  }

  function renderLoginForm() {
    return (
      <form onSubmit={loginHandler}>
        <h1>Log in</h1>
        <div>
          <label>
            username
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit" name="login">
          login
        </button>
      </form>
    );
  }

  function renderLogged() {
    return (
      <div className="logged">
        Logged as {authUser.username} <button onClick={logOut}>log out</button>
      </div>
    );
  }

  function renderBlogs() {
    return (
      <BlogList/>
    );
  }

  return (
    <UserContext value = {{authUser, dispatchAuthUser}}>
    <NotificationContext value = {{notification, dispatchNotification}}>
      <div>
        <Notification/>
        {!logged && renderLoginForm()}
        {logged && renderLogged()}
        {logged && renderBlogs()}
      </div>
    </NotificationContext>
    </UserContext>
  );
};

export default App;
