import './index.css'
import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import {Route, withRouter, Redirect} from 'react-router-dom'
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import avatar from './images/default.png'

import User from '../user'
import Order from '../order'
import Bottom from '../bottom'
import AddGood from '../backstage-slider'


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
                            {pathname.indexOf('/group') != -1 ? (
                                <Menu
                                    mode="horizontal"
                                    style={{backgroundColor: 'transparent', fontSize: '16px'}}
                                    defaultSelectedKeys={[pathname]}
                                    selectedKeys={[pathname]}>
                                    <Menu.Item
                                        onClick={() => {
                                            this.handleerClick('群列表', "/group/list")
                                        }}
                                        key="/group/list">
                                        <Texty interval={200}>
                                            群列表
                                        </Texty>
                                    </Menu.Item>
                                    <Menu.Item
                                        onClick={() => {
                                            this.handleerClick('群审核', "/group/report")
                                        }}
                                        key="/group/report">
                                        <Texty interval={200} delay={600}>
                                            群审核
                                        </Texty>
                                    </Menu.Item>
                                    <Menu.Item
                                        onClick={() => {
                                            this.handleerClick('群举报', "/group/examine")
                                        }}
                                        key="/group/examine">
                                        <Texty interval={200} delay={1200}>
                                            群举报
                                        </Texty>
                                    </Menu.Item>
                                </Menu>
                            ) : null}
                            {pathname.indexOf('/backstage') != -1 ? (
                                <Menu
                                    mode="horizontal"
                                    style={{backgroundColor: 'transparent', fontSize: '16px'}}
                                    defaultSelectedKeys={[pathname]}
                                    selectedKeys={[pathname]}>
                                    <Menu.Item
                                        onClick={() => {
                                            this.handleerClick('启动项管理', "/backstage/start")
                                        }}
                                        key='/backstage/start'>
                                        <Texty interval={200}>
                                            启动项管理
                                        </Texty>
                                    </Menu.Item>
                                    <Menu.Item
                                        onClick={() => {
                                            this.handleerClick('轮播图管理', "/backstage/slider")
                                        }}
                                        key="/backstage/slider">
                                        <Texty interval={200} delay={1000}>
                                            轮播图管理
                                        </Texty>
                                    </Menu.Item>
                                    <Menu.Item
                                        onClick={() => {
                                            this.handleerClick('群类别管理', "/backstage/category")
                                        }}
                                        key="/backstage/category">
                                        <Texty interval={200} delay={2000}>
                                            群类别管理
                                        </Texty>
                                    </Menu.Item>
                                </Menu>
                            ) : null}
                            {pathname.indexOf('/system') != -1 ? (
                                <Menu
                                    mode="horizontal"
                                    style={{backgroundColor: 'transparent', fontSize: '16px'}}
                                    defaultSelectedKeys={[pathname]}
                                    selectedKeys={[pathname]}>
                                    <Menu.Item
                                        onClick={() => {
                                            this.handleerClick('权限管理', "/system/jurisdiction")
                                        }}
                                        key="/system/jurisdiction">
                                        <Texty interval={200}>
                                            权限管理
                                        </Texty>
                                    </Menu.Item>
                                    <Menu.Item
                                        onClick={() => {
                                            this.handleerClick('账号管理', "/system/number")
                                        }}
                                        key="/system/number">
                                        <Texty interval={200} delay={800}>
                                            账号管理
                                        </Texty>
                                    </Menu.Item>
                                </Menu>
                            ) : null}
                        </div>
                        <Content style={{background: '#fff', margin: 0, height: 'auto',minHeight:'auto'}}>
                            {/*<QueueAnim duration={2000} type={'scale'}>*/}
                                <Route exact key={router.path} path={router.path} component={router.component}/>
                            {/*</QueueAnim>*/}
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
