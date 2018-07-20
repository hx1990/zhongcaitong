import React, { Component } from 'react'
import './index.css'
import {log} from '../../Comment'
import axios from 'axios'
import Qs from 'qs'
import { Select,Input,Table, Button,Modal,Upload,Icon } from 'antd'
import userUrl from "../../images/user.png"

const Option=Select.Option

const host=window.config.host
const list=[
    {
      "name": "杭州",
      "area": [
        "拱墅区",
        "西湖区",
        "上城区",
        "下城区",
        "江干区",
        "滨江区",
        "余杭区",
        "萧山区",
        "建德市",
        "富阳市",
        "临安市",
        "桐庐县",
        "淳安县",
        "其他"
      ]
    }, {
      "name": "宁波",
      "area": [
        "海曙区",
        "江东区",
        "江北区",
        "镇海区",
        "北仑区",
        "鄞州区",
        "余姚市",
        "慈溪市",
        "奉化市",
        "宁海县",
        "象山县",
        "其他"
      ]
    }, {
      "name": "温州",
      "area": [
        "鹿城区",
        "龙湾区",
        "瓯海区",
        "瑞安市",
        "乐清市",
        "永嘉县",
        "洞头县",
        "平阳县",
        "苍南县",
        "文成县",
        "泰顺县",
        "其他"
      ]
    }, {
      "name": "嘉兴",
      "area": [
        "秀城区",
        "秀洲区",
        "海宁市",
        "平湖市",
        "桐乡市",
        "嘉善县",
        "海盐县",
        "其他"
      ]
    }, {
      "name": "湖州",
      "area": [
        "吴兴区",
        "南浔区",
        "长兴县",
        "德清县",
        "安吉县",
        "其他"
      ]
    }, {
      "name": "绍兴",
      "area": [
        "越城区",
        "诸暨市",
        "上虞市",
        "嵊州市",
        "绍兴县",
        "新昌县",
        "其他"
      ]
    }, {
      "name": "金华",
      "area": [
        "婺城区",
        "金东区",
        "兰溪市",
        "义乌市",
        "东阳市",
        "永康市",
        "武义县",
        "浦江县",
        "磐安县",
        "其他"
      ]
    }, {
      "name": "衢州",
      "area": [
        "柯城区",
        "衢江区",
        "江山市",
        "龙游县",
        "常山县",
        "开化县",
        "其他"
      ]
    }, {
      "name": "舟山",
      "area": [
        "定海区",
        "普陀区",
        "岱山县",
        "嵊泗县",
        "其他"
      ]
    }, {
      "name": "台州",
      "area": [
        "椒江区",
        "黄岩区",
        "路桥区",
        "临海市",
        "温岭市",
        "玉环县",
        "天台县",
        "仙居县",
        "三门县",
        "其他"
      ]
    }, {
      "name": "丽水",
      "area": [
        "莲都区",
        "龙泉市",
        "缙云县",
        "青田县",
        "云和县",
        "遂昌县",
        "松阳县",
        "庆元县",
        "景宁畲族自治县",
        "其他"
      ]
    }, {
      "name": "其他",
      "area": [
        "其他"
      ]
    }
  ]
 let cityList=[]
 list.forEach((key)=>{
   cityList.push(key.name)
 })

class UserInfo extends Component {
    constructor(){
        super()
        this.state={
         data:[],
         visible:false,
         show:true,
         show1:true,
         show2:true,
         show3:true,
         cityList,
         cityHtml:[],
         applyHtml:[],
         role:'',
         selRole:'',
         userId:0,
         name:'',
         phone:'',
         idCardNum:'',
         industry:'',
         businessLicenseUrl:'',
         idCardUpUrl:'',
         idCardDownUrl:'',
         contractUrl:'',
         adrssCity:'',
         addrssArea:'',
         applySelCity:'',
         applySelArea:'',
         detail:''
        }
        let that=this
        this.mode={
          action: host+'/upload/picture',
          onChange({ file}) {
            if(file.status==="done"){
              that.setState({
                show:false,
                idCardUpUrl:file.response.data
              })
            }
          },
        }
        this.mode1={
          action: host+'/upload/picture',
          onChange({ file}) {
            if(file.status==="done"){
              that.setState({
                show1:false,
                idCardDownUrl:file.response.data
              })
            }
          },
        }
        this.mode2={
          action: host+'/upload/picture',
          onChange({ file}) {
            if(file.status==="done"){
              that.setState({
                show2:false,
                businessLicenseUrl:file.response.data
              })
            }
          },
        }
        this.mode3={
          action: host+'/upload/picture',
          onChange({ file}) {
            if(file.status==="done"){
              that.setState({
                show3:false,
                contractUrl:file.response.data
              })
            }
          },
        }

        this.columns=[
          { title: 'ID',  dataIndex: 'id', align:'center',  key: 'id', }, 
          { title: '微信昵称',  dataIndex: 'nickName', align:'center', key: 'nickName', }, 
          { title: '注册日期',  dataIndex: 'registerDate', align:'center',  key: 'registerDate', }, 
          { title: '角色',  dataIndex: 'userRole', align:'center',  key: 'userRole', }, 
          { title: '联机状态',  dataIndex: 'cabinetNum', align:'center',  key: 'cabinetNum', },
         
          { title: '积分',  dataIndex: 'integral', align:'center',  key: 'integral', },
          { title: '详情', key: '详情', align:'center',  render: (text, record,index) =>{
            if(text.userRole==='合伙人|网点|送票员'){
              return (<span></span>)
            }else{
              return (<Button data-msg={index} onClick={this.detail.bind(this)}>添加角色</Button>)
            }
              
            }        
          }
        ]
    }

