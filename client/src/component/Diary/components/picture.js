import React from "react";
//import styled, { css } from "styled-components";
import Element from "./element";
import "./style.css";

export default class Picture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {},
    };
    this.scale = 1.0;
    this.rotateDeg = 0;
  }

  MousewheelScale = e => {
    //https://github.com/panyefan/ShowPicture/blob/master/ShowPicture/ShowPicture.js
    
    //console.log("mouse", e.deltaY);
    //滾輪往下deltaY>0
    if(this.props.status==="zoom"){
        //console.log("status",this.props.status)
        if (e.deltaY > 0) {
        this.scale = this.scale - 0.1;
        } else {
        this.scale = this.scale + 0.1;
        }
        this.setState({
        style: { transform: `rotate(${this.rotateDeg}deg) scale(${this.scale})` }
        });
        //console.log("this.scale: ", this.scale);
        e.stopPropagation();
        e.preventDefault();
    }
    else if(this.props.status==="rotate"){
        //console.log("status",this.props.status)
        if(e.deltaY > 0){
            this.rotateDeg = this.rotateDeg - 2;
        }
        else{
            this.rotateDeg = this.rotateDeg + 2;
        }
        this.setState({
            style: { transform: `rotate(${this.rotateDeg}deg) scale(${this.scale})` }
        });
        e.stopPropagation();
        e.preventDefault();

    }
    
};
  /*
  handleMouseDown = e => {
      //console.log("md: ",e.clientX,e.clientY);
      this.setState({
        isDragging: true,
        
      })
      
  };
  handleMouseMove = e => {
      console.log("mm",e.clientX,e.clientY);
      if (!this.state.isDragging) return;

      this.setState({
        style: { transform: `translate(${e.clientX-this.state.oriX}px,${e.clientY-this.state.oriY})` }
      })
      console.log(this.state.style)
  };
  handleMouseUp = e => {
      console.log("mu")
      this.setState({
          isDragging:false
      })
      
  };
  */
  render() {
    //console.log("render pic",this.props.status)
    /*
    return (
      <img
        src={this.props.src}
        className="pic"
        onWheel={this.MousewheelScale.bind(this)}
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
        style={this.state.style}
      />
    );
    */
    
    return (
        
      <Element>

        <img
          src={this.props.src}
          className="pic"
          onWheel={this.MousewheelScale.bind(this)}
          style={this.state.style}
          alt=""
        />
      </Element>
    );
    
  }
}

