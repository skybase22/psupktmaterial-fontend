
import React from "react";
import { Link } from "react-router-dom";
import { firebase } from '../../firebase/index'
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";

class AdminNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {this.props.brandText}
            </Link>
            {/* Search ----------------------------------------------------------------------------------------------------------------------------- */}
            {/* Search ----------------------------------------------------------------------------------------------------------------------------- */}

            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>

                {/* Username Menu ----------------------------------------------------------------------------------------------------------------------------- */}
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <div className="icon icon-shape bg-blue text-white rounded-circle shadow">
                        <i className="fas fa-user" />
                      </div>
                    </span>
                    <Media className="ml-3 d-none d-lg-block">
                      {localStorage.getItem("name") !== null ? (
                        <span className="mb-0 text-sm font-weight-bold">
                          {localStorage.getItem("name")}
                        </span>
                      ) : (
                          <span className="mb-0 text-sm font-weight-bold">
                            GUEST
                          </span>
                        )}
                    </Media>
                  </Media>
                </DropdownToggle>
                {/* Username Menu ----------------------------------------------------------------------------------------------------------------------------- */}

                {/* Username Menu ----------------------------------------------------------------------------------------------------------------------------- */}

                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem to="/auth/login" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>Login</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <Link to="/auth/login">
                  <DropdownItem onClick={e => {
                    firebase.auth().signOut().then(() => {
                      localStorage.removeItem('name')
                    }).catch(function (error) {
                      // An error happened.
                    })
                  }}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                  </Link>
                </DropdownMenu>

                {/* Username Menu ----------------------------------------------------------------------------------------------------------------------------- */}

              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
