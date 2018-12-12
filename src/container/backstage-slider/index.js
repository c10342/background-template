import React, { Component } from 'react';
import { Upload, Icon, message, Input, Button, notification, Switch, Select } from 'antd';
import QueueAnim from 'rc-queue-anim';
import './index.css'
import { post, error, success, formatDate, get } from '../../util'
import axios from 'axios'
import './utf8-jsp/ueditor.config.js'
import './utf8-jsp/ueditor.all.js'
import './utf8-jsp/ueditor.parse.js'

const Option = Select.Option;
const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
    Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
    Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

class BackStageSlider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cities: cityData[provinceData[0]],
            secondCity: cityData[provinceData[0]][0],
            title: null,
            url: null,
            index: null,
            image: null,
            isShowFrom: false,
            total: null,
            pageSize: 6,
            currentPage: 1,
            dataSource: [],
            isCheck: false
        }
    }
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <div id='slider'>
                <div key={'form'} className='form'>
                    <div style={{ marginRight: 20, width: '50%' }}>
                        <div style={{fontSize: 16 }}><div>商品名称 : </div> <Input onChange={(e) => this.onChange(e, 'title')} value={this.state.title} placeholder="请输入商品名称" /></div>
                        <div style={{fontSize: 16 }}>
                            <div>商品原价格 : </div>
                            <Input onChange={(e) => this.onChange(e, 'url')} value={this.state.url} placeholder="请输入商品价格" />
                        </div>
                        <div style={{fontSize: 16 }}>
                            <div>商品打折价格 : </div>
                            <Input onChange={(e) => this.onChange(e, 'url')} value={this.state.url} placeholder="请输入商品打折价格" />
                        </div>
                        <div style={{fontSize: 16 }}>
                            <div>商品库存 : </div>
                            <Input onChange={(e) => this.onChange(e, 'index')} value={this.state.index} placeholder="请输入商品库存" />
                        </div>

                        

                        <div style={{fontSize: 16 }}>
                            <div>商品有效期 : </div>
                            <Input onChange={(e) => this.onChange(e, 'url')} value={this.state.url} placeholder="请输入商品有效期" />
                        </div>
                        <div style={{fontSize: 16 }}>
                            <div>商品描述 : </div>
                            <Input onChange={(e) => this.onChange(e, 'url')} value={this.state.url} placeholder="请输入商品价格" />
                        </div>
                        <div style={{fontSize: 16 }}>
                            <div>是否上架 : </div>
                            <Switch onChange={(e) => this.onSwitchChange(e)} className='switch' />
                        </div>
                        <div style={{fontSize: 16 }}>
                            <div>商品分类 : </div>
                            <div>
                            <Select
                                defaultValue={provinceData[0]}
                                style={{ width: 120 }}
                                onChange={this.handleProvinceChange}
                                style={{ marginTop: 10,marginRight:10 }}
                            >
                                {provinceData.map(province => <Option key={province}>{province}</Option>)}
                            </Select>
                            <Select
                                style={{ width: 120 }}
                                value={this.state.secondCity}
                                onChange={this.onSecondCityChange}
                            
                            >
                                {this.state.cities.map(city => <Option key={city}>{city}</Option>)}
                            </Select>
                            </div>
                        </div>
                    </div>
                    <Upload
                        name="image"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="/v1/banner/"
                        beforeUpload={(file) => this.beforeUpload(file)}
                        onChange={(file) => this.handleChange(file)}
                        customRequest={(e) => this.customRequest(e)}
                        data={{
                            title: '123',
                            url: '4',
                            index: 885645
                        }}
                    >
                        {imageUrl ? <img className='img' src={imageUrl} alt="avatar" /> : uploadButton}
                    </Upload>
                    <script id="container" name="content" type="text/plain">
        这里写你的初始化内容
    </script>
                </div>
                <Button type="primary" onClick={() => this.submit()} style={{ marginLeft: 15,marginTop:10 }}>提交</Button>
            </div>
        )
    }

    handleChange(info) {
        if (!info.file.originFileObj) {
            return
        }
        this.setState({
            image: info.fileList[0].originFileObj
        })
        this.getBase64(info.file.originFileObj, imageUrl => {
            this.setState({
                imageUrl,
            })
        });
    }

    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload(file) {
        const isJPG = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJPG) {
            message.error('只能上传jpg、png、jpeg格式的图片');
        }
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isLt2M) {
            message.error('图片不能大于1MB!');
        }
        return isJPG && isLt2M;
    }

    onChange(e, key) {
        this.setState({
            [key]: e.target.value
        })
    }

    onSwitchChange(e) {
        console.log(e);

    }

    handleProvinceChange = (value) => {
        this.setState({
          cities: cityData[value],
          secondCity: cityData[value][0],
        });
      }
    
      onSecondCityChange = (value) => {
        this.setState({
          secondCity: value,
        });
      }

    onClick() {
        this.setState({
            isShowFrom: !this.state.isShowFrom
        })
    }

    customRequest(e) {
        return false
    }

    async submit() {
        return
        if (!this.state.title && !this.state.url && !this.state.index && !this.state.image) {
            message.error('请把表单填写完整!');
            return
        }
        var formdata = new FormData();


        try {
            notification.open({
                message: '上传中',
                description: '请耐心等待',
                duration: null,
                icon: <Icon type="loading" theme="outlined" />,
                key: 'loading'
            });
            const result = await axios.post('/v1/banner/', formdata, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            if (result.data.succode == 201) {
                success()
            } else {
                error({ description: result.data.msg })
            }
        } catch (e) {
            error({ description: '上传失败' })
        } finally {
            notification.close('loading')
            this.setState({
                title: null,
                url: null,
                index: null,
                image: null,
                imageUrl: null
            })
        }
    }

    async onchange(num) {
        this.setState({
            currentPage: num
        })
        try {
            notification.open({
                message: '加载中',
                description: '请耐心等待',
                duration: null,
                icon: <Icon type="loading" theme="outlined" />,
                key: 'loading'
            });
            const result = await get('/v1/banner/page', {
                pageSize: this.state.pageSize,
                pageNo: num
            })
            this.setState({
                total: result.count,
                dataSource: result.sorts
            })
        } catch (e) {
            error()
        } finally {
            notification.close('loading')
        }
    }

    check(item) {
        this.setState({
            isCheck: true,
            detailInfo: item
        })
    }

    edit(item) { }

    componentDidMount() {
        var ue = UE.getEditor('container');
    }

    onclick(key) {
        this.setState({
            [key]: false
        })
    }
}

export default BackStageSlider;

