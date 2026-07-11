import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router";
import { useApp } from "../context/AppContext";

/* Fixed navigation header shown on every page. */
function Header() {
  const { isAuthenticated, currentUser, logout } = useApp();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <Navbar bg="dark" variant="dark" expand="md" fixed="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Eventive
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            {isAuthenticated && (
              <>
                <Nav.Link as={NavLink} to="/dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={NavLink} to="/add-event">
                  Add Event
                </Nav.Link>
              </>
            )}
            <Nav.Link as={NavLink} to="/help">
              Help
            </Nav.Link>
          </Nav>
          <Nav className="align-items-md-center">
            {isAuthenticated ? (
              <>
                <Navbar.Text className="me-3">
                  Hi, {currentUser.name}
                </Navbar.Text>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Log in
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Sign up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
