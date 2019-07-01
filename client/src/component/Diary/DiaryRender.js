import React, { Component, Fragment } from 'react';
import { Container } from 'reactstrap';

import Diary from "./Diary";
import Loader from '../Loader';
import AppNavbar from '../AppNavbar';
import Auth from '../Auth/Auth';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDiarys, addDiary } from '../../actions/diaryActions';

class DiaryRender extends Component {
    static propTypes = {
        getDiarys: PropTypes.func.isRequired,
        addDiary: PropTypes.func.isRequired,
        diary: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object,
    }

    componentDidMount() {
        if (this.props.user) {
            this.props.getDiarys(this.props.user._id);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            this.props.getDiarys(this.props.user._id);
        }
    }

    handleAddDiary = (newDiary) => {
        this.props.addDiary(newDiary);
    }

    loader = () => {
        const { diarys } = this.props.diary;
        const { user, isAuthenticated, isLoading } = this.props;

        const { id } = this.props.match.params;

        if (diarys && user) {
            const diaryDates = diarys.map(diary => diary.date);
            if (id && diaryDates.includes(id)) {
                const item = diarys.filter(diary => diary.date === id)[0];
                return (
                    <Fragment>
                        <section className="jumbotron-header mb-3 mt-2" style={{ textAlign: 'center' }}>
                            <h1 className="title jumbotron-heading display-4">{this.props.match.params.id}</h1>
                            <p className="lead ">Add some pictures and comments</p>
                        </section>
                        <Diary id={id} item={item} history={this.props.history} />
                    </Fragment>

                );
            }

            else if (!diaryDates.includes(id)) {
                const newDiary = {
                    uniqueID: id + '+' + user.name,
                    date: id,
                    userID: user._id,
                }
                this.handleAddDiary(newDiary);

                return (
                    <Fragment>
                        <section className="jumbotron-header mb-3 mt-2" style={{ textAlign: 'center' }}>
                            <h1 className="title jumbotron-heading display-4">{this.props.match.params.id}</h1>
                            <p className="lead ">Add some pictures and comments</p>
                        </section>
                        <Loader />
                    </Fragment>

                );
            }
        }

        else if (!isAuthenticated && !isLoading) {
            return (
                <Fragment>
                    <section className="jumbotron-header mb-3 mt-2" style={{ textAlign: 'center' }}>
                        <h1 className="title jumbotron-heading display-4">{this.props.match.params.id}</h1>
                        <Auth text="Please LOGIN to view your diary" location={this.props.location} />
                    </section>
                </Fragment>

            );
        }
        else {
            return (
                <Fragment>
                    <section className="jumbotron-header mb-3 mt-2" style={{ textAlign: 'center' }}>
                        <h1 className="title jumbotron-heading display-4">{this.props.match.params.id}</h1>
                        <p className="lead ">Add some pictures and comments</p>
                    </section>
                    <Loader />
                </Fragment>
            );
        }
    }

    render() {
        return (
            <Fragment>
                <AppNavbar history={this.props.history} />
                <Container>
                    {this.loader()}
                </Container>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    diary: state.diary,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
})

export default connect(mapStateToProps, { getDiarys, addDiary })(DiaryRender);