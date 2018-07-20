import React, {Component} from 'react'
import { Table,Select,Input,Button } from 'antd'
import {NavLink} from 'react-router-dom'
import "./index.css"
const log=console.log.bind(console)
const Option=Select.Option
const Search=Input.Search

const express = [
    { title: '序号', dataIndex: 'number',  key: 'number',  render: text => <a href="javascript">{text}</a>, }, 
    { title: 'ID',  dataIndex: 'ID',  key: 'ID',}, 
    { title: '姓名',  dataIndex: 'name',  key: 'name', }, 
    
    { title: '电话',  dataIndex: 'methoneId',  key: 'methoneId', },
    { title: '租地',   dataIndex: 'sendAddress',  key: 'sendAddress', },
    { title: '租地起止时间',   dataIndex: 'receiveAddress',  key: 'recevieAddress', },
    { title: '租金/月',   dataIndex: 'type',  key: 'type', }, 
    { title: '付费方式',   dataIndex: 'weight',  key: 'wegith', },
    { title: '剩余天数',  dataIndex: 'money',  key: 'money', },
    
    { title: '操作', key: 'action',  render: (text, record) => (
      <span>
          <a href="javascrpt"> 编辑</a>
          <a href="javascrpt">删除</a>
      </span>
    ),
  }]

class Owner extends Component{
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
          <div className="DetailList">业主列表</div>
          <div className="shaxuan">
              <Select defaultValue="按地址筛选" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="done">余杭</Option>
                    <Option value="die">西湖</Option>
              </Select>
              <Select defaultValue="到期时间" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="timemore">由近到远</Option>
                    <Option value="time">由远到近</Option>
              </Select>
              <Select defaultValue="租金" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="timemore">由高到低</Option>
                    <Option value="time">由低到高</Option>
              </Select>
              <Select defaultValue="业主" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="timemore">张三</Option>
                    <Option value="time">李四</Option>
              </Select>
              {/*<Select defaultValue="快递公司" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="timemore">顺丰</Option>
                    <Option value="time">韵达</Option>
              </Select>
              <Select defaultValue="快递员" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="timemore">张三</Option>
                    <Option value="time">李四</Option>
              </Select>*/}
              <Search placeholder="自定义搜索"  onSearch={value => console.log(value)}  style={{ width: 200 }} />
          </div>
          <Table columns={express} dataSource={this.state.data} />
          <NavLink to='/addOwner'>
             <Button type="primary">添加业主</Button>
          </NavLink>
          
        </div>)
    }
}
export default Owner