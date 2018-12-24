import React, { Component } from 'react';
import { Upload, Icon, message, Input, Button, notification, Switch, Select } from 'antd';
import QueueAnim from 'rc-queue-anim';
import './index.css'
import { post, error, success, get } from '../../util'
// import axios from 'axios'
import wangEditor from 'wangeditor'
import storage from 'good-storage'

const Option = Select.Option;
const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
    Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
    Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

class Edit extends Component {
    constructor(props) {
        super(props)
        this.editor2 = null
        this.state = {
            cities: cityData[provinceData[0]],
            secondCity: cityData[provinceData[0]][0],
            name: null,
            price: null,
            discountPrice: null,
            num: null,
            day: null,
            online: null,
            image: null,
            desc: null,
            category: null,
            imageUrl: null
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
            <div id='edit'>
                <div key={'form'} className='form'>
                    <div style={{ marginRight: 20, width: '50%' }}>
                        <div style={{ fontSize: 16 }}><div>商品名称 : </div>
                            <Input defaultValue={this.state.name} onChange={(e) => this.onChange(e, 'name')} value={this.state.name} placeholder="请输入商品名称" />
                        </div>
                        <div style={{ fontSize: 16 }}>
                            <div>商品原价格 : </div>
                            <Input defaultValue={this.state.price} onChange={(e) => this.onChange(e, 'price')} value={this.state.price} placeholder="请输入商品价格" />
                        </div>
                        <div style={{ fontSize: 16 }}>
                            <div>商品打折价格 : </div>
                            <Input defaultValue={this.state.discountPrice} onChange={(e) => this.onChange(e, 'discountPrice')} value={this.state.discountPrice} placeholder="请输入商品打折价格" />
                        </div>
                        <div style={{ fontSize: 16 }}>
                            <div>商品库存 : </div>
                            <Input defaultValue={this.state.num} onChange={(e) => this.onChange(e, 'num')} value={this.state.num} placeholder="请输入商品库存" />
                        </div>
                        <div style={{ fontSize: 16 }}>
                            <div>商品有效期 : </div>
                            <Input defaultValue={this.state.day} onChange={(e) => this.onChange(e, 'day')} value={this.state.day} placeholder="请输入商品有效期" />
                        </div>
                        <div style={{ fontSize: 16 }}>
                            <div>商品分类 : </div>
                            <Input value={this.state.category} onChange={(e) => this.onChange(e, 'category')} placeholder="商品分类" />
                        </div>
                        {/* <div style={{ fontSize: 16 }}>
                            <div>是否上架 : </div>
                            <Switch checked={this.state.online} onChange={(e) => this.onSwitchChange(e)} className='switch' />
                        </div> */}

                    </div>
                    <div className='right'>
                        <p>商品图片</p>
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
                            {this.state.imageUrl ? <img className='img' src={this.state.imageUrl} alt="avatar" /> : uploadButton}
                        </Upload>
                        <div>
                            <p>商品描述</p>
                            <div id='div1' style={{ 'width': '100%' }}></div>
                        </div>
                    </div>
                </div>
                <Button type="primary" onClick={() => this.submit()} style={{ marginLeft: 15, marginTop: 10 }}>保存</Button>
                <Button type="primary" onClick={() => { this.props.history.goBack() }} style={{ marginLeft: 15, marginTop: 10 }}>返回</Button>
            </div>
        )
    }

    handleChange(info) {
        if (!info.fileList[0].originFileObj) {
            return
        }
        this.setState({
            image: info.fileList[0].originFileObj
        })
        this.getBase64(info.fileList[0].originFileObj, imageUrl => {
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
        return false
    }

    onChange(e, key) {
        if(key == 'category'){
            return
        }
        this.setState({
            [key]: e.target.value
        })
    }

    onSwitchChange(e) {
        this.setState({
            online: e
        })
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

        var formdata = new FormData();
        formdata.append('id', storage.get('shopDetail').goods.id)
        formdata.append('goodsTitle', this.state.name)
        formdata.append('oringinalPrice', this.state.price)
        formdata.append('discountPrice', this.state.discountPrice)
        formdata.append('tgwBusinessmanId', storage.get('shopDetail').goods.tgwBusinessmanId)
        formdata.append('goodsCategory', this.state.category)
        formdata.append('goodsDesc', this.editor2.txt.html())
        formdata.append('goodsRepertory', this.state.num)
        formdata.append('termOfValidity', this.state.day)
        if (this.state.image != this.state.imageUrl) {
            formdata.append('image', this.state.image)
        }
        try {
            notification.open({
                message: '修改中中',
                description: '请耐心等待',
                duration: null,
                icon: <Icon type="loading" theme="outlined" />,
                key: 'loading'
            });
            const result = await post('/xiaojian/updateGoods', formdata, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            if (result.status == 'success') {
                success({ description: '修改成功' })
            } else {
                error({ description: result.message })
            }
        } catch (e) {
            error({ description: '网络或者服务器错误' })
        } finally {
            notification.close('loading')
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
            isCheck: true
        })
    }

    edit(item) { }

    componentDidMount() {

        const shopDetail = storage.get('shopDetail')
        this.setState({
            name: shopDetail.goods.goodsTitle,
            price: shopDetail.goods.oringinalPrice,
            discountPrice: shopDetail.goods.discountPrice,
            num: shopDetail.goodsDetail.goodsRepertory,
            day: shopDetail.goodsDetail.termOfValidity,
            online: shopDetail.goods.isOnline == 1 ? true : false,
            image: shopDetail.goodsImage.imageUrl,
            imageUrl: shopDetail.goodsImage.imageUrl,
            desc: shopDetail.goodsDetail.goodsDesc,
            category: shopDetail.goods.goodsCategory
        })

        this.initEdit()
    }

    initEdit() {
        this.editor2 = new wangEditor('#div1')
        this.editor2.customConfig.uploadFileName = 'image'
        this.editor2.customConfig.uploadImgTimeout = 30000
        this.editor2.customConfig.uploadImgServer = '/zhifa/upload'
        this.editor2.create()
        this.editor2.txt.html(storage.get('shopDetail').goodsDetail.goodsDesc)
    }

    onclick(key) {
        this.setState({
            [key]: false
        })
    }

    onSelect(e) {
        console.log(e)
    }
}

export default Edit;

