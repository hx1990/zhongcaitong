import React,{Component} from 'react'
import { Table,Select,Input,Button,Icon} from 'antd'
import "./index.css"
import axios from 'axios'
import {log} from '../../Comment'
import Qs from 'qs'

const Option=Select.Option
const Search=Input.Search

let  inow=0
class EditableCell extends React.Component {
    state = {
      value: this.props.value,
      editable: false,
    }
    componentDidMount(){
         
      this.props.onRef1&&this.props.onRef1(this)
      this.props.onRef2&&this.props.onRef2(this)
    }
    
    handleChange = (e) => {
      log(e.target)
      const value = e.target.value;
      this.setState({ value });
      
    }
  
    check = (e) => {
      log(e)
      this.setState({ editable: false });
      if (this.props.onChange) { 
        this.props.onChange(this.state.value);
      }
    }
  
    edit = () => {
      this.setState({ editable: true });
    }
  
    render() {
      const { value, editable } = this.state;
      return (
        <div className="editable-cell">
          {
            editable ? (
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
                suffix={(
                  <Button
                    type="check"
                    className="editable-cell-icon-check"
                    onClick={this.check}
                  >确认</Button>
  )}
              />
            ) : (
              <div style={{ paddingRight: 24 }}>
                {value || ' '}
                {/* <Icon
                  type="edit"
                  className="editable-cell-icon"
                  onClick={this.edit}
                /> */}
              </div>
            )
          }
        </div>
      );
    }
  }

class ShareProfitSet extends Component {
     constructor(...args){
        super(...args)
        this.state={
          data :[],
          profitId:0
        }
        this.child={}
        this.express=[
          { title: '合伙人',  dataIndex: 'partnerName', align:'center', key: 'partnerName', }, 
          { title: '合伙人区域',  dataIndex: 'partnerApplyArea',width:'10%',align:'center',  key: 'partnerApplyArea', },
          { title: '网点',   dataIndex: 'networkName',align:'center',  key: 'networkName', },
          { title: '网点地址',  dataIndex: 'networkApplyArea', align:'center', key: 'networkApplyArea', },
          { title: '合伙人分润比（%）',  dataIndex: 'partnerProfit', align:'center', render: (text, record) => (
            <EditableCell
              value={text}
              onRef1={this.onRef1}
              onChange={this.onCellChange.bind(this)}
              />
          ),},
          { title: '网点分润比(%)',  dataIndex: 'networkProfit', align:'center', render: (text, record) => (
            <EditableCell
              value={text}
              onRef2={this.onRef2}
              // onChange={this.onCellChange}
              
            />
          ), },
          { title: '操作', key: 'action',align:'center',  render: (text, record,index) =>{
              return (
              <Button data-id={index} onClick={this.edit.bind(this)}>编辑</Button>)
          }
        }]
      }
    
    onRef1 =(ref)=>{
      
      this[inow]=ref
      inow++
    }

    onRef2 = (ref) => {
      this[inow] = ref
      inow++     
    }
    edit(e){
      let index=e.target.dataset.id
      let data=this.state.data[index]
      log(this,index,data)
      
      this.setState({
        profitId:data.profitId,
        index
      })
      
      this[2*index].edit()
      
    }
    
    onCellChange (){
        let that=this
        log(this.state.index)
        log(this[2*this.state.index],this[2*this.state.index+1])
        if(this[2*this.state.index].state.value!==this[2*this.state.index].props.vlaue){
          this[2*this.state.index+1].setState({
              value:100-this[2*this.state.index].state.value,
              editable:false
            },()=>{
              
              axios.post(window.config.host+'/admin/profit/update',Qs.stringify({
                profitId:that.state.profitId,
                partnerProfit:that[2*that.state.index].state.value,
                networkProfit:that[2*that.state.index+1].state.value
              })).then(function (res) {
                log(res.data.data)
              })
            })
        }
        
        
        
      }
    componentWillMount(){
     let that=this
      axios.get(window.config.host+'/admin/profit/list').then(function (res) {
            log(res.data.data)
            that.setState({
              data:res.data.data
            })
      })
    }
    
    renZheng(e){
      log(e)
    }
    
    render(){
        return (<div className="express">
          <div className="DetailList">分润设置</div>
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
              
              <Select defaultValue="区域" style={{ width: 120 }} onSelect={this.renZheng.bind(this)}>
                    <Option value="timemore">顺丰</Option>
                    <Option value="time">韵达</Option>
              </Select>
              
              <Search placeholder="自定义搜索"  onSearch={value => console.log(value)}  style={{ width: 200 }} />
          </div> */}
          <Table  loading={false} columns={this.express} dataSource={this.state.data} />
         
        </div>)
    }
}
export default ShareProfitSet
