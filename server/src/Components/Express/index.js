import React, {Component} from 'react'
import { Table,Select,Input} from 'antd'
import "./index.css"
const log=console.log.bind(console)
const Option=Select.Option
const Search=Input.Search

const express = [
    { title: '序号', dataIndex: 'number',  key: 'number', width:'8%', render: text => <a href="javascript">{text}</a>, }, 
    { title: 'ID',  dataIndex: 'ID',  key: 'ID',width:'8%', }, 
    { title: '实名',  dataIndex: 'name',  key: 'name',width:'8%', }, 
    { title: '快递单号',   dataIndex: 'address',  key: 'address', width:'15%',},
    { title: '快递柜ID',  dataIndex: 'methoneId',  key: 'methoneId', width:'6%',}, 
    { title: '提交时间',   dataIndex: 'posttime',  key: 'posttime', width:'10%',},
    { title: '金额',  dataIndex: 'price',  key: 'price', width:'8%',},
    { title: '订单状态',  dataIndex: 'status',  key: 'status', width:'8%',},
    { title: '所属公司',   dataIndex: 'company',  key: 'company', width:'8%',},
    { title: '操作', key: 'action',width:'15%',  render: (text, record) => (
      <span>
          <a href="javascrpt"> 编辑</a>
          <a href="javascrpt">删除</a>
      </span>
    ),
  }]

class Express extends Component{
    constructor(){
        super()
        this.state={
          data :[{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
          }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
          }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
          }]
        }
    }
    renZheng(e){
      log(e)
    }
    render(){
        return (<div className="express">
          <div className="DetailList">快递管理</div>
          <div className="shaxuan">
              <Select defaultValue="按完成状态" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="done">已完成订单</Option>
                    <Option value="die">未完成订单</Option>
              </Select>
              <Select defaultValue="提交时间" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="timemore">由近到远</Option>
                    <Option value="time">由远到近</Option>
              </Select>
              <Select defaultValue="金额" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="timemore">由高到低</Option>
                    <Option value="time">由低到高</Option>
              </Select>
              <Select defaultValue="快递柜" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="timemore">00001</Option>
                    <Option value="time">0002</Option>
              </Select>
              <Select defaultValue="快递公司" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="timemore">顺丰</Option>
                    <Option value="time">韵达</Option>
              </Select>
              <Select defaultValue="快递员" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="timemore">张三</Option>
                    <Option value="time">李四</Option>
              </Select>
              <Search placeholder="自定义搜索"  onSearch={value => console.log(value)}  style={{ width: 200 }} />
          </div>
          <Table columns={express} dataSource={this.state.data} />
          {/* <Tabs className="tablist" defaultActiveKey="1" >
                <TabPane tab="按完成状态" key="1"></TabPane>
                <TabPane tab="时间" key="2"><Table columns={express} dataSource={data} /></TabPane>
                <TabPane tab="金额" key="3"><Table columns={express} dataSource={data} /></TabPane>
                <TabPane tab="快递柜" key="4"><Table columns={express} dataSource={data} /></TabPane>
                <TabPane tab="快递公司" key="5"><Table columns={express} dataSource={data} /></TabPane>
                <TabPane tab="快递员" key="6"><Table columns={express} dataSource={data} /></TabPane>
                <TabPane tab="自定义搜索" key="6"><Table columns={express} dataSource={data} /></TabPane>
           </Tabs>  */}
        </div>)
    }
}
export default Express