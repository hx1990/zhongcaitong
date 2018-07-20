import React,{Component} from 'react'
import { InputNumber,Button,Select,Table, Icon, Divider ,Input} from 'antd'
import './index.css'
import {cityList,log} from '../../Comment'
const Search=Input.Search
const express = [
    { title: '序号', dataIndex: 'number',  key: 'number',render: text => <a href="javascript">{text}</a>, }, 
    { title: 'ID',  dataIndex: 'ID',  key: 'ID', }, 
    { title: '发件地',  dataIndex: 'sendAddress',  key: 'sendAddress',},
    { title: '快递公司',  dataIndex: 'expressCompany',  key: 'expressCompany', },  
    { title: '距离',   dataIndex: 'distance',  key: 'distance', },
    { title: '收件地',   dataIndex: 'receiveAddress',  key: 'receiveAddress', },
    { title: '文件',   dataIndex: 'file',  key: 'file',},
    { title: '首重',  dataIndex: 'fristWeight',  key: 'fristWeight', },
    { title: '续重',  dataIndex: 'nextWeight',  key: 'nextWeight', },
    { title: '操作', key: 'add',  render: (text, record) => (
      <span >
          <a href="javascrpt">修改</a>
      </span>
    ),
  }]
const formList = [
        { loop: '第一环线', city: [], index: 0 },  
        { loop: '第二环线',city: [], index: 1 },
        { loop: '第三环线',index: 2, city: [], }, 
        { loop: '第四环线',city: [], index: 3 }, 
        { loop: '第五环线',city: [], index: 4 }
     ]
const Option=Select.Option
class ExpressCost extends Component{
    constructor(){
        super()
        this.state={
            data :[],
            provinceList:[],
            selectList:[],
            liList:[],
            cityOption:[],
            checkedList:[],
            selectCity:'',
            company:'',
            loop:0,
            pricList:[],
            filePrice:0,
            fristWeight:0,
            nextWeight:0,
            bshow:true,
            express:express
        }
    }
    componentDidMount(){
        
    }
    add(){
       this.setState({
         bshow:!this.state.bshow
       })
    }
    //添加城市
    cityItemAdd(e){
        let index=parseInt(e.target.dataset.index)
        let temp=this.state.provinceList
        log(this.state.loop)
        formList.forEach((key)=>{
            log(key.index)
            if(key.index==this.state.loop){
                key.city.push(this.state.provinceList[index])
                temp.splice(index,1)
            }
        })
        this.setState({
            pricList:formList,
            provinceList:temp
        },()=>{
                // let liList=[]
                // let cityOption=[]
                // this.state.provinceList.forEach((key,index)=>{
                //     liList.push(<li><Button onClick={this.cityItemAdd.bind(this)} data-index={index}>{key}</Button></li>)
                // })
                // let checkedList=[]
                // this.state.pricList.forEach((key,index)=>{
                //     if(key.index==this.state.loop){
                //         key.city.forEach((item)=>{
                //             checkedList.push(<li><span onClick={this.delete.bind(this)} data-index={index}>{item}</span></li>)
                //         })
                //     }
                    
                // })
                // this.setState({
                // liList,
                // checkedList
                // }) 
                this.updata() 
        })
    }
    updata(){
        let liList=[]
        let cityOption=[]
        this.state.provinceList.forEach((key,index)=>{
            liList.push(<li><Button onClick={this.cityItemAdd.bind(this)} data-index={index}>{key}</Button></li>)
        })
        let checkedList=[]
        this.state.pricList.forEach((key)=>{
            if(key.index==this.state.loop){
                key.city.forEach((item,index)=>{
                    checkedList.push(<li><span onClick={this.delete.bind(this)} data-index={index}>{item}</span></li>)
                })
            }
            
        })
        this.setState({
        liList,
        checkedList
        })  
    }
    delete(e){
       let index=parseInt(e.target.dataset.index)
       log(index)
       let temp=this.state.provinceList
        formList.forEach((key)=>{
            if(key.index==this.state.loop){
                temp.push(key.city[index])
                key.city.splice(index,1)
            }
        })
        this.setState({
            pricList:formList,
            provinceList:temp
        },()=>{
            this.updata()
        })
        
    }
    
