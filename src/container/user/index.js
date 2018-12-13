import React, { Component } from 'react';
import './index.css'
import { Table, Input, Button, Pagination, Modal, DatePicker,message,notification  } from 'antd'
import List from '../list'
import { withRouter } from 'react-router-dom'
import { get } from '../../util'

const columns = ['名称', '描述', '价格', '操作'];

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            startValue: null,
            endValue: null,
            endOpen: false,
            secKillInfo:{},
            dataSource: [{
                key: '1',
                date: '2018-11-11',
                name: '胡彦斌',
                province: '广东省',
            }, {
                key: '2',
                date: '2018-11-11',
                name: '胡彦斌',
                province: '广东省',
            }, {
                key: '3',
                date: '2018-11-11',
                name: '胡彦斌',
                province: '广东省',
            }, {
                key: '4',
                date: '2018-11-11',
                name: '胡彦斌',
                province: '广东省',
            }, {
                key: '5',
                date: '2018-11-11',
                name: '胡彦斌',
                province: '广东省',
            }, {
                key: '6',
                date: '2018-11-11',
                name: '胡彦斌',
                province: '广东省',
            }]
        }
    }
    render() {
        return (
            <div id='user'>
                <div className='search'>
                    <Input style={{ width: '50%' }} placeholder="请输入" />
                    <Button icon="search" type="primary">搜索</Button>
                </div>
                <List
                    columns={columns}>
                    {
                        this.state.dataSource.map((item, index) => {
                            return (
                                <div key={index} className='tableItem'>
                                    <span>{item.date}</span>
                                    <span>{item.name}</span>
                                    <span>{item.province}</span>
                                    <span className='check'>
                                        {/* <span onClick={() => this.check(item)}>查看</span> */}
                                        <span onClick={() => {
                                            this.handleerClick('编辑商品', '/edit')
                                        }}>编辑</span>
                                        <span>删除</span>
                                        <span>上架</span>
                                        <span onClick={() => this.showModal()}>抢购</span>
                                    </span>
                                </div>
                            );
                        })
                    }
                </List>
                <Modal
                    cancelText='取消抢购'
                    title="设置抢购"
                    visible={this.state.visible}
                    onOk={() => this.handleOk()}
                    onCancel={() => this.handleCancel()}
                >
                    <div>
                        <span>抢购价格</span>
                        <Input placeholder='请输入抢购价格' />
                    </div>
                    <div>
                        <span>抢购数量</span>
                        <Input placeholder='请输入抢购数量' />
                    </div>
                    <div>
                        <p>开始时间</p>
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            value={this.state.startValue}
                            placeholder="Start"
                            onChange={(e) => this.onStartChange(e)}
                        />
                    </div>
                    <div>
                        <p>结束时间</p>
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            value={this.state.endValue}
                            placeholder="End"
                            onChange={(e) => this.onEndChange(e)}
                        />
                    </div>
                </Modal>

            </div>
        )
    }

    onChange(num) {
        console.log(num);
    }

    handleerClick(title, pathname) {
        if (pathname) {
            if (this.props.location.pathname == pathname) {
                return
            }
            this.props.history.push({ pathname })
        }
    }

    async showModal() {
        let hide =null;
        try {
            hide = message.loading('查询中', 0);
            const result = await get('/seckill/isKillingNow', {
                tgwGoodsId: 346150527
            })
            this.setState({
                secKillInfo:result.info.tgwSeckill
            })
            this.setState({
                visible: true
            });
        } catch (e) {
            notification.open({
                message: '提示',
                description: '网络出错',
              });
         }finally{
            hide()
        }
    }

    async handleOk() {
        let hide =null;
        try {
            hide = message.loading('提交中', 0);
            const result = await get('/seckill/insertSeckill', {
                seckillEnd: +new Date(this.state.endValue._d),
                tgwGoodsId: 151577047,
                seckillRepertory: 100,
                seckillCreattime: +new Date(this.state.startValue._d),
                seckillPrice: 4
            })
            this.setState({
                visible: false,
            });
        } catch (e) {
            notification.open({
                message: '提示',
                description: '网络出错',
              });
         }finally{
            hide()
        }
    }

    async handleCancel() {
        let hide =null;
        try {
            hide = message.loading('取消中', 0);
          const result = await get('/seckill/deleteSeckilling',{
            id:this.state.secKillInfo.id
          })  
          this.setState({
            visible: false,
        });
        } catch (e) {
            notification.open({
                message: '提示',
                description: '网络出错',
              });
         }finally{
            hide()
        }
    }
    onStartChange(e) {
        this.onChange('startValue', e);
    }
    onEndChange(e) {
        this.onChange('endValue', e);
    }
    onChange(field, value) {
        this.setState({
            [field]: value,
        });
    }

}

export default withRouter(User);
