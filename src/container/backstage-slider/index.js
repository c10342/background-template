import React, { Component } from 'react';
import { Upload, Icon, message, Input, Button, notification, Switch, Select } from 'antd';
import QueueAnim from 'rc-queue-anim';
import './index.css'
import { post, error, success, formatDate, get } from '../../util'
import axios from 'axios'
import wangEditor from 'wangeditor'

const Option = Select.Option;

class BackStageSlider extends Component {
    constructor(props) {
        super(props)
        this.editor2 = null
        this.state = {
            firstCategory: [{ text: '请选择' }],
            selectedFirstCategory: null,
            secondCategory: [{ categoryName: '请选择' }],
            selectedSecondCategory: null,
            name: null,
            price: null,
            discountPrice: null,
            num: null,
            day: null,
            online: false,
            image: null,
            desc: null
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
                        <div style={{ fontSize: 16 }}><div>商品名称 : </div> <Input onChange={(e) => this.onChange(e, 'name')} value={this.state.name} placeholder="请输入商品名称" /></div>
                        <div style={{ fontSize: 16 }}>
                            <div>商品原价格 : </div>
                            <Input onChange={(e) => this.onChange(e, 'price')} value={this.state.price} placeholder="请输入商品价格" />
                        </div>
                        <div style={{ fontSize: 16 }}>
                            <div>商品打折价格 : </div>
                            <Input onChange={(e) => this.onChange(e, 'discountPrice')} value={this.state.discountPrice} placeholder="请输入商品打折价格" />
                        </div>
                        <div style={{ fontSize: 16 }}>
                            <div>商品库存 : </div>
                            <Input onChange={(e) => this.onChange(e, 'num')} value={this.state.num} placeholder="请输入商品库存" />
                        </div>
                        <div style={{ fontSize: 16 }}>
                            <div>商品有效期 : </div>
                            <Input onChange={(e) => this.onChange(e, 'day')} value={this.state.day} placeholder="请输入商品有效期" />
                        </div>
                        <div style={{ fontSize: 16 }}>
                            <div>是否上架 : </div>
                            <Switch defaultChecked={this.state.online} onChange={(e) => this.onSwitchChange(e)} className='switch' />
                        </div>
                        <div style={{ fontSize: 16 }}>
                            <div>商品分类 : </div>
                            <div>
                                <Select
                                    onSelect={(e, o) => this.onSelect(e, o)}
                                    defaultValue={this.state.firstCategory[0].text}
                                    style={{ width: 120, marginTop: 10, marginRight: 10 }}
                                >
                                    {this.state.firstCategory.map((province, index) => <Option key={index}>{province.text}</Option>)}
                                </Select>
                                <Select
                                    onSelect={(e, o) => this.onSelectSecond(e, o)}
                                    style={{ width: 120 }}
                                    value={this.state.secondCategory[0].categoryName}
                                >
                                    {this.state.secondCategory.map((city, index) => <Option key={index}>{city.categoryName}</Option>)}
                                </Select>
                            </div>
                        </div>
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
                            {imageUrl ? <img className='img' src={imageUrl} alt="avatar" /> : uploadButton}
                        </Upload>
                        <div>
                            <p>商品描述</p>
                            <div id='div1' style={{ 'width': '100%' }}></div>
                        </div>
                    </div>
                </div>
                <Button type="primary" onClick={() => this.submit()} style={{ marginLeft: 15, marginTop: 10 }}>提交</Button>
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
        this.setState({
            online: e
        })
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
        this.setState({
            desc: this.editor2.txt.html()
        })
        if(!this.state.selectedFirstCategory || 
            !this.state.selectedSecondCategory ||
            !this.state.name ||
            !this.state.price ||
            !this.state.discountPrice ||
            !this.state.num ||
            !this.state.day ||
            !this.state.online ||
            !this.state.image ||
            !this.state.desc 
         ){
             message.error('信息不能为空')
             return
         }
         if(this.state.price>this.state.discountPrice){
             message.error('原价不能大于折扣价')
             return
         }
         console.log(this.state)
        return
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
        this.initEdit()
        this.getCategory()
    }

    initEdit() {
        this.editor2 = new wangEditor('#div1')
        // this.editor2.customConfig.uploadImgShowBase64 = true
        this.editor2.customConfig.uploadFileName = 'image'
        this.editor2.customConfig.uploadImgTimeout = 30000
        this.editor2.customConfig.uploadImgServer = '/zhifa/upload'
        this.editor2.create()
    }

    onclick(key) {
        this.setState({
            [key]: false
        })
    }

    async onSelect(e, o) {
        try {
            const result = await get('/category/findtgwSecondCategoryById', { id: e })
            this.setState({
                selectedFirstCategory: o.props.children,
                secondCategory: result,
                selectedSecondCategory: result[0].categoryName
            })
        } catch (error) {
            message.error('获取二级分类失败');
        }
    }

    onSelectSecond(e, o) {
        this.setState({
            selectedSecondCategory: o.props.children
        })
    }

    async getCategory() {
        try {
            const result = await get('/category/findFirstCategory')
            this.setState({ firstCategory: result,selectedFirstCategory:result[1].text })
        } catch (e) {
            message.error('获取一级分类失败');
        }
    }
}

export default BackStageSlider;

