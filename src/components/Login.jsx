/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

function Login(props) {
  const navigate = useNavigate();
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (username === "" || password === "") {
      alert("Please fill in all fields");
    } else if (Object.keys(props.users).includes(username)) {
      if (props.users[username].password === password) {
        localStorage.setItem("authedUser", username);
        props.dispatch(setAuthedUser(username));

        if (localStorage.getItem("prevPath") !== null) {
          navigate(localStorage.getItem("prevPath"));
          localStorage.removeItem("prevPath");
        } else {
          navigate("/");
        }
      } else {
        alert("Incorrect password or username");
      }
    } else {
      alert("Incorrect password or username");
    }

    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };

  const alreadyLoggedIn =
    props.authedUser !== undefined || localStorage.getItem("authedUser") !== null;

  return (
    <Container className="page-container">
      <Row className="justify-content-center">
        <Col md={8} lg={5}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              {alreadyLoggedIn ? (
                <>
                  <h4 className="mb-2">You are already logged in.</h4>
                  <p className="text-muted mb-0">
                    If you want to log out, please click logout above.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="mb-3">Login</h3>

                  <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      data-testid="username"
                      ref={usernameRef}
                      type="text"
                      placeholder="Enter username"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      data-testid="password"
                      ref={passwordRef}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button
                      data-testid="LoginBtn"
                      onClick={handleLogin}
                      variant="primary"
                      type="button"
                    >
                      Login
                    </Button>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = ({ users }) => ({ users });

export default connect(mapStateToProps)(Login);