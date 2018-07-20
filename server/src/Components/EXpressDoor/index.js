import React, { Component } from 'react'
import './index.css'
import ExpressDoorUrl from "../../images/company.png"
import { Table} from 'antd'
// import { Select } from 'antd'
// import AddDoor from "../AddDoor"
// import {NavLink} from 'react-router-dom'
import axios from 'axios'
// import { log } from '../../Comment'
// import Qs from 'qs'
const host =window.config.host



  
const columns = [{
    title: '机柜编号',
    dataIndex: 'cabinetNo',
    key:'cabinetNo',
    align: 'center',
    
  }, {
    title: '授权号',
    dataIndex: 'authNo',
    key:'authNo',
    align: 'center',
    
  },
  {
    title: '绑定快递员',
    dataIndex: 'deliverName',
    key:'deliverName',
    align: 'center',
    
  },
  {
    title: '绑定电话卡',
    dataIndex: 'phone',
    align: 'center',
    key:'phone',
  },
  
  {
    title: '绑定网点',
    dataIndex: 'networkName',
    key:'networkName',
    align: 'center',
  }, 
  {
    title: '绑定合伙人',
    dataIndex: 'partnerName',
    key:'partnerName',
    align: 'center',
  }, 
  {
    title: '当前票量',
    dataIndex: 'lotteryNum',
    key:'lotteryNum',
    align: 'center',
    
  },
  {
    title: '机柜地址',
    dataIndex: 'address',
    key:'address',
    align: 'center',
  } ,
  {
    title: '运行状态',
    dataIndex: 'status',
    key:'status',
    align: 'center',
  }]
class ExpressDoor extends Component{
    constructor(){
        super()
        this.state={
          columns,
          data:[]
        }
    } 
    componentWillMount(){
      let that=this
      axios.post(host+'/admin/cabinet/list').then((res)=>{
          that.setState({
            data:res.data.data
          })
      })
    }
    render(){
        return(<div className="expressdoor">
           <div className="topTitle">
             <img alt='img' src={ExpressDoorUrl}/>
             <span>彩票柜管理</span>
           </div>
           <div className="body">
               <div className="resut">
                 <Table dataSource={this.state.data} columns={this.state.columns}></Table>
               </div>
               {/* <NavLink to='/addDoor'>
                  <Button type="primary" value="添加">添加</Button>
               </NavLink> */}
           </div>
        </div>)
    }
}
export default ExpressDoor