    //选择环线
    loopChange(e){
        this.setState({
            loop:Number(e)
        },()=>{
            this.updata()
        })
    }
    renZheng(){}
    //选择快递公司
    compenyChange(e){
        
        this.setState({
            company:e
        })
        
    }
    componentWillMount(){
        
        let tempList=[]
        cityList.forEach((key)=>{
          tempList.push(key.name)
        })
        this.setState({
             provinceList:tempList,
             selectList:tempList
           },
            ()=>{
                let liList=[]
                let cityOption=[]
                this.state.provinceList.forEach((key,index)=>{
                    liList.push(<li><Button onClick={this.cityItemAdd.bind(this)} data-index={index}>{key}</Button></li>)
                })
                this.state.selectList.forEach((key,index)=>{ 
                    cityOption.push(<Option value={key}>{key}</Option>)
                })
                this.setState({
                liList,
                cityOption
            })
        })
        
    }
    //选择发件城市
    handleChange(e){
        this.setState({
            selectCity:e
        })
    }
    //添加文件价格
    fileChange(e){
        this.setState({
            filePrice:e
        })
       log(typeof e)
    }
    //添加首重价格
    fristWeightChange(e){
         this.setState({
            fristWeight:e
        })
    }
    //添加续重价格
    nextWeightChange(e){
        this.setState({
            nextWeight:e
        })
    }
    //提交列表
    submit(){
       formList.forEach((key,index)=>{
           if(key.index==this.state.loop){
               key.file=this.state.filePrice
               key.fristWeight=this.state.fristWeight
               key.nextWeight=this.state.nextWeight
               key.sendAddress=this.state.selectCity
               key.expressCompany=this.state.company
           }
       })
       let tempData=[]
       formList.forEach((key)=>{
           if(key.city.length>0){
               key.city.forEach((item)=>{
                 let json=[]
                 json.sendAddress=key.sendAddress
                 json.distance=key.loop
                 json.expressCompany=key.expressCompany
                 json.receiveAddress=item
                 json.file=key.file
                 json.fristWeight=key.fristWeight
                 json.nextWeight=key.nextWeight
                 tempData.push(json)
               }) 
               log(tempData)             
           }
       })
       
       this.setState({
           data:tempData,
           bshow:!this.state.bshow
       })
    }
    render(){
        return (<div className="expressCost">
            <h3>资费设置</h3>
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
          <Table columns={this.state.express} dataSource={this.state.data} />
          <Button style={this.state.bshow?{'display':'none'}:{'display':'block'}} type="primary" onClick={this.add.bind(this)}>添加</Button>
            <div style={this.state.bshow?{'display':'block'}:{'display':'none'}}>
                <div className="costtitle">
                    <div className="item">
                        <span>选择发件地址</span>
                        
                        <Select defaultValue="选择省份" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                            {this.state.cityOption}
                        </Select>
                    </div>
                    <div className="item">
                        <span>选择快递公司</span>
                        <Select defaultValue="快递公司" style={{ width: 120 }} onChange={this.compenyChange.bind(this)}>
                            <Option value="顺丰">顺丰</Option>
                            <Option value="圆通">圆通</Option>
                            <Option value="中通">中通</Option>
                        </Select>
                    </div>
                    <div className="item">
                        <span>选择环线</span>
                        <Select defaultValue="选择环线" style={{ width: 120 }} onChange={this.loopChange.bind(this)}>
                            <Option value="0">第一环线</Option>
                            <Option value="1">第二环线</Option>
                            <Option value="2">第三环线</Option>
                            <Option value="3">第四环线</Option>
                            <Option value="4">第五环线</Option>
                        </Select>
                    </div>
                    <div className="item">
                        <ul className='chekedcity'>
                           {this.state.checkedList}
                        </ul>
                    </div>
                </div>
                <ul className="provinceList">
                    {this.state.liList}
                </ul>
                
                <div className="price">
                  <div className="subprice">文件：<InputNumber onChange={this.fileChange.bind(this)}/>元</div>
                  <div className="subprice">包裹首重：<InputNumber onChange={this.fristWeightChange.bind(this)}/>kg/元</div>
                  <div className="subprice">续重：<InputNumber onChange={this.nextWeightChange.bind(this)}/>kg/元</div>
                </div>
                <Button type="primary" onClick={this.submit.bind(this)}>确认提交</Button>
            </div>
        </div>)
    }
}

export default ExpressCost