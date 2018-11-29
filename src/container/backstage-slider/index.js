import React, {Component} from 'react';
import { Upload, Icon, message,Input,Button,notification} from 'antd';
import QueueAnim from 'rc-queue-anim';
import List from '../list'
import Detail from '../detail'
import './index.css'
import {post, error, success, formatDate,get} from '../../util'
import axios from 'axios'

const columns = ['编号', '标题','索引', '创建时间', '更新时间', '操作']
class BackStageSlider extends Component {
    constructor(props) {
        super(props)
        this.state={
            title:null,
            url:null,
            index:null,
            image:null,
            isShowFrom:false,
            total:null,
            pageSize:6,
            currentPage:1,
            dataSource:[],
            isCheck:false
        }
    }
    render(){
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return(
            <div id='slider'>
                <Button onClick={()=>this.onClick()}>{this.state.isShowFrom?'隐藏上传控件':'显示上传控件'}</Button>
                    {this.state.isShowFrom?(<Button type="primary" onClick={()=>this.submit()} style={{marginLeft:15}}>提交</Button>):null}
                <QueueAnim duration={2000} type={'scale'}>
                {this.state.isShowFrom?(<div key={'form'} className='form'>
                    <div style={{marginRight:20,width:'50%'}}>
                        <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontSize:16}}><div style={{width:60}}>标题 : </div> <Input onChange={(e)=>this.onChange(e,'title')} value={this.state.title} placeholder="请输入标题" /></div>
                        <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontSize:16}}>
                        <div style={{width:60}}>地址 : </div>
                        <Input onChange={(e)=>this.onChange(e,'url')} value={this.state.url} placeholder="请输入地址" style={{marginTop:10}} />
                        </div>
                        <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontSize:16}}>
                        <div style={{width:60}}>索引 : </div>
                        <Input onChange={(e)=>this.onChange(e,'index')} value={this.state.index} placeholder="请输入索引号" style={{marginTop:10}} />
                        </div>
                    </div>
                    <Upload
                        name="image"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="/v1/banner/"
                        beforeUpload={(file)=>this.beforeUpload(file)}
                        onChange={(file)=>this.handleChange(file)}
                        customRequest={(e)=>this.customRequest(e)}
                        data={{
                            title:'123',
                            url:'4',
                            index:885645
                        }}
                    >
                        {imageUrl ? <img className='img' src={imageUrl} alt="avatar" /> : uploadButton}
                    </Upload>
                </div>):null}
                </QueueAnim>

                <List
                    total={this.state.total}
                    columns={columns}
                    onChange={this.onchange.bind(this)}
                    pageSize={this.state.pageSize}
                    current={this.state.currentPage}
                >
                    {this.state.dataSource.map((item, index) => {
                        return (
                            <div key={index} className='tableItem'>
                                <span>{item.Id}</span>
                                <span>{item.Title}</span>
                                <span>{item.Index}</span>
                                <span>{formatDate(item.CreatedAt)}</span>
                                <span>{formatDate(item.UpdatedAt)}</span>
                                <span className='check'>
                                        <span onClick={() => this.check(item)}>查看</span>
                                        <span onClick={() => this.edit(item)}>编辑</span>
                                    </span>
                            </div>
                        );
                    })}
                </List>
                <QueueAnim duration={1000} type={'scale'}>
                    {this.state.isCheck ? (
                        <Detail img={this.state.detailInfo.Image} key={'detail'} onClick={()=>{this.onclick('isCheck')}}>
                            <div>
                                <div>
                                    <p>ID</p>
                                    <p>标题</p>
                                    <p>链接地址</p>
                                    <p>索引</p>
                                    <p>点击数</p>
                                    <p>创建时间</p>
                                    <p>更新时间</p>
                                </div>
                                <div>
                                    <p>{this.state.detailInfo.Id}</p>
                                    <p>{this.state.detailInfo.Title}</p>
                                    <p>{this.state.detailInfo.Url}</p>
                                    <p>{this.state.detailInfo.Index}</p>
                                    <p>{this.state.detailInfo.CliNums}</p>
                                    <p>{formatDate(this.state.detailInfo.CreatedAt)}</p>
                                    <p>{formatDate(this.state.detailInfo.UpdatedAt)}</p>
                                </div>
                            </div>
                        </Detail>
                    ) : null}
                </QueueAnim>
            </div>
        )
    }

    handleChange(info){
        if(!info.file.originFileObj){
            return
        }
        this.setState({
            image:info.fileList[0].originFileObj
        })
        this.getBase64(info.file.originFileObj, imageUrl =>{
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

    onChange(e,key){
        this.setState({
            [key]:e.target.value
        })
    }

    onClick(){
        this.setState({
            isShowFrom:!this.state.isShowFrom
        })
    }

    customRequest(e){
        return false
    }

    async submit(){
        if(!this.state.title && !this.state.url && !this.state.index && !this.state.image){
            message.error('请把表单填写完整!');
            return
        }
        var formdata=new FormData();
        formdata.append('image',this.state.image);
        formdata.append('index',this.state.index);
        formdata.append('title',this.state.title);
        formdata.append('url',this.state.url);


        try{
            notification.open({
                message:'上传中',
                description:'请耐心等待',
                duration:null,
                icon:<Icon type="loading" theme="outlined" />,
                key:'loading'
            });
            const result = await axios.post('/v1/banner/',formdata,{
                headers: {"Content-Type": "multipart/form-data"}
            })

            if(result.data.succode == 201){
                success()
            }else{
                error({description:result.data.msg})
            }
        }catch(e){
            error({description:'上传失败'})
        }finally{
            notification.close('loading')
            this.setState({
                title:null,
                url:null,
                index:null,
                image:null,
                imageUrl:null
            })
        }
    }

    async onchange(num) {
        this.setState({
            currentPage:num
        })
        try {
            notification.open({
                message:'加载中',
                description:'请耐心等待',
                duration:null,
                icon:<Icon type="loading" theme="outlined" />,
                key:'loading'
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
        }finally{
            notification.close('loading')
        }
    }

    check(item){
        this.setState({
            isCheck: true,
            detailInfo:item
        })
    }

    edit(item){}

    async componentDidMount() {
        try {
            notification.open({
                message:'加载中',
                description:'请耐心等待',
                duration:null,
                icon:<Icon type="loading" theme="outlined" />,
                key:'loading'
            });
            const result = await get('/v1/banner/page', {
                pageSize: this.state.pageSize,
                pageNo: 1
            })
            this.setState({
                total: result.count,
                dataSource: result.sorts
            })
        } catch (e) {
            error()
        }finally{
            notification.close('loading')
        }
    }

    onclick(key) {
        this.setState({
            [key]: false
        })
    }
}

export default BackStageSlider;

