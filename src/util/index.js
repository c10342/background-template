import axios from 'axios'
import {notification,Icon} from 'antd'
import React from 'react'

export const get = (url,params={})=>{
    return new Promise((resolve,reject)=>{
        axios.get(url,{
            params
        }).then(res=>{
            if(res.status == 200  || res.status == 201){
                resolve(res.data)
            }else{
                reject(res.data)
            }
        }).catch(err=>{
            reject(err)
        })
    })
}

export const post = (url,params={})=>{
    return new Promise((resolve,reject)=>{
        axios.post(url,params).then(res=>{
            if(res.status == 200 || res.status == 201){
                resolve(res.data)
            }else{
                reject(res.data)
            }
        }).catch(err=>{
            reject(err)
        })
    })
}

export const Delete = (url)=>{
    return new Promise((resolve,reject)=>{
        axios.delete(url).then(res=>{
            if(res.status == 200 || res.status == 201){
                resolve(res.data)
            }else{
                reject(res.data)
            }
        }).catch(err=>{
            reject(err)
        })
    })
}

export const put = (url,params={})=>{
    return new Promise((resolve,reject)=>{
        axios.put(url,params).then(res=>{
            if(res.status == 200  || res.status == 201){
                resolve(res.data)
            }else{
                reject(res.data)
            }
        }).catch(err=>{
            reject(err)
        })
    })
}

export const error = ({message='error',description='服务器发生错误'}={})=>{
    notification.error({
        message,
        description,
    });
}

export const success = ({message='提示',description='上传成功'}={})=>{
    notification.success({
        message,
        description,
    });
}

export const loading = ({message='加载中',description='请耐心等待',key='loading'}={})=>{
    notification.open({
        message:'加载中',
        description:'请耐心等待',
        duration:null,
        icon:<Icon type="loading" theme="outlined" />,
        key:'loading'
    });
}

export const close = (key)=>{
    notification.close('loading')
}


export const formatDate = (str) =>{
    const date = new Date(str)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDay()
    return `${year}-${month}-${day}`
}