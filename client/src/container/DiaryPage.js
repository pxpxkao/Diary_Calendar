import React, { Component, Fragment } from 'react';
import { Container, Row } from 'reactstrap';

import AppNavbar from '../component/AppNavbar';
import Loader from '../component/Loader';
import Auth from '../component/Auth/Auth';
import DiaryGallery from '../component/Diary/DiaryGallery';
import { getDiarys } from '../actions/diaryActions';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class DiaryPage extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        isLoading: PropTypes.bool,
        getDiarys: PropTypes.func.isRequired,
    }

    componentDidMount() {
        if (this.props.auth.user) {
            this.props.getDiarys(this.props.auth.user._id);
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.auth.user !== this.props.auth.user){
            this.props.getDiarys(this.props.auth.user._id);
        }
    }

    diaries = () => {
        return (
            <Fragment>
                <p className="lead text-center">Manage your existing diaries</p>
                <Container>
                    {/* <Row>
                        <DiaryModal />
                        <CommentModal />
                        <ImageModal />
                        <ImageUpdateModal />
                    </Row> */}
                    <hr />
                    <Row>
                        <DiaryGallery history={this.props.history} />
                    </Row>
                </Container>
            </Fragment>
        );
    }

    loader = () => {
        return (
            <Fragment>
                <p className="lead text-center">Manage your existing diaries</p>
                <hr />
                <Loader />
            </Fragment>
        );
    }

    render() {
        const { isAuthenticated, isLoading } = this.props.auth;
        return (
            <Fragment>
                <AppNavbar history={this.props.history} />
                <section className="jumbotron-header mb-3 mt-2">
                    <h1 className="title jumbotron-heading display-4 text-center">Diary Gallery</h1>
                    {isAuthenticated ? this.diaries()
                        : isLoading ? this.loader() : <Auth text="please LOGIN to Manage your Diaries" location={this.props.location} />}
                </section>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { getDiarys } )(DiaryPage);