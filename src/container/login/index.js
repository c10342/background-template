import React, {Component} from 'react';
import {Layout,Icon,Input,Button,message} from 'antd'
import './index.css'
import {post} from '../../util'
import storage from 'good-storage'

const {Header,Content,Footer} = Layout

class Login extends Component {
    constructor(props) {
        super(props)
        this.state={
            username:'13427491053',
            password:123456
        }
    }
    render(){
        return(
            <div id='login'>
                <Layout>
                    <Header className='header' style={{backgroundColor:'#12203E'}}>
                        <div></div>
                        <div style={{color:'#C3C7CE',fontSize:16}}>
                            <Icon style={{border:'1px solid #ccc',borderRadius:'50%',padding:5}} type="user" theme="outlined" />
                            <span style={{marginLeft:10}}>请先登录</span>
                        </div>
                    </Header>
                    <Content className='content'>
                        <div></div>
                        <div>
                            <div className='bg'></div>
                            <div className='input'>
                                <div><h2>Welcome~</h2></div>
                                <div><Input onChange={(e)=>this.onChange(e,'username')} value={this.state.username} placeholder="请输入账号" size={'large'} /></div>
                                <div><Input onChange={(e)=>this.onChange(e,'password')} type='password' value={this.state.password} placeholder="请输入密码" size={'large'} /></div>
                                <div><Button onClick={()=>this.login()} size={'large'} type="primary" block>登录</Button></div>
                            </div>
                        </div>
                    </Content>
                    <Footer className='footer'>团购网商家后台</Footer>
                </Layout>
            </div>
        )
    }
    async login(){
        try {
            const formData = new FormData()
            formData.append('username',this.state.username)
            formData.append('password',this.state.password)
            const result = await post('/tjsanshao/businessman/login',formData)
            if(result.status == 'success'){
                storage.set('userInfo',result.businessman)
                this.props.history.push({
                    pathname:'/shop'
                })
            }else{
                message.error('登陆失败')
            }
        } catch (error) {
            message.error('服务器或者网络失败')
        }
    }
    onChange(e,key){
        this.setState({
            [key]:e.target.value
        })
    }
}

export default Login;
