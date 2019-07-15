import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  FormText,
  Label,
  Input
} from "reactstrap";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import { connect } from "react-redux";
import { addImage } from "../../../actions/diaryActions";
import { uploadImage, clearUpload } from "../../../actions/uploadActions";
import PropTypes from "prop-types";

class ImageModal extends Component {
  state = {
    modal: false,
    value: 0,
    url: "",
    file: null,
    isUploading: false,
    isUploaded: false
  };

  static propTypes = {
    addImage: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    clearUpload: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.upload.upload !== null &&
      prevProps.upload !== this.props.upload
    ) {
      this.setState({
        url: this.props.upload.upload.file,
        isUploading: false,
        isUploaded: true
      });
    }
  }

  handleChange = (e, newValue) => {
    this.setState({
      value: newValue
    });
  };

  handleChangeIndex = index => {
    this.setState({
      value: index
    });
  };

  toggle = () => {
    this.props.clearUpload();
    this.setState({
      modal: !this.state.modal,
      url: "",
      file: null,
      isUploading: false,
      isUploaded: false
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  upload = e => {
    this.setState({
      isUploading: true,
      isUploaded: false
    });
    e.preventDefault();
    let formData = new FormData();
    var file = document.querySelector("[type=file]");
    formData.append("myImage", file.files[0]);
    this.props.uploadImage(formData);
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.url !== "") {
      const newImage = {
        url: this.state.url
      };

      // Add image via addImage action
      this.props.addImage(this.props.diaryID, { image: newImage });

      // Close modal
      this.toggle();
    }
  };

  loader = () => {
    const { isUploading, isUploaded } = this.state;
    if (isUploading) {
      // isUploading
      return (
        <div
          className="spinner-border text-info"
          role="status"
          style={{ marginRight: "1rem", verticalAlign: "bottom " }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      );
    } else if (!isUploading && isUploaded) {
      // !isUploading && isUploaded
      return (
        <img
          src="https://image.flaticon.com/icons/svg/179/179372.svg"
          style={{ width: "24px", margin: "3px", marginRight: "1rem" }}
        />
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <div style={{ display: "inline" }}>
        <Button
          className="botton2"
          style={{ marginLeft: "1rem" }}
          onClick={this.toggle}
        >
          Add Image
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader onClick={this.toggle}>
            Add new Image to Diary
          </ModalHeader>
          <ModalBody>
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
              >
                <Tab label="URL" />
                <Tab label="Upload" />
              </Tabs>
            </AppBar>
            <SwipeableViews
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
              <Typography
                component="div"
                style={{
                  padding: 6 * 3,
                  marginTop: "15px",
                  alignItems: "center"
                }}
              >
                <Form>
                  <FormGroup>
                    <Label for="url">Image URL</Label>
                    <Input
                      value={this.state.url}
                      type="text"
                      name="url"
                      id="url"
                      className="mb-3"
                      placeholder="please enter Image URL"
                      onChange={this.onChange}
                      required
                    />
                  </FormGroup>
                </Form>
              </Typography>
              <Typography
                component="div"
                style={{ padding: 6 * 3, marginTop: "15px" }}
              >
                <Form>
                  <FormGroup>
                    <Label for="upload">Select An Image File</Label>
                    <Input type="file" name="file" id="upload" />
                    <div
                      id="upload-btn"
                      style={{ float: "right", marginTop: "0px" }}
                    >
                      {this.loader()}
                      <Button size="sm" onClick={this.upload}>
                        Upload
                        <CloudUploadIcon
                          size="small"
                          style={{ marginLeft: "5px" }}
                        />
                      </Button>
                    </div>
                  </FormGroup>
                </Form>
              </Typography>
            </SwipeableViews>
            <Button
              color="dark"
              style={{ marginTop: "1rem" }}
              block
              onClick={this.onSubmit}
            >
              Add Image
            </Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  upload: state.upload
});

export default connect(
  mapStateToProps,
  { addImage, uploadImage, clearUpload }
)(ImageModal);

{
  /* <Form onSubmit={this.onSubmit}>
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
                <p style={{ marginBottom: "2px" }}>Want to upload your own photo?</p>
                <p>Click <a href="https://imggmi.com/" target="_blank">Here</a> to upload and get the URL(Viewer links).</p>
            </Label> 

            <Button color="dark" style={{ marginTop: '0px' }} block>
                Add Image
            </Button>
        </FormGroup>
        </Form> */
}
