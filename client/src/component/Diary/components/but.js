import React, {Component} from "react";
// import { conditionalExpression } from "@babel/types";
import styled from 'styled-components'

export default class but extends Component {
    constructor(props){
        super(props);
        this.state = {
            width:"20px",
            opacity:1.0
        };
        this.width="20px";
        this.opacity=1.0;
    }

    butOnClick = (e) => {
        this.props.onClick(e);
        /*
        if(this.props.stat===this.props.id){
            console.log("prop",this.props.stat)
            this.setState({
                width:"25px",
                opacity:1.0
            })
        }
        else{
            this.setState({
                width:"20px",
                opacity:0.8
            })
        }
        */
    }

    render(){
        let w="20px";
        let op=1.0;
        if(this.props.stat===this.props.id){
            w="23px";
            op=1.0;
        }
        else{
            w="20px";
            op=0.8;
        }
        const Image=styled.img`
            width:${w}
            opacity:${op}
        `;
        
        //console.log("render but",this.props.id,this.state.scale, this.state.opacity)
        return( 
            <span>
                <Image src={this.props.src} 
                    className="icon" 
                    onClick={this.butOnClick.bind(this)} 
                    alt=""
                />  
            </span>

        );
    }
}