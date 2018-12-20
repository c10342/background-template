import React, { Component } from 'react';
import './index.css'
import { Table, Input, Button, Pagination,message,notification } from 'antd'
import List from '../list'
import {formatDate,get} from '../../util'

const columns = ['id', '创建时间', '订单编号','时间'];

class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            pageSize:6,
            total:0
        }
    }
    render() {
        return (
            <div id='order'>
                <div className='search'>
                    {/* <Input style={{ width: '50%' }} placeholder="请输入" />
                    <Button icon="search" type="primary">搜索</Button> */}
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
    async getShopList() {
        let hide =null;
        try {
            hide = message.loading('查询中', 0);
            const result = await get('/tjsanshao/businessman/orders')
            if(result.status != 'success'){
                message.error(result.message)
            }
            if(result.status == 'success'){
                this.setState({
                    dataSource:result.list,
                    total:result.total
                })
            }
        } catch (e) {
            notification.open({
                message: '提示',
                description: '网络出错',
              });
         }finally{
            hide()
        }
    }
}

export default Order;
