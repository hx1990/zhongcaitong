
import React, { Component } from 'react'
import './index.css'
import ExpressDoorUrl from "../../images/company.png"
import { Table} from 'antd'

import axios from 'axios'
// import { log } from '../../Comment'
import Qs from 'qs'
const host =window.config.host



  
const columns = [{
    title: '彩种名称',
    dataIndex: 'name',
    key:'name',
    align: 'center',
    
  }, {
    title: '彩种价格',
    dataIndex: 'price',
    key:'price',
    align: 'center',
    
  },
  {
    title: '彩种规格（长*宽cm）',
    dataIndex: 'size',
    key:'size',
    align: 'center',
    
  },
  
  {
    title: '彩种状态',
    dataIndex: 'statusMsg',
    key:'statusMsg',
    align: 'center',
  },
  
  {
    title: '产品图片',
    dataIndex: 'img',
    align: 'center',
    render: (text, record,index) =>{
        return (<img className="product-img" src={record&&record.img}/>)
    }
  }]
class productList extends Component{
    constructor(){
        super()
        this.state={
          columns,
          data:[]
        }
    } 
    componentWillMount(){
      let that=this
      axios.post(host+'/admin/goods/list',Qs.stringify(
          {status:1}
      )).then((res)=>{
          that.setState({
            data:res.data.data
          })
      })
    }
    render(){
        return(<div className="expressdoor">
           <div className="topTitle">
             <img alt='img' src={ExpressDoorUrl}/>
             <span>彩种管理</span>
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
export default productList