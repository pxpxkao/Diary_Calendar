import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { getDiarys, addComment } from '../actions/diaryActions';
import PropTypes from 'prop-types';

class CommentModal extends Component {
    state = {
        modal: false,
        id: '',
        body: ''
    }

    componentDidMount() {
        if (this.props.user) {
            this.props.getDiarys(this.props.user._id);
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.user !== this.props.user){
            this.props.getDiarys(this.props.user._id);
        }
    }

    static propTypes = {
        addComment: PropTypes.func.isRequired,
        diary: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            id: '',
            body: ''
        });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeSelect = e => {
        this.setState({ id: e.target.options[e.target.selectedIndex].value });
    }

    onSubmit = e => {
        e.preventDefault();
        const newComment = {
            body: this.state.body
        }

        // Add comment via addComment action
        this.props.addComment(this.state.id, { comment: newComment });

        // Close modal
        this.toggle();
    }

    render() {
        const { diarys } = this.props.diary;
        return (
            <div>
                <Button
                    color="info"
                    style={{ marginBottom: '1rem' }}
                    onClick={this.toggle}
                >Add Comment</Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader onClick={this.toggle}>Add Comment to Diary</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="date">Select Date</Label>
                                <Input
                                    type="select"
                                    name="id"
                                    id="date"
                                    className='mb-3'
                                    defaultValue=""
                                    onChange={this.onChangeSelect}
                                    required>
                                    <option value="" disabled hidden>Choose here</option>
                                    {diarys.map(diary => (
                                        <option key={diary._id} value={diary._id}>{diary.date}</option>
                                    ))}
                                </Input>
                                <Label for="body">Comment</Label>
                                <Input
                                    type="text"
                                    name="body"
                                    id="body"
                                    className='mb-3'
                                    placeholder="Add Comment"
                                    onChange={this.onChange}
                                />
                                <Button color="dark" style={{ marginTop: '2rem' }} block>
                                    Add Comment
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    diary: state.diary,
    user: state.auth.user
})

export default connect(mapStateToProps, { getDiarys, addComment })(CommentModal);