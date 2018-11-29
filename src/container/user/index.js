import React, {Component} from 'react';
import './index.css'
import {Table,Input,Button,Pagination } from 'antd'
import List from '../list'

const columns = ['日期','姓名','省份','市区','地址','操作'];

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource:[{
                key: '1',
                date:'2018-11-11',
                name: '胡彦斌',
                province: '广东省',
                district:'湛江市',
                address: '西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号',
            }, {
                key: '2',
                date:'2018-11-11',
                name: '胡彦斌',
                province: '广东省',
                district:'湛江市',
                address: '西湖区湖底公园1号',
            }, {
                key: '3',
                date:'2018-11-11',
                name: '胡彦斌',
                province: '广东省',
                district:'湛江市',
                address: '西湖区湖底公园1号',
            }, {
                key: '4',
                date:'2018-11-11',
                name: '胡彦斌',
                province: '广东省',
                district:'湛江市',
                address: '西湖区湖底公园1号',
            }, {
                key: '5',
                date:'2018-11-11',
                name: '胡彦斌',
                province: '广东省',
                district:'湛江市',
                address: '西湖区湖底公园1号',
            }, {
                key: '6',
                date:'2018-11-11',
                name: '胡彦斌',
                province: '广东省',
                district:'湛江市',
                address: '西湖区湖底公园1号',
            }]
        }
    }
    render(){
        return(
            <div id='user'>
                <div className='search'>
                    <Input style={{width:'50%'}} placeholder="请输入" />
                    <Button icon="search" type="primary">搜索</Button>
                </div>
                <List
                    onChange={this.onChange.bind(this)}
                    check={this.check.bind(this)}
                    edit={this.edit.bind(this)}
                    columns={columns}
                    dataSource={this.state.dataSource} />
            </div>
        )
    }

    onChange(num){
        console.log(num);
    }
    check(obj){
        console.log(obj);
    }
    edit(obj){
        console.log(obj);
    }

}

export default User;
