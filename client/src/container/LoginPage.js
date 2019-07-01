import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Alert, Button, Form, FormGroup, NavLink } from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import '../styles.css';
import AppNavbar from '../component/AppNavbar';

class LoginPage extends Component {
    state = {
        name: "",
        password: "",
        showPassword: false,
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for login error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg });
            } else {
                this.setState({ msg: null });
            }
        }
        // console.log(isAuthenticated)
        // If authenticated, close modal
        if (isAuthenticated) {
            // Clear errors
            this.props.clearErrors();

            // Redirect to previous Page except RegisterPage
            let from = null;
            if (this.props.location.state.from !== null && this.props.location.state.from !== '/user/register') {
                from = this.props.location.state.from;
            }
            const urlTo = from || '/';
            this.props.history.push(urlTo);
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    onSubmit = e => {
        e.preventDefault();

        const { name, password } = this.state;

        // Create user object
        const user = {
            name,
            password
        };

        // Attempt to login
        this.props.login(user);

    }

    render() {
        return (
            <Fragment>
                <AppNavbar history={this.props.history} />
                <div className="loginform">
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <TextField
                                id="standard-name"
                                label="Name"
                                name="name"
                                style={{
                                    width: '200px',
                                    height: '50px'
                                }}
                                onChange={this.onChange}
                            />
                            <FormControl>
                                <InputLabel htmlFor="adornment-password">Password</InputLabel>
                                <Input
                                    id="adornment-password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    name="password"
                                    onChange={this.onChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowPassword}>
                                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <div style={{ width: '200px', marginTop: '1rem' }}>
                                {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                            </div>
                            <div style={{ width: '200px', marginTop: '-1rem' }}>
                                <Button
                                    color="primary"
                                    style={{ float: 'right', marginTop: '1.5rem' }}
                                >
                                    Login
                            </Button>
                                <Link to={{
                                    pathname: '/user/register',
                                    state: { from: this.props.location.pathname }
                                }}>
                                <NavLink
                                    style={{ float: 'left', marginTop: '1.5rem', marginLeft: '-1rem' }}
                                    href='/user/register'
                                >No Account?</NavLink></Link>
                            </div>
                        </FormGroup>
                    </Form>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(LoginPage);