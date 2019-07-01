import React, { Component, Fragment } from "react";
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import AppNavbar from '../component/AppNavbar';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class HomePage extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        isLoading: PropTypes.bool,
    }

    homepage = () => {
        return (
            <div>
                <p className="lead">Have Fun Today!</p>
            </div>
        );
    }

    authlink = () => {
        return (
            <div>
                <p className="lead">please LOGIN or REGISTER below</p>
                <p>
                    <Link to={{
                        pathname: "/user/login",
                        state: { from: this.props.location.pathname }
                    }} className="btn ml-2 mr-2 botton2" >Login</Link>
                    <Link to={{
                        pathname: "/user/register",
                        state: { from: this.props.location.pathname }
                    }} className="btn ml-2 botton2">Register</Link>
                    {/* <a
                        href="/user/login"
                        className="btn ml-2 mr-2"
                        style={{ fontSize: "1.2rem", fontFamily: 'Open Sans Condensed' }}
                    >Login</a>
                    <a
                        href="/user/register"
                        className="btn ml-2"
                        style={{ fontSize: "1.2rem", fontFamily: "Open Sans Condensed" }}
                    >Register</a> */}
                </p>
            </div>
        );
    }

    applink = () => {
        return (
            <div>
                <p className="lead">Get Started</p>
                <p>
                    <a
                        href="/diary"
                        className="btn ml-2 mr-2 botton2"                        
                    >Diary</a>
                    <a
                        href="/app"
                        className="btn ml-2 botton2"                        
                    >Calendar</a>
                </p>
            </div>
        );
    }

    render() {
        return (
            <Fragment>
                <AppNavbar history={this.props.history} />
                <section className="jumbotron-header mb-3 text-center">
                    <Container style={{ marginTop: "4rem" }}>
                        <Row>
                            <Col>
                                <h1 className="title2 jumbotron-heading display-4">Welcome to Diary Calendar App</h1>
                                {this.props.isAuthenticated ? this.applink()
                                    : this.props.isLoading ? null : this.authlink()}
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
})

export default connect(mapStateToProps, null)(HomePage);