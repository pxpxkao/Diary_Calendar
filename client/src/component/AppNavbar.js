import React, { Component, Fragment } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { IoLogoGithub } from "react-icons/io";
import Logout from "./Auth/Logout";

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.name}` : ""}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout history={this.props.history} />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">Diary Calendar</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                {isAuthenticated ? (
                  <Fragment>
                    <NavItem>
                      <NavLink href="/diary" style={{ fontSize: "1.2rem" }}>
                        Diary
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/app" style={{ fontSize: "1.2rem" }}>
                        Calendar
                      </NavLink>
                    </NavItem>
                  </Fragment>
                ) : null}
              </Nav>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLinks : null}
                <NavItem>
                  <NavLink href="https://github.com/pxpxkao/Diary_Calendar">
                    <IoLogoGithub size={25} />
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(AppNavbar);
