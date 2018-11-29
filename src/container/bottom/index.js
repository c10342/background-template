import React, {Component, Fragment} from 'react';
import {Layout} from 'antd';
const {Footer} = Layout

class Bottom extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                <Footer style={{textAlign: 'center',backgroundColor:'#1F3668',
                padding:0,height:32,color:'white',lineHeight:'32px'}}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Fragment>
        )
    }
}

export default Bottom;
