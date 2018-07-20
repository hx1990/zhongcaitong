import React, { Component } from 'react';
import "./index.css"
import titleUrl from '../../images/title.png'

class Title extends Component{
     constructor(){
         super()
         this.state={
             
         }
     }
     render(){
         return (<div className="title">
            <img alt="img" src={titleUrl}/>
            <span className="ltitle">通知公告：</span>
            <span className="mtitle">《中彩通信息管理系统使用说明》下载</span>
            <span className="rtitle">请严格按照职称申报主管部门逐级简历单位机构</span>
         </div>)
     }
}
export default Title