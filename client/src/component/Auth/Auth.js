import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class Auth extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <p className="lead text-center">{this.props.text}</p>
                        <p className="text-center">
                        <Link to={{
                        pathname: "/user/login",
                        state: { from: this.props.location.pathname }
                    }} className="btn btn-info ml-2 mr-2 botton2" style={{ fontSize: "1.2rem", fontFamily: 'Open Sans Condensed' }}>Login</Link>
                    <Link to={{
                        pathname: "/user/register",
                        state: { from: this.props.location.pathname }
                    }} className="btn btn-outline-info ml-2 botton2" style={{ fontSize: "1.2rem", fontFamily: 'Open Sans Condensed' }}>Register</Link>
                        </p>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Auth;