import React, { Component } from 'react';
import "./index.css"
import axios from 'axios'
import logoUrl from '../../images/logo.png'
import loginUrl from '../../images/login.png'
import logoutUrl from '../../images/logout.png'
const host =window.config.host
class Head extends Component{
    constructor(){
        super()
        this.state={
            userName:''
        }
    }
    componentWillMount(){
        console.log('sssss',JSON.parse(sessionStorage.getItem('key')))
        let userInfo=JSON.parse(sessionStorage.getItem('key'))
        userInfo&&this.setState({
            userName:userInfo.name
        })
    }
    loginOut(){
        let that=this
        axios.get(host+'/admin/user/logout').then(res=>{
            console.log(res)
            
        })
        sessionStorage.clear() 
            that.componentWillMount()
        
    }
    render(){
        return(<div className="head">
           <div className="left">
             <img alt='img' src={logoUrl}/>
             <span className="ltitle1">中彩通系统管理</span>
             <span className="rtitle">zhongcaitong information management system</span>
           </div> 
           <div className="right">
               <a href="" className="login">
                  <img alt='img' src={loginUrl} />
                  <span>{this.state.userName}欢迎登陆系统</span>
               </a>
               <a href="" className="logout" onClick={this.loginOut.bind(this)}>
                  <img alt='img' src={logoutUrl} />
                  <span>退出登录</span>
               </a>
           </div>
        </div>)
    }
}
export default Head