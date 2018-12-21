import React, { Component } from 'react';
import './index.css'
import { Table, Input, Button, Pagination, message, notification, Select } from 'antd'
import List from '../list'
import { formatDate, get } from '../../util'

const columns = ['id', '创建时间', '订单编号', '订单状态'];
const Option = Select.Option;

class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            pageSize: 6,
            total: 0,
            path: '/tjsanshao/businessman/orders',
            page:1,
            orderNum:null
        }
    }
    render() {
        return (
            <div id='order'>
                <div className='search'>
                    <Select defaultValue="/tjsanshao/businessman/orders" style={{ width: 150 }} onChange={(e) => this.handelSelect(e)}>
                        <Option value="/tjsanshao/businessman/orders">所有订单</Option>
                        <Option value="/tjsanshao/businessman/orders7days">7天内的订单</Option>
                        <Option value="/tjsanshao/businessman/orders30days">30天内的订单</Option>
                    </Select>
                    <div style={{'padding':'0 50px','display':'flex','flexDirection':'row'}}>
                    <Input value={this.state.orderNum} onChange={(e)=>{this.onInputChange('orderNum',e)}} style={{'width':'300px'}}  placeholder='订单编号' />
                    <Button onClick={() => { this.xiaofei() }}>确认消费订单</Button>
                    </div>
                </div>
                <List
                    onChange={this.onChange.bind(this)}
                    pageSize={this.state.pageSize}
                    total={this.state.total}
                    show
                    current={this.state.page}
                    columns={columns}>
                    {
                        this.state.dataSource.map((item, index) => {
                            return (
                                <div key={index} className='tableItem'>
                                    <span>{item.id}</span>
                                    <span>{item.orderCreateTime}</span>
                                    <span>{item.uniqueOrderNumber}</span>
                                    <span>
                                        {item.sellStatus == 0 ? '未付款' :
                                            item.sellStatus == 1 ? '已付款' :
                                                item.sellStatus == 2 ? '退款' :
                                                    item.sellStatus == 3 ? '已使用' :
                                                        item.sellStatus == 4 ? '已评论' : '已过期'}
                                    </span>
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
        this.setState({
            page:num
        },function(){
            this.getShopList(this.state.path)
        })
    }

    onInputChange(key,e){
        this.setState({
            [key]:e.target.value
        })
    }

    async xiaofei() {
        const item = this.state.dataSource.find(i=>i.uniqueOrderNumber == this.state.orderNum)
        if (item.sellStatus == 1) {
            let hide = null;
            try {
                hide = message.loading('提交中', 0);
                const result = await get('/tjsanshao/businessman/orderConsume',{orderNumber:item.uniqueOrderNumber})
                if(result.status == 'success'){
                    message.success('成功')
                    this.getShopList(this.state.path)
                }else{
                    message.error(result.message)
                }
            } catch (e) {
                notification.open({
                    message: '提示',
                    description: '网络出错',
                });
            } finally {
                hide()
            }
        }
    }

    handelSelect(e) {
        this.setState({
            path: e,
            page:1
        },function(){
            this.getShopList(e)
        })
    }
    check(obj) {
        console.log(obj);
    }
    edit(obj) {
        console.log(obj);
    }
    componentDidMount() {
        this.getShopList('/tjsanshao/businessman/orders')
    }
    async getShopList(path) {
        let hide = null;
        try {
            hide = message.loading('查询中', 0);
            const result = await get(path,{page:this.state.page,pageSize:this.state.pageSize})
            if (result.status != 'success') {
                message.error(result.message)
            }
            if (result.status == 'success') {
                this.setState({
                    dataSource: result.pageInfo.list,
                    total: result.pageInfo.total
                })
            }
        } catch (e) {
            console.log(e)
            notification.open({
                message: '提示',
                description: '网络出错',
            });
        } finally {
            hide()
        }
    }
}

export default Order;
