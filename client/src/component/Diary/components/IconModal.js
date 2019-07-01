import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';
import { connect } from 'react-redux';
import { addImage } from '../../../actions/diaryActions';
import PropTypes from 'prop-types';
import './style.css'
import Sticker from "./Sticker"

class IconModal extends Component {
    state = {
        modal: false,
        url: '',
        sticker:-1,
        
    }
    stickers=["https://stickershop.line-scdn.net/stickershop/v1/sticker/101517001/IOS/sticker.png",
                    "https://stickershop.line-scdn.net/stickershop/v1/sticker/38146793/android/sticker.png",
                    "https://stickershop.line-scdn.net/stickershop/v1/sticker/38146785/android/sticker.png",
                    "https://stickershop.line-scdn.net/stickershop/v1/sticker/38146790/ANDROID/sticker.png",
                    "https://stickershop.line-scdn.net/stickershop/v1/product/3320191/LINEStorePC/main.png;compress=true"

                ]
    static propTypes = {
        addImage: PropTypes.func.isRequired,
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            url: ''
        });
    }
    /*
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    */

    addImg = e => {
        console.log("sub")
        
        e.preventDefault();
        if(this.state.sticker<0){

        }
        else{

            console.log("stic",this.state.url)
            const newImage = {
                url: this.state.url
            }
            // Add image via addImage action
            this.props.addImage(this.props.diaryID, { image: newImage });
        }
        // Close modal
        this.toggle();
        
    }
    clickSticker = (src) => {
        //console.log("url", src)
        this.setState({
            sticker:src,
            url:this.stickers[src]
        })
        console.log(this.state.sticker)
    }
    render() {
        return (
            <div style={{display:'inline'}}>
                <Button
                    className = "botton2"
                    style={{ marginLeft: '1rem' }}
                    onClick={this.toggle}
                >Add Stiker</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader onClick={this.toggle}>Add Stikers to Diary</ModalHeader>
                    <ModalBody>
                        <div>
                            <Sticker src={this.stickers[0]} className="sticker" onClick={this.clickSticker.bind(this,0)} nowStic={this.state.sticker} sel="0"/>
                            <Sticker src={this.stickers[1]} className="sticker" onClick={this.clickSticker.bind(this,1)} nowStic={this.state.sticker} sel="1"/>
                            <Sticker src={this.stickers[2]} className="sticker" onClick={this.clickSticker.bind(this,2)} nowStic={this.state.sticker} sel="2"/>
                            <Sticker src={this.stickers[3]} className="sticker" onClick={this.clickSticker.bind(this,3)} nowStic={this.state.sticker} sel="3"/>                            
                            <Sticker src={this.stickers[4]} className="sticker" onClick={this.clickSticker.bind(this,4)} nowStic={this.state.sticker} sel="4"/>
                         </div>
                         <Button onClick={this.addImg}color="dark" style={{ marginTop: '0px' }} block>
                            Add Image
                        </Button>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps, { addImage })(IconModal);
