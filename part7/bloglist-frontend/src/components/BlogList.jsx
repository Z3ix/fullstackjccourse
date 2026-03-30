import { useSelector, useDispatch } from "react-redux";
import Blog from "./Blog";
import NewBlog from "./NewBlog";
import Togglable from "./Togglable";
import { useRef, useEffect } from "react";
import { fetchBlogs } from "../thunks/blog";
import { Container, Row } from "react-bootstrap";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.items);
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  const toggleNewBlogRef = useRef();

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    console.log("inside effect");
    dispatch(fetchBlogs());
    console.log("dispatched");
  }, [dispatch]);

  console.log("blogs are");
  console.log(blogs);
  return (
    <div className="pt-4">
      <Container>
        <Togglable label="Create new blog" ref={toggleNewBlogRef}>
          <NewBlog toggleNewBlogRef={toggleNewBlogRef} />
        </Togglable>
        <hr />
        <h2>Blogs</h2>
        <Row>
          {sortedBlogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default BlogList;
