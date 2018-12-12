import React, { Component } from 'react';
import './index.css'
import { Table, Input, Button, Pagination } from 'antd'
import List from '../list'
import {withRouter} from 'react-router-dom'

const columns = ['名称', '描述', '价格', '操作'];

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
                                        <span>抢购</span>
                                    </span>
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

    handleerClick(title, pathname) {
        // this.setState({title})
        if (pathname) {
            if (this.props.location.pathname == pathname) {
                return
            }
            this.props.history.push({pathname})
        }
    }

}

export default withRouter(User);
