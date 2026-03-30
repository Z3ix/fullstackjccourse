import { useState, useImperativeHandle } from "react";
import { Button } from "react-bootstrap";

const Togglable = ({ label, ref, children }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisible };
  });

  return (
    <>
      {visible ? children : ""}
      <Button variant="primary" onClick={toggleVisible}>
        {!visible ? label : "cancel"}
      </Button>
    </>
  );
};

export default Togglable;
