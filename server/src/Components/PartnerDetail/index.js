import React, { Component } from 'react'
import { Table, Select, Input,Button} from 'antd'
import "./index.css"
import axios from 'axios'
import { log } from '../../Comment'

import { NavLink } from 'react-router-dom'
const Option = Select.Option
const Search = Input.Search

class PartnerDetail extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            partner: {},
           partnerId:0,
           netpointList:[],
           senderList:[],
           pic:false,
          pic1:false,
          pic2:false,
          pic3:false,
          pic4:false,
        }
        this.express = [
            
            { title: '姓名', dataIndex: 'name', align: 'center', key: 'name', },
            { title: '申请日期', dataIndex: 'applyTime', align: 'center', key: 'applyTime', },
            { title: '地址', dataIndex: 'address', width: '10%', align: 'center', key: 'address', },
            
            { title: '电话', dataIndex: 'phone', align: 'center', key: 'phone', },
            { title: '审核状态', dataIndex: 'statusMessage', align: 'center', key: 'statusMessage', },
            { title: '审核通过时间', dataIndex: 'passTime', align: 'center', key: 'passTime', },
            
            {
                title: '操作', key: 'action', align: 'center', render: (text, record, index) => {
                    return (<span>
                        <NavLink activeClassName="activeRoute" to="/partnerDetail">查看详情</NavLink>
                        
                    </span>)
                }
            }]
    }
    
    componentWillMount() {
        log(this.props)
        let str=this.props.location.search
        let arr=str.split('=')
      
        let that = this
        axios.get(window.config.host + '/api/partner/detailed?partnerId='+Number(arr[1])).then(function (res) {

            log(res)
            that.setState({
                partner: res.data.data
            })
        })
        axios.get(window.config.host + '/api/partner/list/own/network?partnerId='+Number(arr[1])).then(function (res) {
            
            that.setState({
                netpointList: res.data.data
            })
        })
        axios.get(window.config.host + '/api/partner/list/own/deliver?partnerId='+Number(arr[1])).then(function (res) {
            
            that.setState({
                senderList: res.data.data
            })
        })
    }
    callBack(){
        this.props.history.go(-1)
    }
    renZheng(e) {
        log(e)
    }
    changeSize(){}
    clickPic(e){
        log(e.target.dataset.id)
        if(e.target.dataset.id==0){
          this.setState({
            pic:!this.state.pic
          }) 
        }else if(e.target.dataset.id==1){
          this.setState({
            pic1:!this.state.pic1
          }) 
        }else if(e.target.dataset.id==2){
          this.setState({
            pic2:!this.state.pic2
          }) 
        }else if(e.target.dataset.id==3){
          this.setState({
            pic3:!this.state.pic3
          }) 
        }else if(e.target.dataset.id==4){
            this.setState({
              pic4:!this.state.pic4
            }) 
          }
        
      }
    render() {
        return (<div className="express">
               <div className='top-callback'>
                <div className='partner-title'>合伙人详细信息</div> 
                <Button onClick={this.callBack.bind(this)}>返回</Button>
                </div>
                <div className='partner-detail'>
                <div className='row'>
                    <div className='item'>姓名：{this.state.partner.name}</div>
                    <div className='item'>电话：{this.state.partner.phone}</div>
                    <div className='item'>地址：{this.state.partner.address}</div>
                    <div className='item'>身份证：{this.state.partner.idCardNo}</div>
                </div>
                <div className='row'>
                    <div className='item'>代理区域：{this.state.partner.applyArea}</div>   
                    <div className='item'>审核状态：{this.state.partner.statusMessage}</div>
                    <div className='item'>申请时间：{this.state.partner.applyTime}</div>
                    <div className='item'>招行卡号：{this.state.partner.bankCard}</div>
                </div>         
                <div className='row'>
                    <div className='item'>身份证正面：<img className={this.state.pic?'upload-pic':''} data-id='0' onClick={this.clickPic.bind(this)} alt='' src={this.state.partner.idCardUp} /></div>
                    <div className='item'>身份证反面：<img className={this.state.pic1?'upload-pic':''} data-id='1' onClick={this.clickPic.bind(this)} alt='' src={this.state.partner.idCardDown} /></div>
                    <div className='item'>营业执照：<img className={this.state.pi2c?'upload-pic':''} data-id='2' onClick={this.clickPic.bind(this)} alt='' src={this.state.partner.businessLicense} /></div>
                    <div className="item" > 合同照片：<img className={this.state.pic3?'upload-pic':''} data-id='3' onClick={this.clickPic.bind(this)} alt='' src={this.state.partner.contract}/></div>
                    <div className="item" > 招行卡图片：<img className={this.state.pic4?'upload-pic':''} data-id='4' onClick={this.clickPic.bind(this)} alt='' src={this.state.partner.bankCardUp}/></div>
                </div>
              </div>
            
            <div className="DetailList">合伙人网点</div>
            {/* <div className="shaxuan">
                <Select defaultValue="按审核状态" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="wellpass">待审核</Option>
                    <Option value="pass">通过审核</Option>
                    <Option value="die">未通过审核</Option>
                </Select>
                <Select defaultValue="申请时间" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="timemore">由近到远</Option>
                    <Option value="time">由远到近</Option>
                </Select>
                <Search placeholder="自定义搜索" onSearch={value => console.log(value)} style={{ width: 200 }} />
            </div> */}
            <Table loading={false} columns={this.express} dataSource={this.state.netpointList} />
            <div className="DetailList">合伙人送票员</div>
            <Table loading={false} columns={this.express} dataSource={this.state.sernderList} />
        </div>)
    }
}
export default PartnerDetail
