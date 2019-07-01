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
import { addComment } from '../../../actions/diaryActions';
import PropTypes from 'prop-types';

class TextModal extends Component {
    state = {
        modal: false,
        body: ''
    }

    static propTypes = {
        addComment: PropTypes.func.isRequired,
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            body: ''
        });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        const newComment = {
            body: this.state.body
        }

        // Add comment via addComment action
        this.props.addComment(this.props.diaryID, { comment: newComment });

        // Close modal
        this.toggle();
    }

    render() {
        return (
            <div style={{display:'inline'}}>
                <Button
                    className="botton2"                    
                    onClick={this.toggle}
                >Add Comment</Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader onClick={this.toggle}>Add new Comment to Diary</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="body">Comment</Label>
                                <Input
                                    type="textarea"
                                    name="body"
                                    id="body"
                                    className='mb-3'
                                    placeholder="Anything you want to say"
                                    style={{ height: "200px" }}
                                    onChange={this.onChange}                                    
                                    required
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
    user: state.auth.user
})

export default connect(mapStateToProps, { addComment })(TextModal);