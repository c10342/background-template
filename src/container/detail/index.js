import React, {Component} from 'react';
import {Icon} from 'antd'
import img from './bg.jpg'
import  './index.css'

class Detail extends Component {
    constructor(props) {
        super(props)
    }
    render(){
        return(
            <div id='detail'>
                <div className='content'>
                    <Icon onClick={()=>{this.onClick()}} className='icon' type="close" theme="outlined" />
                    <img className='image' src={this.props.img || img} alt=""/>
                    <div className='item'>
                    {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
    onClick(){
        if(this.props.onClick){
            this.props.onClick()
        }
    }
}

export default Detail;
