import React, { Component } from 'react'
import {Button, Select, Input, } from 'antd'
import axios from 'axios'
import Qs from 'qs'
import './index.css'
const log=console.log.bind(console)
const Option = Select.Option
const host =window.config.host


class AddDoor extends Component {
   constructor(){
       super()
       this.state={
           city:[],
           data:{},
           cityList:[],
           area:[],
           deliverList:{},
           deliver:[],
           networkId:0,
           deliverId:0,
           cabinetNo:'',
           phone:'',
           authNo:'',
           networkList:[],
           courierList:[]
       } 
   }
   componentDidMount(){
      let that=this
      axios.get(host+'/admin/network/area').then((res)=>{
          log('网点区域',res)
        let cityList=[]
        for(let key in res.data.data){
            cityList.push(key)
        }
        
        log(cityList)
        axios.post(host+'/admin/deliver/area/name',Qs.stringify({
            areaList:cityList.toString()
        })).then((res)=>{
            log('结果',res)
           that.setState({
            deliverList:res.data.data
           })
        })

        let city=[]
        cityList.forEach((key,index)=>{
            city.push(<Option value={key}>{key}</Option>)
        })
       
        that.setState({
            city,
            data:res.data.data,
            cityList  
        })
      })
   }
   selectCity(e){
       log(e)
      
       let areaList=this.state.data[e]
       let area=[]
       let deliver=[]
       let deliverList=this.state.deliverList[e]||[]
       log('网点列表',areaList)
       this.setState({
        area:[],
        deliver:[], 
       },()=>{
            if(areaList){
                areaList.forEach((key,index)=>{
                 area.push(<Option value={index}>{key.name}</Option>) 
               })
            }
      
            log('送票员列表',deliverList)
            if(deliverList.length>0){
                deliverList.forEach((key,index)=>{
                deliver.push(<Option value={index}>{key.name}</Option>)
               })
            }else{
                alert(`${e}无快递员，无法添加机柜，请先添加快递员`)
                deliverList=[{ name: "", networkId: 10 }]
                deliverList.forEach((key,index)=>{
                    deliver.push(<Option disabled value={index}>{key.name}</Option>)
                }) 
                this.setState({
                    deliverId:0
                })
            }
      

            this.setState({
                area,
                deliver,
                networkList:areaList,
                courierList:deliverList
            })
       })
       
   }
   change(e,option){
       log('改变',e,option)
   }
   machCity(){
       
       if(this.state.area.length===0){
           alert('请先选择网点区域')
       }
   }
   selectNetPoint(e){
       
       this.setState({
         networkId:this.state.networkList[e].networkId  
       })
   }
   addPhone(e){
      
       this.setState({
           phone:e.target.value
       })
   }
   addAuthNo(e){
    
    this.setState({
        authNo:e.target.value
    })
   }
   addCabinetNo(e){
   
    this.setState({
        cabinetNo:e.target.value
    })
   }
   selectDeliver(e,option){
    
    this.setState({
      deliverId:this.state.courierList[e].deliverId  
    })
   }
   save(){
       let that=this
       if(this.state.deliverId==0){
           alert('请选择绑定快递员')
           return false
       }
        axios.post(host+'/admin/cabinet/save',Qs.stringify({
           networkId:that.state.networkId,
           deliverId:that.state.deliverId,
           cabinetNo:that.state.cabinetNo,
           phone:that.state.phone,
           authNo:that.state.authNo,
        })).then((res)=>{
            log(res)
            alert('添加成功')
         })
   }
   render(){
       return (<div className="content">
           <h4 className="toptitle">添加机柜</h4>
           <div className="wrapmsg">
               <div className="item">
                   <div className="subitem" style={{'width':'80%'}} >
                       网点区域： 
                       <Select defaultValue='选择网点区域' style={{ width: 160 }} onChange={this.selectCity.bind(this)}>
                           {this.state.city}
                      </Select>
                    </div>
               </div>

               <div className="item">
                   <div className="subitem" style={{'width':'40%'}}  onClick={this.machCity.bind(this)}>
                        绑定网点：
                        <Select defaultValue="选择网点" style={{ width: 120 }} onChange={this.selectNetPoint.bind(this)}>
                                {this.state.area}
                        </Select>
                    </div>     
               </div>
               
               <div className="item">
                   <div className="subitem" style={{'width':'40%'}}>
                        绑定送票员：
                        <Select ref="input" defaultValue="选择送票员"  notFoundContent="无送票员" style={{ width: 120 }} onChange={this.change.bind(this)} onSelect={this.selectDeliver.bind(this)}>
                                {this.state.deliver}
                        </Select>
                    </div> 
               </div>
              
               <div className="item">
                   <div className="subitem">绑定手机号：<Input className="width140" onInput={this.addPhone.bind(this)} placeholder="输入手机号" /></div>         
               </div>

               <div className="item">
                   <div className="subitem">绑定授权号：<Input className="width140" onInput={this.addAuthNo.bind(this)} placeholder="输入授权号" /></div>         
               </div>

               <div className="item">
                   <div className="subitem">填写机柜编号：<Input className="width140" onInput={this.addCabinetNo.bind(this)} placeholder="输入机柜编号" /></div>         
               </div>

            </div>   
           <Button type="primary" onClick={this.save.bind(this)} className="save">保存</Button>
       </div>)
   }
}
export default AddDoor