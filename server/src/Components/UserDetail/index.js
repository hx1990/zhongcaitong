import React, { Component } from 'react'
import { Table } from 'antd'
import "./index.css"


const sendList = [
      { title: '序号', dataIndex: 'number',  key: 'number', render: text => <a href="/">{text}</a>, }, 
      { title: 'ID',  dataIndex: 'ID',  key: 'ID', }, 
      { title: '填写日期',  dataIndex: 'date',  key: 'date', }, 
      { title: '时间',  dataIndex: 'time',  key: 'time', }, 
      { title: '发件人',  dataIndex: 'name',  key: 'name', },
      { title: '手机号',  dataIndex: 'phone',  key: 'phone', },
      { title: '地址',   dataIndex: 'address',  key: 'address', },
      { title: '操作', key: 'action',  render: (text, record) => (
        <span>
            <a href="javascrpt"> 编辑</a>
            <a href="javascrpt">删除</a>
        </span>
       ),
     }
]
  const userInfo = [
    { title: '序号', dataIndex: 'number',  key: 'number', render: text => <a href="javascript">{text}</a>, }, 
    { title: 'ID',  dataIndex: 'ID',  key: 'ID', }, 
    { title: '用户名',  dataIndex: 'name',  key: 'name', }, 
    { title: '注册日期',  dataIndex: 'time',  key: 'time', }, 
    { title: '身份证图片',  dataIndex: 'IDpic',  key: 'IDpic', },
    { title: '手机号',  dataIndex: 'phone',  key: 'phone', },
    { title: '身份证号',   dataIndex: 'IDcard',  key: 'IDcard', },
    { title: '余额',   dataIndex: 'account',  key: 'account', },
    { title: '积分',   dataIndex: 'score',  key: 'score', },
    { title: '优惠券',   dataIndex: 'yhq',  key: 'yhq', },
    { title: '操作', key: 'action',  render: (text, record) => (
      <span>
          <a href="javascrpt"> 编辑</a>
          <a href="javascrpt">删除</a>
      </span>
    ),
  }];
  const resoveList = [
    { title: '序号', dataIndex: 'number',  key: 'number', render: text => <a href="javascript">{text}</a>, }, 
    { title: 'ID',  dataIndex: 'ID',  key: 'ID', }, 
    { title: '填写日期',  dataIndex: 'date',  key: 'date', }, 
    { title: '时间',  dataIndex: 'time',  key: 'time', }, 
    { title: '收件人',  dataIndex: 'name',  key: 'name', },
    { title: '手机号',  dataIndex: 'phone',  key: 'phone', },
    { title: '地址',   dataIndex: 'address',  key: 'address', },
    { title: '操作', key: 'action',  render: (text, record) => (
      <span>
          <a href="javascrpt"> 编辑</a>
          <a href="javascrpt">删除</a>
      </span>
    ),
  }];
  const history = [
    { title: '序号', dataIndex: 'number',  key: 'number', render: text => <a href="javascript">{text}</a>, }, 
    { title: 'ID',  dataIndex: 'ID',  key: 'ID', }, 
    { title: '发件日期',  dataIndex: 'date',  key: 'date', }, 
    { title: '机柜编号',  dataIndex: 'methonId',  key: 'methonId', }, 
    { title: '发件人',  dataIndex: 'sname',  key: 'sname', },
    { title: '发件手机',  dataIndex: 'sphone',  key: 'sphone', },
    { title: '发件地址',   dataIndex: 'address',  key: 'address', },
    { title: '收件人',  dataIndex: 'rname',  key: 'rname', },
    { title: '收件手机',  dataIndex: 'rphone',  key: 'rphone', },
    { title: '收件地址',   dataIndex: 'raddress',  key: 'raddress', },
    { title: '发件金额',   dataIndex: 'price',  key: 'price', },
    { title: '状态',   dataIndex: 'status',  key: 'status', },
    { title: '单号',   dataIndex: 'expressnumber',  key: 'expressnumber', },
    { title: '快递公司',   dataIndex: 'company',  key: 'company', },
    { title: '快递员',   dataIndex: 'ename',  key: 'ename', },
    { title: '快递员电话',   dataIndex: 'ephone',  key: 'ephone', },
    { title: '物品类型',   dataIndex: 'type',  key: 'type', },
    { title: '操作', key: 'action',  render: (text, record) => (
      <span>
          <a href="javascrpt"> 编辑</a>
          <a href="javascrpt">删除</a>
      </span>
    ),
  }];
  const data = [{
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
  }];
  
  

class UserDetail extends Component {
    constructor(){
        super()
        this.state={}
    }
    render(){
        return(
            <div className="userDetail">
                <div className="DetailList">发件人信息列表</div>
                <Table columns={sendList} dataSource={data} />
                <div className="DetailList">收件人信息列表</div>
                <Table columns={resoveList} dataSource={data} />
                <div className="DetailList">身份信息</div>
                <Table columns={userInfo} dataSource={data} />
                <div className="DetailList">发件记录</div>
                <Table columns={history} dataSource={data} />
            </div>)
    }
}
export default UserDetail