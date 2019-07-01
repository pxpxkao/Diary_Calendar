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
import { addDiary } from '../actions/diaryActions';

class DiaryModal extends Component {
    state = {
        modal: false,
        date: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            date: ''
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        const newDiary = {
            date: this.state.date,
            userID: this.props.user._id,
            uniqueID: this.state.date + '+' + this.props.user._id
        }

        // Add diary via addDiary action
        this.props.addDiary(newDiary);

        // Close modal
        this.toggle();
    }

    render() {
        return (
            <div>
                <Button
                    color="dark"
                    style={{ marginTop: '2rem', marginBottom: '2rem' }}
                    onClick={this.toggle}
                >Add Diary</Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add to Diary List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="date">Date</Label>
                                <Input
                                    type="text"
                                    name="date"
                                    id="date"
                                    className='mb-3'
                                    placeholder="Add diary date"
                                    onChange={this.onChange}
                                />
                                <Button color="dark" style={{ marginTop: '2rem' }} block>
                                    Add Diary
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
});

export default connect(mapStateToProps, { addDiary })(DiaryModal);