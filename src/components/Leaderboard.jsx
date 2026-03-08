/* eslint-disable react/prop-types */
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";

const Leaderboard = (props) => {
  let count = 0;

  return (
    <Container className="page-container">
      <Card className="shadow-sm border-0">
        <Card.Body>
          <h4 className="mb-3">Leaderboard</h4>

          <Table striped bordered hover responsive className="align-middle mb-0">
            <thead>
              <tr>
                <th className="text-center" style={{ width: "60px" }}>
                  #
                </th>
                <th>Users</th>
                <th style={{ width: "120px" }}>Answered</th>
                <th style={{ width: "120px" }}>Created</th>
              </tr>
            </thead>

            <tbody>
              {Object.keys(props.users)
                .sort((a, b) => {
                  const userA = props.users[a];
                  const userB = props.users[b];
                  const answersA = Object.keys(userA.answers).length;
                  const answersB = Object.keys(userB.answers).length;
                  const questionsA = userA.questions.length;
                  const questionsB = userB.questions.length;
                  return answersB + questionsB - (answersA + questionsA);
                })
                .map((user) => {
                  const isMe = props.authedUser === user;

                  return (
                    <tr key={user} className={isMe ? "table-primary" : ""}>
                      <td className="text-center fw-semibold">{++count}</td>

                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <Image
                            style={{ width: "44px", height: "44px" }}
                            src={props.users[user].avatarURL}
                            alt="avatar"
                            roundedCircle
                          />

                          <div>
                            <div className="fw-semibold">
                              {isMe ? `${props.users[user].name} (You)` : props.users[user].name}
                            </div>
                            <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                              {user}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="fw-semibold">
                        {Object.keys(props.users[user].answers).length}
                      </td>

                      <td className="fw-semibold">{props.users[user].questions.length}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({ authedUser, users });

export default connect(mapStateToProps)(Leaderboard);