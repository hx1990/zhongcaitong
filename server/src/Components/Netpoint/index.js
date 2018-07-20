import React,{Component} from 'react'
import { Table,Select,Input,Icon,Modal,Button,Divider,Upload} from 'antd'
import "./index.css"
import axios from 'axios'
import {log} from '../../Comment'
import Qs from 'qs'

const { TextArea } = Input
const Option=Select.Option
const Search=Input.Search

class Netpoint extends Component {
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
          bind:false,
          select:false,
          html:[],
          bindPartner:'',
          partnerInfo:[],
          networkId:0,
          visible1:false,
          pic:false,
          pic1:false,
          pic2:false,
          pic3:false,
          pic4:false,
          pic5:false,
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
          { title: '绑定合伙人',  dataIndex: 'partnerName', align:'center', render: (text, record,index) =>{
            if(record.partnerName){
              return (<span>{record.partnerName}</span>)
            }
            if(!this.state.bind){
              return (<span className="action">
                    <Button data-msg={record.networkId} onClick={this.selectPartner.bind(this)}>选择合伙人</Button>
                  </span>)
            }else{
              return (<span>{this.state.bindPartner}</span>)
            }
            
          }},
          
          { title: '操作', key: 'action',align:'center',  render: (text, record,index) =>{
            if(text.status===2){
              return (<span className="action">
                    <Button data-msg={index} onClick={this.pass.bind(this)}>通过</Button>
                    <Divider type="vertical" />
                    <Button data-msg={index} onClick={this.Unpass.bind(this)}>不通过</Button>
                  </span>)
            }else{
              return (<span>
                <Button data-msg={index} onClick={this.detail.bind(this)}>详情</Button>
                {text.bankCard?null:<Button data-id={text.networkId} onClick={this.addCard.bind(this)}>添加卡号</Button>}
              </span>)
            }
            
          } 
        }]
    }
    selectPartner(e){
      let that=this
      log('aaaaaa',e.target.dataset.msg)
      this.setState({
        networkId:e.target.dataset.msg
      })
      axios.get(window.config.host+'/admin/partner/name/pass/list').then(function (res) {
        log('用户列表',res.data.data)
        let arr=[]
        res.data.data.forEach((key,index)=>{
            arr.push(<Option value={key.name}  key={index}>{key.name}</Option>)
        })
       
        that.setState({
            html:arr,
            partnerInfo:res.data.data,
        })
  })
        this.setState({
         select:true,
        })
    }
    selectOk(e){
      let that=this
       if(this.state.bindPartner){
          this.state.partnerInfo.forEach((key,index)=>{
              if(key.name==this.state.bindPartner){
                log(key.partnerId)
                axios.post(window.config.host+'/admin/network/bind/partner',Qs.stringify({
                  networkId:that.state.networkId,
                  partnerId:key.partnerId
                })).then(function (res) {
                  log('成功',res)
                })
              }
          })
           this.setState({
            bind:true,
            select:false 
           })
       }
    }
    selectCancel(e){
        this.setState({
            select:false 
        })
    }
    handleOk1(e){
      
      let that=this
      let postmsg={}
      
        postmsg={
          networkId:that.state.networkId,
          bankCard:that.state.bankCard
        }
      
      axios.post(window.config.host+'/admin/user/update/bank/card', Qs.stringify(postmsg),{
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded', 
        },
      }).then(res=>{
        that.componentWillMount() 
        this.setState({
         
          visible1:false,
        })
      })
       
    }
    handleCancel1(){
      this.setState({
        visible1:false,
      })
    }
    inputCard(e){
      this.setState({
        bankCard:e.target.value
      })
    }
    addCard(e){
      log(e.target.dataset.id)
      this.setState({
        visible1:true,
        networkId:e.target.dataset.id
      })
    }
    parterchange(e){
          log('选中数据',e)
          this.setState({
            bindPartner:e
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
    
     
      axios.post(window.config.host+'/admin/network/list').then(function (res) {
          let arr=[]
          res.data.data.forEach((key)=>{
              if(key.status!=2){
                arr.push(key)
              }
          })
          log('list',arr)
          that.setState({
            data:arr
          })
      })
    }
    handleCancel(){
      this.setState({
        visible:false,
      })
    }
    handleOk(){
        this.setState({
          visible:false,
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
      }else if(e.target.dataset.id==5){
        this.setState({
          pic5:!this.state.pic5
        }) 
      }
      
    }
    render(){
        return (<div className="express">
           <div className="DetailList">网点列表</div>
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
          <Modal title="绑定合伙人" visible={this.state.select} okText="确认" cancelText="取消" onOk={this.selectOk.bind(this)} onCancel={this.selectCancel.bind(this)}>
              <div className='parter-info'>
                <Select defaultValue="选择合伙人" style={{ width: 180 }} onChange={this.parterchange.bind(this)}>
                        {this.state.html}
                </Select>
              </div>
          </Modal>
          <Modal title="个人详情" visible={this.state.visible} okText="确认" cancelText="取消" onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
              <div className='parter-info'>
                <div className='item'>姓名：{this.state.partner.name}</div>
                <div className='item'>电话：{this.state.partner.phone}</div>
                <div className='item'>地址：{this.state.partner.address}</div>
                <div className='item'>审核状态：{this.state.partner.statusMessage}</div>
                <div className='item'>申请时间：{this.state.partner.applyTime}</div>
                <div className='item'>招行卡号：{this.state.partner.bankCard}</div>
                <div className='item'>身份证正面：
                   <img className={this.state.pic?'upload-pic':''} data-id='0' onClick={this.clickPic.bind(this)} alt='' src={this.state.partner.idCardUp}/></div>
                <div className='item'>身份证反面：
                    <img className={this.state.pic1?'upload-pic':''} data-id='1' onClick={this.clickPic.bind(this)} alt='' src={this.state.partner.idCardDown}/></div>
                <div className='item'>营业执照：
                    <img className={this.state.pic2?'upload-pic':''} data-id='2' onClick={this.clickPic.bind(this)} alt='' src={this.state.partner.businessLicense}/>
                </div> 

                <div className='item'>招行卡图片：
                    <img className={this.state.pic3?'upload-pic':''} data-id='3' onClick={this.clickPic.bind(this)} alt='' src={this.state.partner.bankCardUp}/>
                </div> 
                
                <div className="item" style={this.state.partner.status===5?{display:'block'}:{display:'none'}}>
                       不通过原因：{this.state.partner.remark}
                </div>

                <div className="item" style={this.state.partner.status===4?{display:'block'}:{display:'none'}}>
                合同照片：<img className={this.state.pic4?'upload-pic':''} data-id='4' onClick={this.clickPic.bind(this)} alt='' src={this.state.partner.contract}/>
                </div>
                
               
            </div>
          </Modal>
          <Modal title="个人详情" visible={this.state.visible1} okText="确认" cancelText="取消" onOk={this.handleOk1.bind(this)} onCancel={this.handleCancel1.bind(this)}>
              <div className='parter-info'>
              <div className='item'>添加银行卡：<Input className="width170" onInput={this.inputCard.bind(this)} placeholder="输入账户卡号" /></div>
              </div>
          </Modal>
        </div>)
    }
}
export default Netpoint
