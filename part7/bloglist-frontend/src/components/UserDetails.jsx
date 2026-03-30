import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByIdThunk } from "../thunks/users";
import { Link, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Container, ListGroup } from "react-bootstrap";

const UserDetails = () => {
  const params = useParams();
  const userId = params.id;
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserByIdThunk(userId));
  }, [dispatch, userId]);

  console.log(users);

  if (users.length == 0) return <div>Loading...</div>;

  const userToDisplay = users.find((item) => item.id == params.id);
  if (!userToDisplay) return <div>No such user</div>; //<Navigate to='/users/' replace />

  if (userToDisplay.blogs.length == 0)
    return (
      <div>
        <h2>{userToDisplay.name}</h2>No blogs for this user
      </div>
    );

  return (
    <Container className="p-3">
      <h2>{userToDisplay.name}</h2>
      <div>blogs added:</div>
      <ListGroup>
        {userToDisplay.blogs.map((item) => {
          return (
            <ListGroup.Item key={item.id}>
              <Link to={"/blogs/" + item.id}>{item.title}</Link>
              <i>{item.author ? ` by ${item.author}` : " No author"}</i>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Container>
  );
};

export default UserDetails;
