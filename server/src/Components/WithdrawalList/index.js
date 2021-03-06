import React, {Component} from 'react'
import { Table,Select,Input} from 'antd'
import "./index.css"
const log=console.log.bind(console)
const Option=Select.Option
const Search=Input.Search

const express = [
    { title: '序号', dataIndex: 'number',  key: 'number',  render: text => <a href="javascript">{text}</a>, }, 
    { title: 'ID',  dataIndex: 'ID',  key: 'ID',}, 
    { title: '时间日期',  dataIndex: 'name',  key: 'name', }, 
    
    // { title: '快递柜ID',  dataIndex: 'methoneId',  key: 'methoneId', },
    // { title: '发件地',   dataIndex: 'sendAddress',  key: 'sendAddress', },
    // { title: '收件地',   dataIndex: 'receiveAddress',  key: 'recevieAddress', },
    // { title: '文件/物品',   dataIndex: 'type',  key: 'type', }, 
    // { title: '重量',   dataIndex: 'weight',  key: 'wegith', },
    { title: '金额',  dataIndex: 'money',  key: 'money', },
    { title: '余额',  dataIndex: 'balance',  key: 'balance', },
    { title: '操作', key: 'action',  render: (text, record) => (
      <span>
          <a href="javascrpt"> 编辑</a>
          <a href="javascrpt">删除</a>
      </span>
    ),
  }]

class WithdrawalList extends Component{
    constructor(){
        super()
        this.state={
          data :[]
        }
    }
    renZheng(e){
      log(e)
    }
    render(){
        return (<div className="express">
          <div className="DetailList">提现清单</div>
          {/* <div className="shaxuan"> */}
              {/*<Select defaultValue="按物品类型" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="done">文件</Option>
                    <Option value="die">包裹</Option>
              </Select>*/}
              {/* <Select defaultValue="日期" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="timemore">由近到远</Option>
                    <Option value="time">由远到近</Option>
              </Select>
              <Select defaultValue="金额" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="timemore">由高到低</Option>
                    <Option value="time">由低到高</Option>
              </Select>
              <Select defaultValue="余额" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="timemore">由高到低</Option>
                    <Option value="time">由高到低</Option>
              </Select> */}
              {/*<Select defaultValue="快递公司" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="timemore">顺丰</Option>
                    <Option value="time">韵达</Option>
              </Select>
              <Select defaultValue="快递员" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="timemore">张三</Option>
                    <Option value="time">李四</Option>
              </Select>*/}
              {/* <Search placeholder="自定义搜索"  onSearch={value => console.log(value)}  style={{ width: 200 }} />
          </div> */}
          <Table columns={express} dataSource={this.state.data} />
          
        </div>)
    }
}
export default WithdrawalList