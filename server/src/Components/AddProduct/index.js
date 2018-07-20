import React, { Component } from 'react'
import {Button, Select, Input,Upload ,Icon} from 'antd'
import axios from 'axios'
import Qs from 'qs'
import './index.css'
const log=console.log.bind(console)
const Option = Select.Option
const host =window.config.host


class AddProduct extends Component {
   constructor(){
       super()
       this.state={
           name:'',
           price:0,
           size:'',
           img:'',
           status:0,
           show:true
       } 
       let that=this
       this.mode={
        action: '/upload/picture',
        onChange({ file}) {
          if(file.status==="done"){
            that.setState({
              show:false,
              img:file.response.data
            })
          }
        },
      }
   }
  
   selectShow(e){
       log(e)
    this.setState({
        status:e
      })
   }
   
   addName(e){
      
       this.setState({
           name:e.target.value
       })
   }
   addPrice(e){
    
    this.setState({
       price:Number(e.target.value)
    })
   }
   addSize(e){
   
    this.setState({
        size:e.target.value
    })
   }
   
   
   save(){
       let that=this
        axios.post(host+'/admin/goods/add',Qs.stringify({
           name:that.state.name,
           price:that.state.price,
           size:that.state.size,
           img:that.state.img,
           status:that.state.status
        })).then((res)=>{
            log(res)
         })
   }
   render(){
       return (<div className="content">
           <h4 className="toptitle">添加彩种</h4>
           <div className="wrapmsg">

               <div className="item">
                  <div className="subitem">彩种名称：<Input className="width170" onInput={this.addName.bind(this)} placeholder="添加彩种名称" /></div>
               </div>

               <div className="item">
                   <div className="subitem">彩种价格：<Input className="width170" onInput={this.addPrice.bind(this)} placeholder="输入彩种价格" /></div>
               </div>
               
               <div className="item">
                    <div className="subitem">彩种规格：<Input className="width170" onInput={this.addSize.bind(this)} placeholder="输入彩种规格（长*宽）单位cm" /></div>
               </div>
              
               <div className="item">
               是否首页展示：
                        <Select defaultValue="是否展示" style={{ width: 120 }} onChange={this.selectShow.bind(this)}>
                            <Option value="1">展示</Option>
                            <Option value="2">不展示</Option>
                        </Select>      
               </div>

               <div className="item">
                   <div className="subitem">上传彩种图片：
                    <Upload {...this.mode} style={this.state.show?{display:'block'}:{display:'none'}}>
                        <Button > <Icon type="upload" />彩种图片</Button>
                    </Upload>
                   
                </div>  
                     
               </div>

               <img className="img item" alt='' src={this.state.img}/>  

            </div>

               
           <Button type="primary" onClick={this.save.bind(this)} className="save">添加</Button>
       </div>)
   }
}
export default AddProduct