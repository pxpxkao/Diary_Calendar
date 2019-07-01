import React, { Component } from 'react';
import { Container, Button, Card, CardGroup, CardBody, CardHeader, ListGroupItem, ListGroup } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { connect } from 'react-redux';
import { getDiarys, deleteDiary, deleteComment, deleteImage } from '../actions/diaryActions';
import PropTypes from 'prop-types';

class DiaryList extends Component {
    static propTypes = {
        getDiarys: PropTypes.func.isRequired,
        deleteDiary: PropTypes.func.isRequired,
        deleteComment: PropTypes.func.isRequired,
        deleteImage: PropTypes.func.isRequired,
        diary: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getDiarys();
    }

    onDeleteClick = id => {
        this.props.deleteDiary(id)
    }

    onDeleteComment = (id, com_id) => {
        this.props.deleteComment(id, com_id)
    }

    onDeleteImage = (id, img_id) => {
        this.props.deleteImage(id, img_id)
    }

    render() {
        const { diarys } = this.props.diary;
        return (
            <Container className="col-12">
                <h2>Diarys</h2>
                <CardGroup>
                    <TransitionGroup className="diary-list">
                        {diarys.map(({ _id, date, comments, images }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <Card>
                                    <CardHeader>
                                        <Button
                                            style={{ marginRight: "1rem" }}
                                            color="danger"
                                            size="sm"
                                            onClick={this.onDeleteClick.bind(this, _id)}
                                        >
                                            &times;
                                        </Button>
                                        {date}
                                    </CardHeader>
                                    <CardBody>
                                        <h3>Comments: </h3>
                                        <ListGroup>
                                            {comments.map(comment => (
                                                <ListGroupItem key={comment._id}>
                                                    <Button
                                                        style={{ marginRight: "1rem" }}
                                                        color="warning"
                                                        size="sm"
                                                        onClick={this.onDeleteComment.bind(this, _id, comment._id)}
                                                    >
                                                        &times;
                                                    </Button>
                                                    {comment.body}
                                                </ListGroupItem>
                                            ))}
                                        </ListGroup>
                                        <h3>Images: </h3>
                                        <ListGroup>
                                            {images.map(image => (
                                                <ListGroupItem key={image._id}>
                                                    <Button
                                                        style={{ marginRight: "1rem" }}
                                                        color="success"
                                                        size="sm"
                                                        onClick={this.onDeleteImage.bind(this, _id, image._id)}
                                                    >
                                                        &times;
                                                    </Button>
                                                    {image.url}
                                                </ListGroupItem>
                                            ))}
                                        </ListGroup>
                                    </CardBody>
                                </Card>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </CardGroup>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    diary: state.diary
});

export default connect(mapStateToProps, { getDiarys, deleteDiary, deleteComment, deleteImage })(DiaryList);