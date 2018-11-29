import React, {Component} from 'react';
import {Pagination } from 'antd'
import './index.css'

class List extends Component {
    constructor(props) {
        super(props)
    }
    render(){
        return(
            <div id='list'>
                <div className='table'>
                    <div className='tableTitle'>
                        {this.props.columns.map((item,index)=><div key={index}>{item}</div>)}
                    </div>
                    <div className='tableContent'>
                        {this.props.children}
                        {/*{this.props.dataSource.map((item,index)=>{*/}
                            {/*return (*/}
                                {/*<div key={index} className='tableItem'>*/}
                                    {/*<span>{item.date}</span>*/}
                                    {/*<span>{item.name}</span>*/}
                                    {/*<span>{item.province}</span>*/}
                                    {/*<span>{item.district}</span>*/}
                                    {/*<span>{item.address}</span>*/}
                                    {/*<span className='check'>*/}
                                        {/*<span onClick={()=>this.props.check(item)}>查看</span>*/}
                                        {/*<span onClick={()=>this.props.edit(item)}>编辑</span>*/}
                                    {/*</span>*/}
                                {/*</div>*/}
                            {/*);*/}
                        {/*})}*/}
                    </div>
                </div>
                {this.props.total<=this.props.pageSize?null:(<div className='pagination'>
                    <Pagination
                        hideOnSinglePage={true}
                        showQuickJumper
                        defaultCurrent={1}
                        total={this.props.total}
                        pageSize={this.props.pageSize}
                        onChange={(pageNumber)=>{this.onChange(pageNumber)}}
                        current={this.props.current}/>,
                </div>)}
            </div>
        )
    }
    componentDidMount(){
    }
    onChange(pageNumber){
        if(this.props.onChange){
            this.props.onChange(pageNumber)
        }
    }
}

export default List;
