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
import { addEvent } from '../actions/eventActions';

class EventModal extends Component {
    state = {
        modal: false,
        title: '',
        startTime: '',
        endTime: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            title: '',
            startTime: '',
            endTime: ''
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    onSubmit = e => {
        e.preventDefault();
        const newEvent = {
            title: this.state.title,
            startTime: this.state.startTime,
            endTime: this.state.endTime
        }
        
        // Add event via addEvent action
        this.props.addEvent(newEvent);

        // Close modal
        this.toggle();
    }

    render() {
        return (
            <div>
                <Button
                    color="dark"
                    style={{marginTop: '2rem', marginBottom: '2rem'}}
                    onClick={this.toggle}
                >Add Event</Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add to Event List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="event">Event</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    id="event"
                                    className='mb-3'
                                    placeholder="Add event"
                                    onChange={this.onChange}
                                />
                                <Label for="start">Start Time</Label>
                                <Input
                                    type="text"
                                    name="startTime"
                                    id="start"
                                    className='mb-3'
                                    placeholder="eg. 13:00"
                                    onChange={this.onChange}
                                />
                                <Label for="end">End Time</Label>
                                <Input
                                    type="text"
                                    name="endTime"
                                    id="end"
                                    className='mb-3'
                                    placeholder="eg. 17:00"
                                    onChange={this.onChange}
                                />
                                <Button color="dark" style={{ marginTop: '2rem' }} block>
                                    Add Event
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
    event: state.event
});

export default connect(mapStateToProps, { addEvent })(EventModal);