import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = ({ user, logOut }) => {
  return (
    <>
      <Navbar style={{ backgroundColor: "#c0c0c0" }} sticky="top">
        <Container>
          <Nav>
            <Nav.Link as={Link} to="/">
              Index
            </Nav.Link>
            <div className="vr" />
            <Nav.Link as={Link} to="/users">
              Users
            </Nav.Link>
            <div className="vr" />
            <NavDropdown title={user.username}>
              <NavDropdown.Item href="#" onClick={logOut}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}; //as={Link}

export default NavigationBar;
