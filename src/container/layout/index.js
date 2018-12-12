import './index.css'
import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import {Route, withRouter, Redirect} from 'react-router-dom'
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import avatar from './images/default.png'
import QueueAnim from 'rc-queue-anim'

import User from '../user'
import Order from '../order'
import Bottom from '../bottom'
import AddGood from '../backstage-slider'
import Edit from '../edit' 


const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;


class LayOut extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '商品管理'
        }
        this.router=[
            {
                path:"/shop",
                component:User,
                title:'商品管理'
            },
            {
                path:"/order",
                component:Order,
                title:'订单查看'
            },
            {
                path:"/addGood",
                component:AddGood,
                title:'添加商品'
            },
            {
                path:"/edit",
                component:Edit,
                title:'编辑商品'
            }
        ]
    }

    render() {
        let pathname = this.props.location.pathname
        let router = this.router.filter(item=>item.path == pathname)[0]
        return (
            <Layout id="layout">
                <Header className="header">
                <div className='my-title'>团购网</div>
                    <div className='person'>
                        <img className='avatar' src={avatar} alt=""/>
                        <div className='author'>
                            <span>张三</span>
                            <span>欢迎登录</span>
                            <span>退出</span>
                        </div>
                    </div>
                </Header>
                <Layout>
                    <Sider width={200} style={{background: '#fff', 'overflowY': 'auto', 'overflowX': 'hidden'}}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[pathname]}
                            selectedKeys={[pathname]}
                            style={{height: '100%', borderRight: 0}}
                        >
                            <Menu.Item
                                key="/shop"
                                onClick={() => {
                                    this.handleerClick('商品管理', '/shop')
                                }}>
                                <Icon type="user" theme="outlined"/>
                                <Texty interval={200} delay={400} component={'span'}>
                                    {/* 用户管理 */}
                                    商品管理
                                </Texty>
                            </Menu.Item>
                            <Menu.Item
                                key="/order"
                                onClick={() => {
                                    this.handleerClick('订单查看', '/order')
                                }}>
                                <Icon type="shopping-cart" theme="outlined" />
                                <Texty interval={200} delay={400} component={'span'}>
                                    订单查看
                                </Texty>
                            </Menu.Item>
                            <Menu.Item
                                key="/addGood"
                                onClick={() => {
                                    this.handleerClick('添加商品', '/addGood')
                                }}>
                                <Icon type="google-plus" theme="outlined" />
                                <Texty interval={200} delay={400} component={'span'}>
                                    添加商品
                                </Texty>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <div style={{margin: '16px 0'}}>
                            <h1>
                                <Texty interval={200}>
                                    {this.state.title}
                                </Texty>
                            </h1>
                        </div>
                        <Content style={{background: '#fff', margin: 0, height: 'auto',minHeight:'auto'}}>
                            <QueueAnim duration={2000} type={'scale'}>
                                <Route exact key={router.path} path={router.path} component={router.component}/>
                            </QueueAnim>
                        </Content>
                    </Layout>
                </Layout>
                <Bottom />
            </Layout>
        );
    }

    handleerClick(title, pathname) {
        this.setState({title})
        if (pathname) {
            if (this.props.location.pathname == pathname) {
                return
            }
            this.props.history.push({pathname})
        }
    }

    componentWillMount() {
        let pathname = this.props.location.pathname
        let router = this.router.filter(item=>item.path == pathname)[0]
        this.setState({
            title:router.title
        })
    }
}

LayOut = withRouter(LayOut)

export default LayOut;
