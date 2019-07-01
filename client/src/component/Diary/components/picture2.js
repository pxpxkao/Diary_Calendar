import React from "react";
import styled, { css } from "styled-components";
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
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { connect } from 'react-redux';
import { 
  updateDiary,
  addImage, 
  updateImage, 
  deleteImage } from '../../../actions/diaryActions';
import PropTypes from 'prop-types';

class Picture2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //style: {transform: `rotate(${this.props.rot}deg) scale(${this.props.scale})` },
      modal: false,
      width: this.props.item.width,
      rotateDeg: this.props.item.rotateDeg,
      isDragging: false,

      originalX: 0,
      originalY: 0,

      translateX: this.props.item.lastTranslateX,
      translateY: this.props.item.lastTranslateY,

      lastTranslateX: this.props.item.lastTranslateX,
      lastTranslateY: this.props.item.lastTranslateY,

      url: this.props.item.url,
      zidx: this.props.item.z,
    };
    //this.scale = this.props.scale;
    //this.rotateDeg = this.props.rot;
  }
  static propTypes = {
    updateImage: PropTypes.func.isRequired,
    deleteImage: PropTypes.func.isRequired
  }
  MousewheelScale = e => {
    //https://github.com/panyefan/ShowPicture/blob/master/ShowPicture/ShowPicture.js
    const { diaryID, item } = this.props;
    //console.log("mouse", e.deltaY);
    //滾輪往下deltaY>0
    if (this.props.status === "zoom") {
      //console.log("status",this.props.status)
      let ww = this.state.width;
      if (e.deltaY > 0) {
        ww = ww - 1;
      } else {
        ww = ww + 1;
      }
      if (ww < 5) {
        ww = 5;
      }
      else if (ww > 70) {
        ww = 70;
      }
      this.setState({
        width: ww
      });

      const updateWidthImg = {
        lastTranslateX: this.state.lastTranslateX,
        lastTranslateY: this.state.lastTranslateY,
        width: this.state.width,
        rotateDeg: this.state.rotateDeg,
        _id: item._id,
        url: item.url,
        z: this.state.zidx,
      }

      this.props.updateImage(diaryID, updateWidthImg);
      //console.log("width: ", this.state.width);
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
      const updateRotateImg = {
        lastTranslateX: this.state.lastTranslateX,
        lastTranslateY: this.state.lastTranslateY,
        width: this.state.width,
        rotateDeg: this.state.rotateDeg,
        _id: item._id,
        url: item.url,
        z: this.state.zidx,
      }

      this.props.updateImage(diaryID, updateRotateImg);
      //console.log("deg: ", this.state.rotateDeg);
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
    const updatePositionImg = {
      lastTranslateX: this.state.lastTranslateX,
      lastTranslateY: this.state.lastTranslateY,
      width: this.state.width,
      rotateDeg: this.state.rotateDeg,
      _id: item._id,
      url: item.url,
      z: this.state.zidx,
    }

    this.props.updateImage(diaryID, updatePositionImg);
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
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleUpdate = e => {
    e.preventDefault();

    const { diaryID, item } = this.props;
    const updateImg = {
      lastTranslateX: this.state.lastTranslateX,
      lastTranslateY: this.state.lastTranslateY,
      width: this.state.width,
      rotateDeg: this.state.rotateDeg,
      _id: item._id,
      url: this.state.url,
      z: this.state.zidx,
    }

    this.props.updateImage(diaryID, updateImg);

    this.toggle();
  }
  handleDelete = () => {
    const { diaryID, item } = this.props;
    this.props.deleteImage(diaryID, item._id)

    this.toggle();
  }
  handleToTop = () => {
    console.log("totop")
    // const { diaryID, item } = this.props;
    // const tempImage = {
    //   lastTranslateX: this.state.lastTranslateX,
    //   lastTranslateY: this.state.lastTranslateY,
    //   width: this.state.width,
    //   rotateDeg: this.state.rotateDeg,
    //   _id: item._id,
    //   url: this.state.url
    // }
    
    // this.props.deleteImage(diaryID, item._id);
    // this.props.addImage(diaryID, { image: tempImage });
    
    // this.toggle();
    const { diaryID, item, diary } = this.props;

    this.setState({
      zidx: diary.z + 1
    })

    const update = {
      lastTranslateX: this.state.lastTranslateX,
      lastTranslateY: this.state.lastTranslateY,
      width: this.state.width,
      rotateDeg: this.state.rotateDeg,
      _id: item._id,
      url: this.state.url,
      z: diary.z + 1,
    }

    this.props.updateImage(diaryID, update);

    // Update diary max-z(z)
    const updateDiary = {
      ...diary, 
      z: diary.z + 1
    }
    console.log(diary)
    console.log(updateDiary)
    this.props.updateDiary(updateDiary);

    this.toggle();
  }
  render() {
    const { isDragging } = this.state;
    const { item } = this.props;

    return (
      <div>
        <Image src={item.url}
          rot={this.state.rotateDeg}
          tx={this.state.translateX}
          ty={this.state.translateY}
          wid={this.state.width}
          z={this.state.zidx}
          className="pic"
          onDoubleClick={this.handleDoubleClick.bind(this)}
          onWheel={this.MousewheelScale.bind(this)}
          onMouseDown={this.handleMouseDown}
          isDragging={isDragging}
          alt=""
        ></Image>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader onClick={this.toggle}>Update Image</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="url">Image URL</Label>
                <Input
                  type="text"
                  name="url"
                  id="url"
                  value={this.state.url}
                  className='mb-3'
                  placeholder="Image URL"
                  onChange={this.onChange}
                />
                <Button variant="contained" size="small" color="secondary" style={{ marginTop: '15px',float: 'left' }} onClick={this.handleDelete}>
                  <DeleteIcon style={{ marginRight: '0.5rem' }} />Delete
                </Button>
                
                <Button variant="contained" size="small" color="primary" style={{ marginTop: '15px', marginLeft:'28%'}} onClick={this.handleToTop}>
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
      //   <Image src={item.url}
      //   rot={this.state.rotateDeg}
      //   tx={this.state.translateX}
      //   ty={this.state.translateY}
      //   wid={this.state.width}
      //   className="pic"
      //   onDoubleClick={this.handleDoubleClick.bind(this)}
      //   onWheel={this.MousewheelScale.bind(this)}
      //   onMouseDown={this.handleMouseDown}
      //   isDragging={isDragging}
      //   alt=""
      // ></Image>
    );

  }
}

const Image = styled.img`
position: absolute;
top:380px;
left: 100px;
z-index: ${props => props.z};
transform:  translate(${props => props.tx}px, ${props => props.ty}px) rotate(${props => props.rot}deg);
transform-origin:(50%,50%);
width:${props => props.wid}%;
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

export default connect(mapStateToProps, { updateDiary, addImage, updateImage, deleteImage })(Picture2);