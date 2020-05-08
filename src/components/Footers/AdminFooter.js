
import React from "react";
import { Link } from "react-router-dom"
// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer" style={{backgroundColor:"#F3FAF9"}}>
        <Row className="align-items-center justify-content-xl-between">
          <Col className="ml-auto" xl="2">
            <div className="copyright text-center text-xl-left text-muted">
              © 2020{" "}
              <Link to="/material/index">
              <a
                className="font-weight-bold ml-1"
              >
                PSU MATERIAL
              </a>
              </Link>

            </div>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
