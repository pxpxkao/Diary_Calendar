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
import { getDiarys, updateImage } from '../actions/diaryActions';
import PropTypes from 'prop-types';

class ImageUpdateModal extends Component {
    state = {
        modal: false,
        id: '',
        url: '',
        lastTranslateX: 0,
        lastTranslateY: 0,
        scale: 1,
        rotateDeg: 0,
        img_id: ''
    }

    static propTypes = {
        updateImage: PropTypes.func.isRequired,
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
            url: '',
            lastTranslateX: 0,
            lastTranslateY: 0,
            scale: 1,
            rotateDeg: 0,
            img_id: ''
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
        const Image = {
            url: this.state.url,
            lastTranslateX: this.state.lastTranslateX,
            lastTranslateY: this.state.lastTranslateY,
            scale: this.state.scale,
            rotateDeg: this.state.rotateDeg,
            _id: this.state.img_id
        }
        
        // Update image via updateImage action
        this.props.updateImage(this.state.id, Image);

        // Close modal
        this.toggle();
    }

    render() {
        const { diarys } = this.props.diary;
        
        return (
            <div>
                <Button
                    color="warning"
                    style={{ marginBottom: '1rem' }}
                    onClick={this.toggle}
                >Update Image</Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader onClick={this.toggle}>Update An Image in Diary</ModalHeader>
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
                                        <option key={diary._id} value={diary._id}>{diary.uniqueID}</option>
                                    ))}
                                </Input>
                                <Label for="url">Image</Label>
                                <Input
                                    type="text"
                                    name="url"
                                    id="url"
                                    className='mb-3'
                                    placeholder="Image URL"
                                    onChange={this.onChange}
                                />
                                <Label for="lastTranslateX">lastTranslateX</Label>
                                <Input
                                    type="text"
                                    name="lastTranslateX"
                                    id="lastTranslateX"
                                    className='mb-3'
                                    placeholder="lastTranslateX"
                                    onChange={this.onChange}
                                />
                                <Label for="lastTranslateY">lastTranslateY</Label>
                                <Input
                                    type="text"
                                    name="lastTranslateY"
                                    id="lastTranslateY"
                                    className='mb-3'
                                    placeholder="lastTranslateY"
                                    onChange={this.onChange}
                                />
                                <Label for="scale">scale</Label>
                                <Input
                                    type="text"
                                    name="scale"
                                    id="scale"
                                    className='mb-3'
                                    placeholder="scale"
                                    onChange={this.onChange}
                                />
                                <Label for="rotateDeg">rotateDeg</Label>
                                <Input
                                    type="text"
                                    name="rotateDeg"
                                    id="rotateDeg"
                                    className='mb-3'
                                    placeholder="rotateDeg"
                                    onChange={this.onChange}
                                />
                                <Label for="img">Image ID</Label>
                                <Input
                                    type="text"
                                    name="img_id"
                                    id="img_id"
                                    className='mb-3'
                                    placeholder="img_id"
                                    onChange={this.onChange}
                                />
                                <Button color="dark" style={{ marginTop: '2rem' }} block>
                                    Update Image
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

export default connect(mapStateToProps, { getDiarys, updateImage })(ImageUpdateModal);