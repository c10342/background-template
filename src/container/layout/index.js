import './index.css'
import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import {Route, withRouter, Redirect} from 'react-router-dom'
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import avatar from './images/default.png'

import Home from '../home'
import User from '../user'
import GroupList from '../group-list'
import GroupReport from '../group-report'
import GroupExamine from '../group-examine'
import BackStageCategory from '../backstage-category'
import BackStageSlider from '../backstage-slider'
import BackStageStart from '../backstage-start'
import SystemJurisdiction from '../system-jurisdiction'
import SystemNumber from '../system-number'
import Bottom from '../bottom'


const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;


class LayOut extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '首页'
        }
        this.router=[
            {
                path:"/home",
                component:Home,
                title:'首页'
            },
            {
                path:"/user",
                component:User,
                title:'用户管理'
            },
            {
                path:"/backstage/category",
                component:BackStageCategory,
                title:'群类别管理'
            },
            {
                path:"/backstage/slider",
                component:BackStageSlider,
                title:'轮播图管理'
            },
            {
                path:"/backstage/start",
                component:BackStageStart,
                title:'启动项管理'
            },
            {
                path:"/group/list",
                component:GroupList,
                title:'群列表'
            },
            {
                path:"/group/report",
                component:GroupReport,
                title:'群审核'
            },
            {
                path:"/group/examine",
                component:GroupExamine,
                title:'群举报'
            },
            {
                path:"/system/jurisdiction",
                component:SystemJurisdiction,
                title:'权限管理'
            },
            {
                path:"/system/number",
                component:SystemNumber,
                title:'账号管理'
            },
        ]
    }

    render() {
        let pathname = this.props.location.pathname
        let router = this.router.filter(item=>item.path == pathname)[0]
        return (
            <Layout id="layout">
                <Header className="header">
                <div class='my-title'>团购网</div>
                    {/* <div className='logo'></div> */}
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
                                key="/home"
                                onClick={() => {
                                    this.handleerClick('首页', '/home')
                                }}>
                                <Icon type="home" theme="outlined"/>
                                <Texty interval={200} component={'span'}>
                                    首页
                                </Texty>
                            </Menu.Item>
                            <Menu.Item
                                key="/user"
                                onClick={() => {
                                    this.handleerClick('用户管理', '/user')
                                }}>
                                <Icon type="user" theme="outlined"/>
                                <Texty interval={200} delay={400} component={'span'}>
                                    {/* 用户管理 */}
                                    商品管理
                                </Texty>
                            </Menu.Item>

                            <SubMenu
                                key="/group"
                                title={
                                    <span
                                        className='my-item'
                                        onClick={() => {
                                            this.handleerClick('群列表', '/group/list')
                                        }}
                                    >
                                        <Icon type="usergroup-add" theme="outlined"/><Texty interval={200} delay={1200} component={'span'}>群组管理</Texty></span>}>
                                <Menu.Item onClick={() => {
                                    this.handleerClick('群列表', '/group/list')
                                }} key="/group/list"> <Texty interval={200}>群列表</Texty></Menu.Item>
                                <Menu.Item onClick={() => {
                                    this.handleerClick('群审核', '/group/report')
                                }} key="/group/report"><Texty interval={200} delay={600}>群审核</Texty></Menu.Item>
                                <Menu.Item onClick={() => {
                                    this.handleerClick('群举报', '/group/examine')
                                }} key="/group/examine"><Texty interval={200} delay={1200}>群举报</Texty></Menu.Item>
                            </SubMenu>
                            <SubMenu key="/backstage" title={
                                <span
                                    className='my-item'
                                    onClick={() => {
                                        this.handleerClick('启动项管理', '/backstage/start')
                                    }}
                                ><Icon type="pic-left" theme="outlined"/><Texty interval={200} delay={2000} component={'span'}>后台设置</Texty></span>}>
                                <Menu.Item onClick={() => {
                                    this.handleerClick('启动项管理', '/backstage/start')
                                }} key='/backstage/start'><Texty interval={200}>启动项管理</Texty></Menu.Item>
                                <Menu.Item onClick={() => {
                                    this.handleerClick('轮播图管理', '/backstage/slider')
                                }} key="/backstage/slider"><Texty interval={200} delay={1000}>轮播图管理</Texty></Menu.Item>
                                <Menu.Item onClick={() => {
                                    this.handleerClick('群类别管理', '/backstage/category')
                                }} key="/backstage/category"><Texty interval={200} delay={2000}>群类别管理</Texty></Menu.Item>
                            </SubMenu>
                            <SubMenu key="/system" title={<span
                                className='my-item'
                                onClick={() => {
                                    this.handleerClick('权限设置', '/system/jurisdiction')
                                }}
                            ><Icon type="setting" theme="outlined"/><Texty interval={200} delay={2800}
                                                                           component={'span'}>系统设置</Texty></span>}>
                                <Menu.Item onClick={() => {
                                    this.handleerClick('权限管理', '/system/jurisdiction')
                                }} key="/system/jurisdiction"><Texty interval={200}>权限管理</Texty></Menu.Item>
                                <Menu.Item onClick={() => {
                                    this.handleerClick('账号管理', '/system/number')
                                }} key="/system/number"><Texty interval={200} delay={800}>账号管理</Texty></Menu.Item>
                            </SubMenu>

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
