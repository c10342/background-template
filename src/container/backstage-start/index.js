import React, {Component} from 'react';
import {get, put, error} from '../../util/index'
import {Switch,notification,Icon} from 'antd'
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import './index.css'

class BackStageStart extends Component {
    render() {
        return (
            <div id='start'>
                    <div className='item'>
                        <Texty mode={'reverse'} interval={200} delay={500}>品牌logo</Texty>
                        <Switch onChange={(e) => this.onChange(e, 'IsBrand')} className='switch'
                                checked={this.state.IsBrand}/>
                    </div>
                    <div className='item'>
                        <Texty mode={'smooth'} type={'alpha'} interval={200} delay={700}>搜索</Texty>
                        <Switch onChange={(e) => this.onChange(e, 'IsSearch')} className='switch'
                                checked={this.state.IsSearch}/>
                    </div>
                    <div className='item'>
                        <Texty mode={'reverse'} type={'scale'} interval={200} delay={900}>轮播图</Texty>
                        <Switch onChange={(e) => this.onChange(e, 'IsCarousel')} className='switch'
                                checked={this.state.IsCarousel}/>
                    </div>
                    <div className='item'>
                        <Texty mode={'random'} type={'scaleX'} interval={200} delay={1100}>个人中心</Texty>
                        <Switch onChange={(e) => this.onChange(e, 'IsPersonal')} className='switch'
                                checked={this.state.IsPersonal}/>
                    </div>
                    <div className='item'>
                        <Texty mode={'reverse'} type={'scaleX'} interval={200} delay={1300}>发布按钮</Texty>
                        <Switch onChange={(e) => this.onChange(e, 'IsRelease')} className='switch'
                                checked={this.state.IsRelease}/>
                    </div>
            </div>
        )
    }

    constructor(props) {
        super(props)
        this.state = {
            IsBrand: false,
            IsSearch: false,
            IsCarousel: false,
            IsPersonal: false,
            IsRelease: false
        }
    }

    async componentDidMount() {
        try {
            notification.open({
                message:'加载中',
                description:'请耐心等待',
                duration:null,
                icon:<Icon type="loading" theme="outlined" />,
                key:'loading'
            });
            const result = await get('/v1/sw/')
            if (result.succode == 200) {
                this.setState({
                    ...result.data
                })
            } else {
                error()
            }
        } catch (e) {
            error()
        }finally{
            notification.close('loading')
        }
    }

    async onChange(e, key) {
        this.setState({
            [key]: e
        })
        try {
            notification.open({
                message:'修改中',
                description:'请耐心等待',
                duration:null,
                icon:<Icon type="loading" theme="outlined" />,
                key:'loading'
            });
            const result = await put('/v1/sw/', {"switch": key})
            if (result.succode == 200) {
            } else {
                error()
            }
        } catch (e) {
            error()
        }finally{
            notification.close('loading')
        }
    }
}

export default BackStageStart;
