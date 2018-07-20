import React,{Component} from 'react'
import { Table,Select,Input,Divider ,Icon,Modal,Button, Upload} from 'antd'
import "./index.css"
import axios from 'axios'
import {log} from '../../Comment'
import Qs from 'qs'
const { TextArea } = Input
const Option=Select.Option
const Search=Input.Search

class NetpointAudit extends Component {
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
          arr:['item','hide'],
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
          { title: '经营行业',   dataIndex: 'industry', align:'center', key: 'industry',},
          { title: '电话',  dataIndex: 'phone', align:'center', key: 'phone', },
          { title: '审核状态',  dataIndex: 'statusMessage', align:'center', key: 'statusMessage', },
          { title: '审核通过时间',  dataIndex: 'passTime', align:'center', key: 'passTime', },
          
          { title: '操作', key: 'action',align:'center',  render: (text, record,index) =>{
            if(text.status===2){
              return (<span className="action">
                    <Button data-msg={index} onClick={this.pass.bind(this)}>通过</Button>
                    <Divider type="vertical" />
                    <Button data-msg={index} onClick={this.Unpass.bind(this)}>不通过</Button>
                  </span>)
            }else{
              return (<Button data-msg={index} onClick={this.detail.bind(this)}>详情</Button>)
            }
            
          }        
        }]
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
      axios.post(window.config.host+'/admin/network/list', Qs.stringify({
      status:2})).then(function (res) {
            log('数据',res.data.data)
            that.setState({
              data:res.data.data
            })
      })
    }
    handleCancel(){
      this.componentWillMount()
      this.setState({
        passButton:0,
        unPassButton:0,
        visible:false,
        arr:['item','hide']
      })
    }
    handleOk(){
      let that=this
      let postmsg={}
      log(that.state.partner.networkId)
      if(this.state.unPassButton){
          postmsg={
            networkId:that.state.partner.networkId,
            status:5,
            remark:that.state.remark
          }
      }else if(this.state.passButton){
        postmsg={
          networkId:that.state.partner.networkId,
          status:4,
          contract:that.state.contractUrl
        }
      }
      axios.post(window.config.host+'/admin/network/approve', Qs.stringify(postmsg),{
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded', 
        },
      }).then(res=>{
          log('成功',res)
        that.componentWillMount() 
        this.setState({
          passButton:0,
          unPassButton:0,
          visible:false,
          arr:['item','hide']
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
           <div className="DetailList">网点审核</div>
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
                <div className='item'>姓名：{this.state.partner.name}</div>
                <div className='item'>电话：{this.state.partner.phone}</div>
                <div className='item'>地址：{this.state.partner.address}</div>
                <div className='item'>审核状态：{this.state.partner.statusMessage}</div>
                <div className='item'>申请时间：{this.state.partner.applyTime}</div>
                <div className='item'>申请区域：{this.state.partner.applyArea}</div>
                <div className='item'>经营行业：{this.state.partner.industry}</div>
                <div className='item'>招行卡号：{this.state.partner.bankCard}</div>
                <div className='item'>身份证正面：
                <img className={this.state.pic?'upload-pic':''} data-id='0' onClick={this.clickPic.bind(this)} alt='' src={this.state.partner.idCardUp}/></div>
                <div className='item'>身份证反面：
                <img className={this.state.pic?'upload-pic':''} data-id='1' onClick={this.clickPic.bind(this)} alt='' src={this.state.partner.idCardDown}/></div>
                <div className='item'>营业执照：
                   <img alt='' className={this.state.pic?'upload-pic':''} data-id='2' onClick={this.clickPic.bind(this)} src={this.state.partner.businessLicense}/></div> 
                <div className='item'>招行卡图片：
                   <img alt='' className={this.state.pic5?'upload-pic':''} data-id='5' onClick={this.clickPic.bind(this)} src={this.state.partner.bankCardUp}/>
                </div>
                <div className="item" style={this.state.unPassButton?{display:'block'}:{display:'none'}}>
                       不通过原因：<TextArea rows={4} onChange={this.remarkChange.bind(this)}/>
                </div>

                <div className="item" style={this.state.partner.status===5?{display:'block'}:{display:'none'}}>
                       不通过原因：{this.state.partner.remark}
                </div>
                <div className="item" style={this.state.partner.status===4?{display:'block'}:{display:'none'}}>
                合同照片：<img alt='' className={this.state.pic?'upload-pic':''} data-id='3' onClick={this.clickPic.bind(this)} src={this.state.partner.contract}/>
                </div>

                <div className="item" style={this.state.passButton?{display:'block'}:{display:'none'}}>
                  上传合同：
                  <Upload {...this.mode} style={this.state.show?{display:'block'}:{display:'none'}}>
                  <Button > <Icon type="upload" />上传合同 </Button>
                  </Upload>
                  <img alt='合同' className={this.state.pic?'upload-pic':''} data-id='4' onClick={this.clickPic.bind(this)} src={this.state.contractUrl}/>
                </div>
               
            </div>
          </Modal>
        </div>)
    }
}
export default NetpointAudit
