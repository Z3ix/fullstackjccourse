import { useState } from "react";
import { createBlog } from "../thunks/blog";
import { useDispatch } from "react-redux";
import { setTimedInfo, setTimedError } from "../reducers/notification.js";
import { Form, Row, Col, FloatingLabel, Button } from "react-bootstrap";

const NewBlog = ({ toggleNewBlogRef }) => {
  const dispatch = useDispatch();
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  function blogChange(e) {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  }

  async function handleCreateNewBlog(e) {
    e.preventDefault();
    try {
      await dispatch(createBlog(newBlog)).unwrap();
      dispatch(
        setTimedInfo(`New blog ${newBlog.title} by ${newBlog.author} added`, 5),
      );
      toggleNewBlogRef.current.toggleVisible();
    } catch (error) {
      console.log("error creating blog");
      dispatch(setTimedError("Failed adding a blog", 5));
    }
  }

  return (
    <Form onSubmit={handleCreateNewBlog} className="mb-3">
      <h1> Add new blog</h1>
      <FloatingLabel controlId="floatingTitle" label="Title" className="mb-3">
        <Form.Control
          placeholder=""
          name="title"
          onChange={blogChange}
        ></Form.Control>
      </FloatingLabel>

      <FloatingLabel controlId="floatingAuthor" label="Author" className="mb-3">
        <Form.Control
          placeholder=""
          name="author"
          onChange={blogChange}
        ></Form.Control>
      </FloatingLabel>
      <FloatingLabel controlId="floatingUrl" label="URL" className="mb-3">
        <Form.Control
          placeholder=""
          name="url"
          onChange={blogChange}
        ></Form.Control>
      </FloatingLabel>
      <Button type="submit" variant="dark">
        Create
      </Button>
    </Form>
  );
};

export default NewBlog;
