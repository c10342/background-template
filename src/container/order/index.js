import React, { Component } from 'react';
import './index.css'
import { Table, Input, Button, Pagination } from 'antd'
import List from '../list'

const columns = ['编号', '名称', '价格','时间'];

class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [{
                key: '1',
                date: '2018-11-11',
                name: '胡彦斌',
                province: '广东省',
                time: '6',
            }, {
                key: '2',
                date: '2018-11-11',
                name: '胡彦斌',
                province: '广东省',
                time: '5',
            }, {
                key: '3',
                date: '2018-11-11',
                name: '胡彦斌',
                province: '广东省',
                time: '4',
            }, {
                key: '4',
                date: '2018-11-11',
                name: '胡彦斌',
                province: '广东省',
                time: '3',
            }, {
                key: '5',
                date: '2018-11-11',
                name: '胡彦斌',
                province: '广东省',
                time: '2',
            }, {
                key: '6',
                date: '2018-11-11',
                name: '胡彦斌',
                province: '广东省',
                time: '1',
            }]
        }
    }
    render() {
        return (
            <div id='order'>
                <div className='search'>
                    <Input style={{ width: '50%' }} placeholder="请输入" />
                    <Button icon="search" type="primary">搜索</Button>
                </div>
                <List
                    onChange={this.onChange.bind(this)}
                    pageSize={10}
                    total={100}
                    show
                    columns={columns}>
                    {
                        this.state.dataSource.map((item, index) => {
                            return (
                                <div key={index} className='tableItem'>
                                    <span>{item.date}</span>
                                    <span>{item.name}</span>
                                    <span>{item.province}</span>
                                    <span>{item.time}</span>
                                    {/* <span className='check'>
                                        <span onClick={() => this.check(item)}>查看</span>
                                        <span onClick={() => this.edit(item)}>编辑</span>
                                    </span> */}
                                </div>
                            );
                        })
                    }
                </List>
            </div>
        )
    }
    onChange(num) {
        console.log(num);
    }
    check(obj) {
        console.log(obj);
    }
    edit(obj) {
        console.log(obj);
    }
}

export default Order;
