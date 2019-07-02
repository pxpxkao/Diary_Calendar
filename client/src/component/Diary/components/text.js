import React from "react";
import styled, { css } from "styled-components";
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import "./style.css";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { connect } from 'react-redux';
import {
  updateDiary,
  addComment,
  updateComment,
  deleteComment
} from '../../../actions/diaryActions';
import PropTypes from 'prop-types';

class Text extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      scale: this.props.item.scale,
      rotateDeg: this.props.item.rotateDeg,
      isDragging: false,

      originalX: 0,
      originalY: 0,

      translateX: this.props.item.lastTranslateX,
      translateY: this.props.item.lastTranslateY,

      lastTranslateX: this.props.item.lastTranslateX,
      lastTranslateY: this.props.item.lastTranslateY,

      body: this.props.item.body,
      zidx: this.props.item.z
    };
    this.inputTxt();
    this.txt = "";
  }
  static propTypes = {
    updateComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired
  }
  inputTxt = () => {

    this.txt = this.props.children.props.children;
    //console.log("inputtxt",this.txt)

  }
  MousewheelScale = e => {
    const { diaryID, item } = this.props;
    //console.log("mouse", e.deltaY);
    //滾輪往下deltaY>0
    if (this.props.status === "zoom") {
      //console.log("status",this.props.status)
      let ww = this.state.scale;
      if (e.deltaY > 0) {
        ww = ww - 0.1;
      }
      else {
        ww = ww + 0.1;
      }
      this.setState({
        scale: ww
      });
      const updateScaleText = {
        lastTranslateX: this.state.lastTranslateX,
        lastTranslateY: this.state.lastTranslateY,
        scale: this.state.scale,
        rotateDeg: this.state.rotateDeg,
        _id: item._id,
        body: item.body,
        z: this.state.zidx,
      }

      this.props.updateComment(diaryID, updateScaleText);

      e.stopPropagation();
      e.preventDefault();
    }
    else if (this.props.status === "rotate") {
      //console.log("status",this.props.status)
      let rr = this.state.rotateDeg;
      if (e.deltaY > 0) {
        rr = rr - 2;
      }
      else {
        rr = rr + 2;
      }
      this.setState({
        rotateDeg: rr
      });
      const updateRotateText = {
        lastTranslateX: this.state.lastTranslateX,
        lastTranslateY: this.state.lastTranslateY,
        scale: this.state.scale,
        rotateDeg: this.state.rotateDeg,
        _id: item._id,
        body: item.body,
        z: this.state.zidx,
      }

      this.props.updateComment(diaryID, updateRotateText);
      e.stopPropagation();
      e.preventDefault();
    }

  };
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }
  handleMouseDown = (e) => {

    //console.log("md")
    //console.log(this.state.lastTranslateX,this.state.lastTranslateY)
    var clientX = e.clientX;
    var clientY = e.clientY;
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
    if (this.props.onDragStart) {
      this.props.onDragStart();
    }

    this.setState({
      originalX: clientX,
      originalY: clientY,
      isDragging: true
    });
    e.preventDefault()
  };
  handleMouseMove = ({ clientX, clientY }) => {
    //console.log("mm")
    const { isDragging } = this.state;
    const { onDrag } = this.props;

    if (!isDragging) {
      return;
    }

    this.setState(prevState => ({
      translateX: clientX - prevState.originalX + prevState.lastTranslateX,
      translateY: clientY - prevState.originalY + prevState.lastTranslateY
    }), () => {
      if (onDrag) {
        onDrag({
          translateX: this.state.translateX,
          translateY: this.state.translateY
        });
      }
    });
  };
  handleMouseUp = () => {
    //console.log("mu")
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);

    this.setState(
      {
        originalX: 0,
        originalY: 0,
        lastTranslateX: this.state.translateX,
        lastTranslateY: this.state.translateY,

        isDragging: false
      },
      () => {
        if (this.props.onDragEnd) {
          this.props.onDragEnd();
        }
      }
    );
    const { diaryID, item } = this.props;
    const updatePositionText = {
      lastTranslateX: this.state.lastTranslateX,
      lastTranslateY: this.state.lastTranslateY,
      scale: this.state.scale,
      rotateDeg: this.state.rotateDeg,
      _id: item._id,
      body: item.body,
      z: this.state.zidx,
    }

    this.props.updateComment(diaryID, updatePositionText);
  };
  handleDoubleClick = () => {
    //this.props.onDoubleClick(e);
    console.log("handle double click")
    this.toggle();
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  handleUpdate = e => {
    e.preventDefault();

    const { diaryID, item } = this.props;
    const updateText = {
      lastTranslateX: this.state.lastTranslateX,
      lastTranslateY: this.state.lastTranslateY,
      scale: this.state.scale,
      rotateDeg: this.state.rotateDeg,
      _id: item._id,
      body: this.state.body,
      z: this.state.zidx,
    }

    this.props.updateComment(diaryID, updateText);

    this.toggle();
  }
  handleDelete = () => {
    const { diaryID, item } = this.props;
    this.props.deleteComment(diaryID, item._id);

    this.toggle();
  }
  handleToTop = () => {
    console.log("totop")
    /*
    const { diaryID, item } = this.props;
    const tempText = {
      lastTranslateX: this.state.lastTranslateX,
      lastTranslateY: this.state.lastTranslateY,
      width: this.state.scale,
      rotateDeg: this.state.rotateDeg,
      body: this.state.body
    }
    
    this.props.deleteComment(diaryID, item._id);
    this.props.addComment(diaryID, { comment: tempText });

    this.toggle();
    */
    const { diaryID, item, diary } = this.props;
    
    this.setState({
      zidx: diary.z + 1
    })

    // Update text itself
    const updateText = {
      lastTranslateX: this.state.lastTranslateX,
      lastTranslateY: this.state.lastTranslateY,
      scale: this.state.scale,
      rotateDeg: this.state.rotateDeg,
      _id: item._id,
      body: item.body,
      z: diary.z + 1,
    }
    console.log(updateText)
    this.props.updateComment(diaryID, updateText);

    // Update diary max-z(z)
    const updateDiary = {
      ...diary, 
      z: diary.z + 1
    }
    console.log(updateDiary)
    this.props.updateDiary(updateDiary);

    this.toggle();
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { isDragging } = this.state;
    // console.log("txtchild", this.props.children.props.children)
    return (
      <div className="txtCard">
        <TXT
          rot={this.state.rotateDeg}
          tx={this.state.translateX}
          ty={this.state.translateY}
          scale={this.state.scale}
          z={this.state.zidx}
          className="txt"
          onDoubleClick={this.handleDoubleClick.bind(this)}
          onWheel={this.MousewheelScale.bind(this)}
          onMouseDown={this.handleMouseDown}
          isDragging={isDragging}
          alt=""
        >
          {this.props.children.props.children}
        </TXT>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader onClick={this.toggle}>Comment Editor</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="body">Edit Your Comment</Label>
                <Input
                  type="textarea"
                  name="body"
                  id="body"
                  value={this.state.body}
                  className='mb-3'
                  style={{ height: "200px" }}
                  placeholder="New Comment"
                  onChange={this.onChange}
                />
                <Button variant="contained" size="small" color="secondary" style={{ marginTop: '15px' }} onClick={this.handleDelete}>
                  <DeleteIcon style={{ marginRight: '0.5rem' }} />Delete
                </Button>
                <Button variant="contained" size="small" color="primary" style={{ marginTop: '15px', marginLeft: '28%' }} onClick={this.handleToTop}>
                  <KeyboardArrowUp style={{ marginRight: '0.5rem' }} />Move to top
                </Button>
                <Button variant="contained" size="small" color="primary" style={{ marginTop: '15px', float: 'right' }} onClick={this.handleUpdate}>
                  Save<SaveIcon style={{ marginLeft: '0.5rem' }} />
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>

      </div>
    );
  }
}

const TXT = styled.p`
position: absolute;
top:380px;
left: 100px;
z-index: ${props => props.z};
transform:  translate(${props => props.tx}px, ${props => props.ty}px) scale(${props => props.scale})rotate(${props => props.rot}deg);
cursor: grab;
${({ isDragging }) =>
    isDragging && css`
  opacity: 0.8;
  cursor: grabbing;
`};
`


const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(mapStateToProps, { updateDiary, addComment, updateComment, deleteComment })(Text);