import React, { Component, Fragment } from 'react';
import { Container, Nav } from 'reactstrap';

import Calendar from '../component/Calendar/Calendar';
import AppNavbar from '../component/AppNavbar';
import Loader from '../component/Loader';
import Auth from '../component/Auth/Auth';
import '../styles.css'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CalendarPage extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        isLoading: PropTypes.bool
    }

    calendar = () => {
        return (
            <Fragment>
                <p className="lead text-center">Manage your events</p>
                <p className="lead text-center mt-n3">Click the date to create or edit your diary</p>
                <Container>
                    <Nav tabs className="justify-content-center mb-3"></Nav>
                    <Calendar />
                </Container >
            </Fragment>
        );
    }

    loader = () => {
        return (
            <Fragment>
                <p className="lead text-center">Manage your events</p>
                <p className="lead text-center mt-n3">Click the date to create or edit your diary</p>
                <Loader />
            </Fragment>
        );
    }

    render() {
        return (
            <Fragment>
                <AppNavbar history={this.props.history} />
                <section className="jumbotron-header mb-3 mt-2">
                    <h1 className="jumbotron-heading display-4 text-center title">Calendar</h1>
                    {this.props.isAuthenticated ? this.calendar()
                        : this.props.isLoading ? this.loader() : <Auth text="please LOGIN to Manage your Calendar" location={this.props.location} />}
                </section>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
})

export default connect(mapStateToProps, null)(CalendarPage);
