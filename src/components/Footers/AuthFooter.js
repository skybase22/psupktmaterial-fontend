
import React from "react";

// reactstrap components
import {Container, Row, Col} from "reactstrap";
import {Link } from "react-router-dom";

class Login extends React.Component {
  render() {

    return (
      <>
        <footer className="py-5">
          <Container>
            <Row className="align-items-center justify-content-xl-between">
              <Col xl="2" className="ml-auto">
                <div className="copyright text-center text-xl-left text-muted">
 
                  <Link to="/material/index">
                  <p
                    className="font-weight-bold ml-1"
                  >
                    PSU Material
                  </p>
                    </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default Login;
