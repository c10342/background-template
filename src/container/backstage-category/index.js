import React, {Component} from 'react';
import List from '../list'
import Detail from '../detail'
import {error, get, formatDate,post,Delete,success,put} from '../../util'
import QueueAnim from 'rc-queue-anim';
import {Input,Button,message,notification,Icon} from 'antd'
import './index.css'

const columns = ['编号', '名称', '创建时间', '更新时间', '操作']

class BackStageCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            total: 0,
            pageSize: 6,
            isCheck: false,
            isEdit:false,
            detailInfo:{},
            sname:null,
            currentPage:1,
            name:null
        }

    }

    render() {
        return (
            <div id='category'>
                <div className='search'>
                    <Input onChange={(e)=>this.change(e)} value={this.state.sname} style={{width:'50%'}} placeholder="请输入" />
                    <Button onClick={()=>{this.add()}} type="primary">添加</Button>
                </div>
                <List
                    total={this.state.total}
                    columns={columns}
                    onChange={this.onChange.bind(this)}
                    pageSize={this.state.pageSize}
                    current={this.state.currentPage}
                >
                    {this.state.dataSource.map((item, index) => {
                        return (
                            <div key={index} className='tableItem'>
                                <span>{item.Id}</span>
                                <span>{item.Sname}</span>
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
                        <Detail key={'detail'} onClick={()=>{this.onClick('isCheck')}}>
                            <div>
                                <div>
                                    <p>ID</p>
                                    <p>类别名称</p>
                                    <p>创建时间</p>
                                    <p>更新时间</p>
                                </div>
                                <div>
                                    <p>{this.state.detailInfo.Id}</p>
                                    <p>{this.state.detailInfo.Sname}</p>
                                    <p>{formatDate(this.state.detailInfo.CreatedAt)}</p>
                                    <p>{formatDate(this.state.detailInfo.UpdatedAt)}</p>
                                </div>
                            </div>
                        </Detail>
                    ) : null}
                </QueueAnim>

                <QueueAnim duration={1000} type={'scale'}>
                    {this.state.isEdit ? (
                        <Detail key={'edit'} onClick={()=>{this.onClick('isEdit')}}>
                            <div>
                                <div>
                                    <p>ID</p>
                                    <p>类别名称</p>
                                    <p>创建时间</p>
                                    <p>更新时间</p>
                                </div>
                                <div>
                                    <p>{this.state.detailInfo.Id}</p>
                                    <p><Input onChange={(e)=>this.editName(e)} value={this.state.name}/></p>
                                    <p>{formatDate(this.state.detailInfo.CreatedAt)}</p>
                                    <p>{formatDate(this.state.detailInfo.UpdatedAt)}</p>
                                </div>
                            </div>
                            <div className='btn'>
                                <Button onClick={()=>this.delete()} type="primary">删除</Button>
                                <Button onClick={()=>this.modify()} type="primary">修改</Button>
                            </div>
                        </Detail>
                    ) : null}
                </QueueAnim>
            </div>
        )
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
            const result = await get('/v1/sort/page', {
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

    check(item) {
        this.setState({
            isCheck: true,
            detailInfo:item
        })
    }

    edit(item) {
        this.setState({
            isEdit: true,
            detailInfo:item,
            name:item.Sname
        })
    }

    async modify(){
        try{
            notification.open({
                message:'修改中',
                description:'请耐心等待',
                duration:null,
                icon:<Icon type="loading" theme="outlined" />,
                key:'loading'
            });
            const result = await put(`/v1/sort/${this.state.detailInfo.Id}`,{
                "sname":this.state.name
            })
            if(result.succode == 200){
                const data = result.data
                let dataSource = this.state.dataSource
                const index = dataSource.findIndex(item=>item.Id == this.state.detailInfo.Id)
                dataSource[index] = data
                this.setState({
                    dataSource
                })
                success({description:'修改成功'})
            }
        }catch(e){
            error()
        }finally{
            notification.close('loading')
        }
    }

    async delete(){
        try{
            notification.open({
                message:'加载中',
                description:'请耐心等待',
                duration:null,
                icon:<Icon type="loading" theme="outlined" />,
                key:'loading'
            });
            const result = await Delete(`/v1/sort/${this.state.detailInfo.Id}`)
            if(result == 'OK'){
                if(this.state.dataSource.length == 1){
                    await this.onChange(--this.state.currentPage)
                }else{
                    await this.onChange(this.state.currentPage)
                }
                this.setState({
                    isEdit:false
                })
                success({description:'删除成功'})
            }else{
                error()
            }
        }catch(e){
            error()
        }finally{
            notification.close('loading')
        }
    }

    onClick(key) {
        this.setState({
            [key]: false
        })
    }

    change(e){
        this.setState({
            sname:e.target.value
        })
    }

    editName(e){
        this.setState({
           name:e.target.value
       })
    }

    async onChange(num) {
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
            const result = await get('/v1/sort/page', {
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
    async add(){
        try{
            notification.open({
                message:'添加中',
                description:'请耐心等待',
                duration:null,
                icon:<Icon type="loading" theme="outlined" />,
                key:'loading'
            });
            const result = await post('/v1/sort/',{sname:this.state.sname})
            if(result['err_code']){
                error({description:result.msg})
            }else{
                message.success('添加成功')
                this.setState({
                    total:this.state.total+1
                })
            }
        }catch(e){
            error()
        }finally{
            notification.close('loading')
        }
    }
}

export default BackStageCategory;