    detail(e){
      
      let data=this.state.data[e.target.dataset.msg]
      log(data)
      this.setState({
        visible:true,
        role:data.userRole,
        userId:data.id
      })
    }

    componentWillMount(){
      let cityHtml=[]
     this.state.cityList.forEach((key,index)=>{
      cityHtml.push(<Option value={index}>{key}</Option>)
     })
     this.setState({
      cityHtml
      })
      axios.get(`${host}/admin/get/user/list`).then(res=>{
        this.setState({
          data:res.data.data
        })
      })
    }

    addAuthNo(){}

    renZheng(e){
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
    }

    handleOk(){
      let that=this
      let address='浙江省'+this.state.adrssCity+'市'+this.state.addrssArea+this.state.detail
      let applyArea=this.state.applySelCity+'市'+this.state.applySelArea
      let msg={
        role:this.state.selRole,
        name:this.state.name,
        phone:this.state.phone,
        address,
        idCardNum:this.state.idCardNum,
        idCardUp:this.state.idCardUpUrl,
        idCardDown:this.state.idCardDownUrl,
        businessLicense:this.state.businessLicenseUrl,
        applyArea,
        industry:this.state.industry,
        contract:this.state.contractUrl,
        userId:this.state.userId,
        bankCard:this.state.bankCard
      }
       log(msg)
      axios.post(host+'/admin/user/save/role',Qs.stringify(msg)).then(res=>{
        log(res.data)
        that.componentWillMount()
        that.setState({
          selRole:'',
          name:'',
          phone:'',
          idCardNum:'',
          idCardUpUrl:'',
          idCardDownUrl:'',
          businessLicenseUrl:'',
          industry:'',
          contractUrl:'',
          userId:0
        })
      })
      this.setState({
        visible:false
      })
    }
    
    

    handleCancel(){
      this.setState({
        visible:false
      })
    }
    
    selectCity(e){
      let areaList=list[e].area
      let areaHtml=[]
      areaList.forEach((key,index)=>{
        areaHtml.push(<Option value={key}>{key}</Option>)
      })
      this.setState({
        areaHtml,
        adrssCity:list[e].name
      })
    }
    selectArea(e){
      this.setState({
       addrssArea:e
      })
    }

    applyCity(e){
      let areaList=list[e].area
      let applyHtml=[]
      areaList.forEach((key,index)=>{
        applyHtml.push(<Option value={key}>{key}</Option>)
      })
      this.setState({
        applyHtml,
        applySelCity:list[e].name
      })
    }

    applyArea(e){
      this.setState({
        applySelArea:e
       })
    }


    addName(e){
      this.setState({
        name:e.target.value
      })
    }

    addPhone(e){
      this.setState({
        phone:e.target.value
      })
    }

    addIdCardNum(e){
      this.setState({
        idCardNum:e.target.value
      })
    }
    
    addIndustry(e){
      this.setState({
        industry:e.target.value
      })
    }

    addDetail(e){
      this.setState({
        detail:e.target.value
      })
    }
   
    addbank(e){
      this.setState({
        bankCard:e.target.value
      })
    }

    selectRole(e){
      this.setState({
        selRole:e
      })
    }
    
