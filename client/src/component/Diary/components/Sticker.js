import React, {Component} from "react";
// import { conditionalExpression } from "@babel/types";
import styled from 'styled-components'

export default class Sticker extends Component {
    constructor(props){
        super(props);
    }
    render(){
        console.log(this.props.nowStic,this.props.sel)
        if(this.props.nowStic==this.props.sel){
            return( 
                <img src={this.props.src} onClick={this.props.onClick} className='stickerCho' />

            );
        }
        return( 
            <img src={this.props.src} onClick={this.props.onClick} className={this.props.className}/>
            

        );

    }
}