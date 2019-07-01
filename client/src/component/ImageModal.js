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
import { getDiarys, addImage } from '../actions/diaryActions';
import PropTypes from 'prop-types';

class ImageModal extends Component {
    state = {
        modal: false,
        id: '',
        url: ''
    }

    static propTypes = {
        addImage: PropTypes.func.isRequired,
        diary: PropTypes.object.isRequired
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

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            id: '',
            url: ''
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
        const newImage = {
            url: this.state.url
        }

        // Add image via addImage action
        this.props.addImage(this.state.id, { image: newImage });

        // Close modal
        this.toggle();
    }

    render() {
        const { diarys } = this.props.diary;
        
        return (
            <div>
                <Button
                    color="primary"
                    style={{ marginBottom: '1rem' }}
                    onClick={this.toggle}
                >Add Image</Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader onClick={this.toggle}>Add Image to Diary</ModalHeader>
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
                                <Label for="url">Image</Label>
                                <Input
                                    type="text"
                                    name="url"
                                    id="url"
                                    className='mb-3'
                                    placeholder="Add Image"
                                    onChange={this.onChange}
                                />
                                <Button color="dark" style={{ marginTop: '2rem' }} block>
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
    diary: state.diary,
    user: state.auth.user
})

export default connect(mapStateToProps, { getDiarys, addImage })(ImageModal);