    render(){
        return (<div className="userInfo">
            <div className="usertitle">
              <img alt='img' src={userUrl}/>
              <span>用户信息管理</span>
            </div>
            {/* <div>
             
              <Select defaultValue="按认证" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                <Option value="done">完成认证</Option>
                <Option value="die">未完成认证</Option>
              </Select>
              <Select defaultValue="快递量" style={{ width: 120 }} >
                <Option value="expressmore">快递量由高到低</Option>
                <Option value="less">快递量由低到高</Option>
              </Select>
              <Select defaultValue="金额" style={{ width: 120 }} >
                <Option value="pricemore">金额由高到低</Option>
                <Option value="price">金额由低到高</Option>
              </Select>
              <Select defaultValue="积分" style={{ width: 120 }} >
                <Option value="scoremore">积分由高到低</Option>
                <Option value="score">积分由低到高</Option>
              </Select>
              <Select defaultValue="按红包" style={{ width: 120 }} >
                <Option value="yhqmore">红包由高到低</Option>
                <Option value="yhq">红包由低到高</Option>
              </Select>
              <Search placeholder="自定义搜索"  onSearch={value => console.log(value)}  style={{ width: 200 }} />
            </div>  */}
            {/* 展示数据 */}
            <Table columns={this.columns} dataSource={this.state.data} />
            <Modal title="添加角色" visible={this.state.visible} okText="确认" cancelText="取消" onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
              <div className='parter-info'>
                <div className='item'>
                     选择角色： 
                    <Select defaultValue='选择角色' style={{ width: 120 }} onChange={this.selectRole.bind(this)} >
                            <Option value="合伙人" disabled={this.state.role.indexOf('合伙人')>=0}>合伙人</Option>
                            <Option value="网点" disabled={this.state.role.indexOf('网点')>=0}>网点</Option>
                            <Option value="送票员" disabled={this.state.role.indexOf('送票员')>=0}>送票员</Option>
                    </Select>
                </div>
                <div className='item'>姓名：<Input  className="width140" onInput={this.addName.bind(this)} placeholder="输入用户名" /></div>
                <div className='item'>电话：<Input className="width140" onInput={this.addPhone.bind(this)} placeholder="输入手机号" /></div>
                <div className='item'>招行卡：<Input className="width140" onInput={this.addbank.bind(this)} placeholder="输入招行卡号" /></div>
                <div className='item'>身份证号：<Input className="width140" onInput={this.addIdCardNum.bind(this)} placeholder="输入身份证号" /></div>
                <div className='item' style={this.state.selRole=='网点'?{display:'block'}:{display:'none'}}>经营行业：<Input className="width140" onInput={this.addIndustry.bind(this)} placeholder="输入经营行业" /></div>
                <div className='item'>
                    地址：
                    <Select defaultValue='选择城市' style={{ width: 120 }} onChange={this.selectCity.bind(this)}>
                            {this.state.cityHtml}
                    </Select>
                    <Select defaultValue='选择区' style={{ width: 120 }} onChange={this.selectArea.bind(this)}>
                             {this.state.areaHtml}
                    </Select>
                </div>
                <div className='item'>详细地址：<Input className="width140" onInput={this.addDetail.bind(this)} placeholder="输入详细地址" /></div>
                <div className='item'>
                     申请区域：
                    <Select defaultValue='选择城市' style={{ width: 120 }} onChange={this.applyCity.bind(this)}>
                    {this.state.cityHtml}
                    </Select>
                    <Select defaultValue='选择区' style={{ width: 120 }} onChange={this.applyArea.bind(this)}>
                    {this.state.applyHtml}
                    </Select>
                </div>
                <div className='item'>
                     身份证正面：
                     <Upload {...this.mode} style={this.state.show?{display:'block'}:{display:'none'}}>
                       <Button > <Icon type="upload" />上传身份证正面 </Button>
                     </Upload>
                     <img alt='' src={this.state.idCardUpUrl}/>
                </div>
                <div className='item'>
                   身份证反面：
                   <Upload {...this.mode1} style={this.state.show1?{display:'block'}:{display:'none'}}>
                       <Button > <Icon type="upload" />上传身份证反面 </Button>
                   </Upload>
                   <img alt='' src={this.state.idCardDownUrl}/>
                </div>
                <div className='item'>
                   营业执照：
                   <Upload {...this.mode2} style={this.state.show2?{display:'block'}:{display:'none'}}>
                       <Button > <Icon type="upload" />营业执照 </Button>
                   </Upload>
                   <img alt='' src={this.state.businessLicenseUrl}/>
                </div> 
                <div className="item" >
                  上传合同：
                  <Upload {...this.mode3} style={this.state.show3?{display:'block'}:{display:'none'}}>
                  <Button > <Icon type="upload" />上传合同 </Button>
                  </Upload>
                  <img alt='' src={this.state.contractUrl}/>
                </div>
            </div>
          </Modal>
           <userDetail/>
        </div>)
    }
}

export default UserInfo