import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { useEffect } from "react";
import { fetchUsersThunk } from "../thunks/users";
import { Container, Table } from "react-bootstrap";

const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);
  console.log("our user");
  console.log(user);
  console.log("our users is truly?", !!users);
  console.log("our users length", users.length);
  console.log(users);
  console.log("our user is loading?", user.isLoading);
  if (users.length == 0) return <div>Loading...</div>;

  return (
    <Container className="pt-4">
      <div className="pb-2">List of users</div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="col-2"></th>
            <th>
              <b>blogs created</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <tr key={item.id}>
              <td>
                <Link to={item.id}>{item.username}</Link>
              </td>
              <td>{item.blogs?.length || 0}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Users;
