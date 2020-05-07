
import React from "react";

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
              <a
                className="font-weight-bold ml-1"
                href="https://www.creative-tim.com?ref=adr-admin-footer"
                rel="noopener noreferrer"
                target="_blank"
              >
                PSU MATERIAL
              </a>
            </div>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
