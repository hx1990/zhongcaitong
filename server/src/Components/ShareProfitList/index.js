import React, {Component} from 'react'
import { Table,DatePicker} from 'antd'
import "./index.css"
import Qs from 'qs'
import axios from 'axios'


import locale from 'antd/lib/date-picker/locale/zh_CN'
import moment from 'moment'


const log=console.log.bind(console)
// const Option=Select.Option
// const Search=Input.Search
const toDub=n=>{
      return n>9?''+n:'0'+n
}
let time=new Date().getTime()
let tmp=time-24*60*60*1000
let dateNow = new Date(tmp);
let  date=dateNow.getFullYear()+'-'+toDub(dateNow.getMonth()+1)+'-'+toDub(dateNow.getDate())
 

class ShareProfitList extends Component{
    constructor(){
        super()
        this.state={
          data :[],
          date
        }
        this.express=[
            { title: '网点',  dataIndex: 'networkName',width:'10%',align:'center',  key: 'networkName', }, 
            { title: '网点地址',  dataIndex: 'networkAdress', align:'center', key: 'networkAdress', },
            
            { title: '合伙人',   dataIndex: 'partnerName',align:'center',  key: 'partnerName', },
            { title: '合伙人区域',  dataIndex: 'partnerArea', align:'center', key: 'partnerArea', },
            { title: '合伙人分润',  dataIndex: 'partnerProfit', align:'center', key: 'partnerProfit', },
            { title: '网点分润',  dataIndex: 'networkProfit', align:'center', key: 'networkProfit', },
            { title: '总分润',  dataIndex: 'totalProfit', align:'center',key:'totalProfit'}
            
      ]
    }

    componentWillMount(){
          let that=this
      axios.post(window.config.host+'/admin/profit/day/list').then(function (res) {
            log(res)
            that.setState({
                  data:res.data.data,
                  
            })
      }) 
    }
    renZheng(e){
      log(e)
    }
    payStatus(e){
         
    }
    onChange(date, dateString){
        log(date, dateString)
        let that=this
        axios.post(window.config.host+'/admin/profit/day/list', Qs.stringify({
            date:dateString
          })).then(function (res) {
               
                that.setState({
                      data:res.data.data
                })
          }) 
    }
    render(){
        return (<div className="express">
          <div className="DetailList">每日分润列表</div>
          <div className="shaxuan">
              <DatePicker onChange={this.onChange.bind(this)} defaultValue={moment(this.state.date)} placeholder="选择日期" locale={locale} />
              
              {/* <Select defaultValue="金额" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="timemore">由高到低</Option>
                    <Option value="time">由低到高</Option>
              </Select>
              <Select defaultValue="区域" style={{ width: 120 }} onSelect={this.payStatus.bind(this)}>
                    <Option value="2">未支付</Option>
                    <Option value="3">已支付</Option>
                   
                    <Option value="5">已出票</Option>
              </Select> */}
              {/* <Select defaultValue="机柜" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="timemore">00001</Option>
                    <Option value="time">0002</Option>
              </Select>
               */}
              {/* <Search placeholder="自定义搜索"  onSearch={value => console.log(value)}  style={{ width: 200 }} /> */}
          </div>
          <Table columns={this.express} dataSource={this.state.data} />
          
        </div>)
    }
}
export default ShareProfitList