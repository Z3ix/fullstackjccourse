import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteBlogThunk, fetchBlogByIdThunk } from "../thunks/blog";
import { addCommentThunk } from "../thunks/comments";
import { Button, Container, Form, InputGroup, Table } from "react-bootstrap";
import { updateBlogThunk } from "../thunks/blog";

const BlogDetails = () => {
  const inputRef = useRef(null);
  const [comment, setComment] = useState("");

  const user = useSelector((state) => state.user);
  const params = useParams();
  const blogs = useSelector((state) => state.blogs.items);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBlogByIdThunk(params.id));
  }, [dispatch, params.id]);

  const handleAddComment = async (e) => {
    console.log(comment, " sent");
    if (!comment) {
      inputRef.current.focus();
      return;
    }
    dispatch(addCommentThunk({ id: params.id, content: comment }));
    setComment("");
  };

  async function addLike(e) {
    let newBlog = { ...blog, likes: blog.likes + 1 };
    e.preventDefault();
    dispatch(updateBlogThunk(newBlog));
  }

  function deleteBlog(e) {
    if (
      confirm(`Are you sure want to delete ${blog.title} by ${blog.author}?`)
    ) {
      dispatch(deleteBlogThunk(blog));
    }
  }

  if (blogs.length == 0) return <div>Loading ...</div>;
  const blog = blogs.find((item) => item.id == params.id);
  if (!blog) return <div>No such blog</div>;
  console.log(blog);
  return (
    <Container className="p-3">
      <h1>
        {blog.title} by {blog.author}
      </h1>
      <a href={blog.url} target="_blank" rel="noreferrer">
        {blog.url}
      </a>
      <div>
        {blog.likes} likes{" "}
        <Button size="sm" variant="success" onClick={addLike}>
          Like
        </Button>
      </div>
      <div>added by {blog.user.username}</div>
      {user.user.id == blog.user.id && (
        <Button variant="danger" size="sm" onClick={deleteBlog}>
          Delete
        </Button>
      )}
      <hr />
      <div>
        <h3>Comments</h3>
        <Form>
          <InputGroup>
            <Button onClick={handleAddComment} variant="secondary">
              add comment
            </Button>
            <Form.Control
              ref={inputRef}
              name="comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </InputGroup>
        </Form>

        <Table striped className="mt-3">
          <tbody>
            {blog.comments.length ? (
              blog.comments.map((item) => (
                <tr key={item.id}>
                  <td key={item.id}>{item.content}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No comments</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default BlogDetails;
