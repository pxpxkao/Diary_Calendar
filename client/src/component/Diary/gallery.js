import React, {Component} from "react";
import Picture2 from "./components/picture2"
import Text from "./components/text"
import But from "./components/but"
import TextModal from "./components/TextModal";
import ImageModal from "./components/ImageModal";
import IconModal from "./components/IconModal";
import "./components/style.css"
import {
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
  } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment, addImage } from '../../actions/diaryActions';

class Gallery extends Component {
    constructor(props){
        super(props);
        this.state = {
            // images:[
            //     {url:"https://i.pinimg.com/originals/0d/d4/15/0dd415c0b4b3a5a51aa2f68faf1030fa.png"}
            // ],
            // texts:["text0","text1"],
            status:"view"
        };
    }

    static propTypes = {
        diary: PropTypes.object.isRequired,
        addComment: PropTypes.func.isRequired, 
        addImage: PropTypes.func.isRequired
    }

    handleZoomOnClick = (e) =>{
        console.log("click z")
        this.setState({
            status:"zoom"
        })
    }
    handleRotOnClick = (e) =>{
        console.log("click r")
        this.setState({
            status:"rotate"
        })
        //console.log(this.state.status)
    }
    handleQuestionOnClick = (e) =>{
        console.log("click q")
        this.setState({
            status:"view"
        })
        //console.log(this.state.status)
    }
    showInfo =e =>{
        console.log("info")
        this.toggle()
    }
    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }
    dbclick = e =>{
        console.log("rm")
        this.setState({
            
        })
    }
    render(){
        const { diarys } = this.props.diary;
        const { item } = this.props;
        //console.log("render gal",this.state.status)
        const stat=this.state.status
        let dbc=this.dbclick.bind(this)
        let txtlist = diarys.filter(diary => diary.uniqueID === item.uniqueID)[0].comments.map(
            function(list){return (
            <Text diaryID={item._id} item={list} status={stat} onDoubleClick={dbc} key={list._id} diary={item}>
                <p>
                    {list.body}
                </p>
            </Text>)
        })
        let piclist = item.images.map(function(list){
            return(
                <Picture2 diaryID={item._id} item={list} status={stat} key={list._id} diary={item} />
            )
        })
        return(
            //<img src={this.state.images[0]}/>
            <div style={{ minHeight: '600px'}}>
                <div>
                    <div style={{textAlign:'center'}}>
                        <TextModal diaryID={item._id} />
                        <ImageModal diaryID={item._id} />
                        <IconModal diaryID={item._id}/>
                    </div>
                    <But src="https://image.flaticon.com/icons/svg/13/13543.svg" stat={this.state.status} id="question" onClick={this.handleQuestionOnClick.bind(this)}></But>
                    <But src="https://image.flaticon.com/icons/svg/463/463067.svg" stat={this.state.status} id="zoom" onClick={this.handleZoomOnClick.bind(this)}></But> 
                    <But src="https://image.flaticon.com/icons/svg/1330/1330172.svg" stat={this.state.status} id="rotate" onClick={this.handleRotOnClick.bind(this)}></But>
                    <But src="https://image.flaticon.com/icons/svg/685/685815.svg" stat={this.state.status} id="info" onClick={this.showInfo.bind(this)}></But>
                </div>
                <hr/>
                {txtlist}
                {piclist}
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader onClick={this.toggle} className="ml-2">How to use?</ModalHeader>
                    <ModalBody>
                        <div style={{margin:"5px"}}>
                            <img src="https://image.flaticon.com/icons/svg/13/13543.svg" style={{width:"20px", margin:"3px",marginRight:"10px"}}/>
                            View Mode
                        </div>
                        <div style={{margin:"5px"}}>
                            <img src="https://image.flaticon.com/icons/svg/463/463067.svg" style={{width:"20px", margin:"3px",marginRight:"10px"}}/>
                            Zoom Mode : Scroll to zoom your photos and comments.
                        </div>
                        <div style={{margin:"5px"}}>
                            <img src="https://image.flaticon.com/icons/svg/1330/1330172.svg" style={{width:"20px", margin:"3px",marginRight:"10px"}}/>
                            Rotate Mode : Scroll to rotate your photos and comments. 
                        </div>
                        <div style={{margin:"5px"}}>
                            <img src="https://cdn1.iconfinder.com/data/icons/social-object-1/74/36-512.png" style={{width:"24px", margin:"3px",marginRight:"6px"}}/>
                            Doubleclick the photo or comment to edit the item.
                        </div>
                        <div style={{margin:"5px"}}>
                            <img src="https://cdn0.iconfinder.com/data/icons/computers-and-development/432/drag-and-drop-512.png" style={{width:"24px", margin:"3px",marginRight:"6px"}}/>
                            Drag to move the items.
                        </div>

                    </ModalBody>
                </Modal>
            </div>
            
        );
    }
}

const mapStateToProps = (state) => ({
    diary: state.diary,
})

export default connect(mapStateToProps, { addComment, addImage } )(Gallery);