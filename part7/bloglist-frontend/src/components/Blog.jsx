import { Button, Card, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Blog = ({ blog }) => {
  const navigate = useNavigate();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <Col xs={12} md={3} className="mb-3">
      <Card className=" h-100">
        <Card.Body
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`blogs/${blog.id}`)}
        >
          <Card.Text>
            <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
          </Card.Text>
          <Card.Subtitle>
            by {blog.author ? <b>{blog.author}</b> : <i>unknown author</i>}
          </Card.Subtitle>
        </Card.Body>
        <Button as={Link} to={blog.url}>
          Visit Blog
        </Button>
      </Card>
    </Col>
  );
}; //

/*<button onClick={() => setExtended(!extended)}>
        {extended ? "hide" : "view"}
      </button>

      {extended && <div className="url">{blog.url}</div>}
      {extended && (
        <div className="likes">
          Likes {blog.likes}
          <button onClick={addLike}>like</button>
        </div>
      )}
      <div>{blog.author}</div>
      {extended && user.id == blog.user.id && (
        <div>
          <button onClick={deleteEntry}>delete</button>
        </div>
      )}*/

export default Blog;
