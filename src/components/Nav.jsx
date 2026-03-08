/* eslint-disable react/prop-types */
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

const Navigation = (props) => {
  const navigate = useNavigate();
  const isActive = (path) => window.location.pathname === path;

  const avatarSrc = props.authedUser
    ? props.users[props.authedUser]?.avatarURL
    : "/avatar/example.png"; // Vite public path

  return (
    <Navbar fixed="top" bg="light" variant="light" className="shadow-sm">
      <Container>
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Employee Polls
        </Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link
            className={isActive("/") ? "active" : ""}
            onClick={() => navigate("/")}
          >
            Home
          </Nav.Link>

          <Nav.Link
            className={isActive("/leaderboard") ? "active" : ""}
            onClick={() => navigate("/leaderboard")}
          >
            Leaderboard
          </Nav.Link>

          {props.authedUser ? (
            <Nav.Link
              className={isActive("/add") ? "active" : ""}
              onClick={() => navigate("/add")}
            >
              New
            </Nav.Link>
          ) : null}
        </Nav>

        <Navbar.Collapse className="justify-content-end">
          <div className="d-flex align-items-center gap-2">
            <Image
              style={{ width: "40px", height: "40px" }}
              src={avatarSrc}
              alt="avatar"
              roundedCircle
            />

            {props.authedUser ? (
              <>
                <Navbar.Text data-testid="username-nav" className="me-2">
                  @{props.authedUser}
                </Navbar.Text>

                <Nav.Link
                  className="text-decoration-none"
                  onClick={() => {
                    localStorage.removeItem("authedUser");
                    props.dispatch(setAuthedUser(""));
                    navigate("/login");
                  }}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link
                className="text-decoration-none"
                onClick={() => navigate("/login")}
              >
                Login
              </Nav.Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  users,
});

export default connect(mapStateToProps)(Navigation);