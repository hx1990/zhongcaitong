import React,{Component} from 'react'
import { Table,Select,Input,Modal,Button} from 'antd'
import "./index.css"
import axios from 'axios'
import {log} from '../../Comment'
import Qs from 'qs'
import { NavLink } from 'react-router-dom'

const Option=Select.Option
const Search=Input.Search

class Partner extends Component {
     constructor(){
        super()
        this.state={
          data :[],
          visible:false,
          partner:{},
          contractUrl:'',
          show:true,
          passButton:0,
          unPassButton:0,
          remark:'',
          arr:['item','hide']
        }
        let that=this
        this.mode={
          action: '/upload/picture',
          onChange({ file}) {
            if(file.status==="done"){
              that.setState({
                show:false,
                contractUrl:file.response.data
              })
            }
          },
        }
        this.express=[
          { title: '姓名',  dataIndex: 'name', align:'center', key: 'name', }, 
          { title: '申请日期',   dataIndex: 'applyTime',align:'center',  key: 'applyTime', },
          { title: '申请区域',  dataIndex: 'applyArea',width:'10%',align:'center',  key: 'applyArea', }, 
          { title: '电话',  dataIndex: 'phone', align:'center', key: 'phone', },
          { title: '审核状态',  dataIndex: 'statusMessage', align:'center', key: 'statusMessage', },
          { title: '审核通过时间',  dataIndex: 'passTime', align:'center', key: 'passTime', },
          { title: '操作', key: 'action',align:'center',  render: (text, record,index) =>{
                return (<span>
                  <NavLink activeClassName="activeRoute" to={`/partnerDetail?partnerId=${text.partnerId}`}>
                      <Button>详情</Button>
                  </NavLink>
                 {text.bankCard?null:<Button data-id={text.partnerId} onClick={this.addCard.bind(this)}>添加卡号</Button>}
                </span>)
          }        
        }]
    }
    addCard(e){
     
      this.setState({
        visible:true,
        partnerId:e.target.dataset.id
      })
    }
    inputCard(e){
       log(e.target.value)
       this.setState({
         bankCard:e.target.value
       })
    }
    pass(e){
       let index=e.target.dataset.msg
       let data=this.state.data[index]
       this.setState({
        visible:true,
        partner:data,
        passButton:1
       })
    }
    Unpass(e){
      let index=e.target.dataset.msg
       let data=this.state.data[index]
       this.setState({
        visible:true,
        partner:data,
        unPassButton:1,
        arr:['item']
       },()=>{
        log(this.state.unPassButton)
       })
       
    }
    detail(e){
      let index=e.target.dataset.msg
       let data=this.state.data[index]
       log('详情',data)
       this.setState({
        visible:true,
        partner:data,
       })
    }
    componentWillMount(){
     let that=this
      axios.post(window.config.host+'/admin/partner/list', Qs.stringify({
        status:4})).then(function (res) {
            log(res.data.data)
            that.setState({
              data:res.data.data
            })
      })
    }
    handleCancel(){
      this.componentWillMount()
      this.setState({
        visible:false,
      })
    }
    handleOk(){
      let that=this
      let postmsg={}
      
        postmsg={
          partnerId:that.state.partnerId,
          bankCard:that.state.bankCard
        }
      
      axios.post(window.config.host+'/admin/user/update/bank/card', Qs.stringify(postmsg),{
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded', 
        },
      }).then(res=>{
        that.componentWillMount() 
        this.setState({
         
          visible:false,
        })
      })
      
     
    }
    renZheng(e){
      log(e)
    }
    remarkChange(e){
      log(e.target.value)
      this.setState({
        remark:e.target.value
      })
    }
    render(){
        return (<div className="express">
          <div className="DetailList">合伙人列表</div>
           {/*<div className="shaxuan">
              <Select defaultValue="按审核状态" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="wellpass">待审核</Option>
                    <Option value="pass">通过审核</Option>
                    <Option value="die">未通过审核</Option>
              </Select>
              <Select defaultValue="申请时间" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="timemore">由近到远</Option>
                    <Option value="time">由远到近</Option>
              </Select>
              
              <Select defaultValue="区域" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="timemore">顺丰</Option>
                    <Option value="time">韵达</Option>
              </Select>
              
              <Search placeholder="自定义搜索"  onSearch={value => console.log(value)}  style={{ width: 200 }} />
          </div> */}
          <Table  loading={false} columns={this.express} dataSource={this.state.data} />
          <Modal title="个人详情" visible={this.state.visible} okText="确认" cancelText="取消" onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
              <div className='parter-info'>
              <div className='item'>添加银行卡：<Input className="width170" onInput={this.inputCard.bind(this)} placeholder="输入账户卡号" /></div>
              </div>
          </Modal>
          
        </div>)
    }
}
export default Partner
