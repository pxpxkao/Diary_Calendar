import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    NavLink,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addImage } from '../../../actions/diaryActions';
import PropTypes from 'prop-types';

class ImageModal extends Component {
    state = {
        modal: false,
        url: ''
    }

    static propTypes = {
        addImage: PropTypes.func.isRequired,
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            url: ''
        });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        const newImage = {
            url: this.state.url
        }

        // Add image via addImage action
        this.props.addImage(this.props.diaryID, { image: newImage });

        // Close modal
        this.toggle();
    }
    render() {
        return (
            <div style={{display:'inline'}}>
                <Button
                    className = "botton2"
                    style={{ marginLeft: '1rem' }}
                    onClick={this.toggle}
                >Add Image</Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader onClick={this.toggle}>Add new Image to Diary</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="url">Image URL</Label>
                                <Input
                                    type="text"
                                    name="url"
                                    id="url"
                                    className='mb-3'
                                    placeholder="please enter Image URL"
                                    onChange={this.onChange}
                                    required
                                />
                                <Label for="url">
                                    <p style={{marginBottom:"2px"}}>Want to upload your own photo?</p>
                                    <p>Click <a href="https://imggmi.com/" target="_blank">Here</a> to upload and get the URL(Viewer links).</p>
                                </Label>
                                <Button color="dark" style={{ marginTop: '0px' }} block>
                                    Add Image
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

export default connect(mapStateToProps, { addImage })(ImageModal);
