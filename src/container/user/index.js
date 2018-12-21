import React, { Component } from 'react';
import './index.css'
import { Table, Input, Button, Pagination, Modal, DatePicker, message, notification } from 'antd'
import List from '../list'
import { withRouter } from 'react-router-dom'
import { get } from '../../util'
import storage from 'good-storage'

const columns = ['id', '商品名称', '折扣价', '商品分类', '操作'];

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            startValue: null,
            start:null,
            end:null,
            endValue: null,
            endOpen: false,
            secKillInfo: {},
            dataSource: [],
            secKillPrice: null,
            secKillnum: null,
        }
    }
    render() {
        return (
            <div id='user'>
                <div className='search'>
                    {/* <Input style={{ width: '50%' }} placeholder="请输入" /> */}
                    {/* <Button icon="search" type="primary">搜索</Button> */}
                </div>
                <List
                    columns={columns}>
                    {
                        this.state.dataSource.map((item, index) => {
                            return (
                                <div key={index} className='tableItem'>
                                    <span>{item.goods.id}</span>
                                    <span>{item.goods.goodsTitle}</span>
                                    <span>{item.goods.discountPrice}</span>
                                    <span>{item.goods.goodsCategory}</span>
                                    <span className='check'>
                                        {/* <span onClick={() => this.check(item)}>查看</span> */}
                                        <span onClick={() => {
                                            this.handleerClick('编辑商品', '/edit', item)
                                        }}>编辑</span>
                                        <span onClick={() => { this.deleteShop(item) }}>删除</span>
                                        {item.goods.isOnline == 1 ? <span onClick={() => { this.xiajia(item) }}>下架</span> : <span onClick={() => { this.shangjia(item) }}>上架</span>}
                                        <span onClick={() => this.showModal(item)}>抢购</span>
                                    </span>
                                </div>
                            );
                        })
                    }
                </List>
                <Modal
                    title="设置抢购"
                    visible={this.state.visible}
                    afterClose={() => this.afterClose()}
                    // onOk={() => this.handleOk()}
                    onCancel={() => this.handleCancel1()}
                    footer={[
                        this.state.secKillInfo.id ? <Button key='cnacel' onClick={() => this.handleCancel()}>取消抢购</Button> : '',
                        !this.state.secKillInfo.id ? <Button key='save' type="primary" onClick={() => this.handleOk()}>
                            保存
                        </Button> : '',
                    ]}
                >
                    <div>
                        <span>抢购价格</span>
                        <Input value={this.state.secKillPrice} onChange={(e) => { this.handelChange('secKillPrice', e) }} placeholder='请输入抢购价格' />
                    </div>
                    <div>
                        <span>抢购数量</span>
                        <Input value={this.state.secKillnum} onChange={(e) => { this.handelChange('secKillnum', e) }} placeholder='请输入抢购数量' />
                    </div>
                    <div>
                        <p>开始时间</p>
                        {!this.state.secKillInfo.id?<DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            value={this.state.startValue}
                            placeholder="Start"
                            onChange={(e) => this.onStartChange(e)}
                        />:<Input value={this.state.startValue} onChange={(e) => { this.handelChange('start', e) }} placeholder='抢购开始时间' />}
                    </div>
                    <div>
                        <p>结束时间</p>
                        {!this.state.secKillInfo.id?<DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            value={this.state.endValue}
                            placeholder="End"
                            onChange={(e) => this.onEndChange(e)}
                        />:<Input value={this.state.startValue} onChange={(e) => { this.handelChange('end', e) }} placeholder='抢购结束时间' />}
                    </div>
                </Modal>

            </div>
        )
    }

    onChange(num) {
        console.log(num);
    }

    handelChange(key, e) {
        if (this.state.secKillInfo.id) {
            return
        }
        this.setState({
            [key]: e.target.value
        })
        // console.log(e.target.value)
    }

    handleerClick(title, pathname, item) {
        if (pathname) {
            if (this.props.location.pathname == pathname) {
                return
            }
            storage.set('shopDetail', item)
            this.props.history.push({ pathname })
        }
    }

    async showModal(item) {
        let hide = null;
        try {
            hide = message.loading('查询中', 0);
            const result = await get('/seckill/isKillingNow', {
                tgwGoodsId: item.goodsDetail.tgwGoodsId
            })
            if (result.status) {
                this.setState({
                    visible: true
                })
            } else {
                this.setState({
                    secKillInfo: result.info.tgwSeckill,
                    secKillnum: result.info.tgwSeckill.seckillRepertory,
                    secKillPrice: result.info.tgwSeckill.seckillPrice,
                    startValue:result.info.tgwSeckill.seckillCreattime,
                    endValue:result.info.tgwSeckill.seckillEnd,
                    visible: true
                })
            }
            storage.set('shopDetail', item)

        } catch (e) {
            notification.open({
                message: '提示',
                description: '网络出错',
            });
        } finally {
            hide()
        }
    }

    async handleOk() {
        if (!this.state.secKillnum || !this.state.secKillPrice || !this.state.endValue || !this.state.startValue) {
            message.warning('请把信息填写完整')
            return
        }
        let hide = null;
        try {
            hide = message.loading('提交中', 0);
            const result = await get('/seckill/insertSeckill', {
                seckillEnd: +new Date(this.state.endValue._d),
                tgwGoodsId: storage.get('shopDetail').goodsDetail.tgwGoodsId,
                seckillRepertory: this.state.secKillnum,
                seckillCreattime: +new Date(this.state.startValue._d),
                seckillPrice: this.state.secKillPrice
            })
            if (result.status) {
                message.success('成功')
                this.setState({
                    visible: false,
                });
            } else {
                message.success('失败')
            }

        } catch (e) {
            notification.open({
                message: '提示',
                description: '网络出错',
            });
        } finally {
            hide()
            this.setState({
                startValue: null,
                endValue: null,
                secKillPrice: null,
                secKillnum: null,
            })
        }
    }

    async getShopList() {
        let hide = null;
        try {
            hide = message.loading('查询中', 0);
            const result = await get('/tjsanshao/businessman/goods')
            if (result.status != 'success') {
                message.error(result.message)
            }
            if (result.status == 'success') {
                this.setState({
                    dataSource: result.list
                })
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

    async deleteShop(item) {
        let hide = null;
        try {
            hide = message.loading('删除中', 0);
            const result = await get('/xiaojian/deleteGoods', { goodsId: item.goods.id })
            if (result.status == 'success') {
                this.getShopList()
                message.success('删除成功')
            } else {
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

    async xiajia(item) {
        let hide = null;
        try {
            hide = message.loading('下架中', 0);
            const result = await get('/xiaojian/downGoods', { goodsId: item.goods.id })
            if (result.status == 'success') {
                this.getShopList()
                message.success('下架成功')
            } else {
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

    async shangjia(item) {
        let hide = null;
        try {
            hide = message.loading('上架中', 0);
            const result = await get('/xiaojian/upGoods', { goodsId: item.goods.id })
            if (result.status == 'success') {
                this.getShopList()
                message.success('上架成功')
            } else {
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

    handleCancel1() {
        this.setState({
            visible: false,

            startValue: null,
            endValue: null,
            secKillPrice: null,
            secKillnum: null,

        });
    }
    afterClose() {
        this.setState({
            secKillInfo: {}
        });
    }

    async handleCancel() {
        let hide = null;
        try {
            hide = message.loading('取消中', 0);
            const result = await get('/seckill/deleteSeckilling', {
                id: this.state.secKillInfo.id
            })
            this.setState({
                visible: false,
            });
        } catch (e) {
            notification.open({
                message: '提示',
                description: '网络出错',
            });
        } finally {
            hide()
            this.setState({
                startValue: null,
                endValue: null,
                secKillPrice: null,
                secKillnum: null,
            })
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

    componentDidMount() {
        this.getShopList()
    }

}

export default withRouter(User);
