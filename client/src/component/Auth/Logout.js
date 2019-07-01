import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { IoIosLogOut } from "react-icons/io";
import { connect } from 'react-redux';
import  { logout } from  '../../actions/authActions';
import PropTypes from 'prop-types';

export class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    handleLogout = () => {
        this.props.logout();
        
        // Redirect to HomePage
        this.props.history.push('/');
    }

    render() {
        return (
            <Fragment>
                <NavLink onClick={this.handleLogout} hred='#'>
                    <IoIosLogOut size={25}  />
                    Logout
                </NavLink>
            </Fragment>
        );
    }
}

export default connect(null, { logout })(Logout);