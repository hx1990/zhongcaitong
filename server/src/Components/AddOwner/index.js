import React from 'react'
import {Upload, Button, Icon ,Radio,DatePicker, Select, Input, Cascader} from 'antd'

import './index.css'
const RadioGroup = Radio.Group;
const {RangePicker}=DatePicker
const Option = Select.Option

class AddOwner extends React.Component{
    constructor(){
        super()
        this.state={
          options:[
             {
             value: '浙江',
             label: '浙江',
                 children: [{
                 value: '杭州',
                 label: '杭州',
                     children: [{
                     value: '西湖',
                     label: '西湖',
                     }],
               }],
             }, 
             { value: '江苏',
             label: '江苏',
                 children: [{
                 value: '南京',
                 label: '南京',
                     children: [{
                     value: '中华门',
                     label: '中华门',
                     }],
                 }],
          }],
         provinceOptions:['浙江','江苏'],
         cityOptions:['杭州','温州'],
         props:{
             name: 'file',
             action: '//jsonplaceholder.typicode.com/posts/',
             headers: {
                 authorization: 'authorization-text',
             },
        },
      }
    }
    componentDidMount () {
         var BMap = window.BMap
         var map = new BMap.Map("map"); // 创建Map实例
         map.centerAndZoom(new BMap.Point(120.10, 30.16), 16); // 初始化地图,设置中心点坐标和地图级别
         map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
         map.setCurrentCity("杭州"); // 设置地图显示的城市 此项是必须设置的
         map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
         var index = 0;
     var myGeo = new BMap.Geocoder();
     var adds = [
         "西湖区文一西路嘉南公寓"
     ];
     bdGEO()
     function bdGEO(){
         var add = adds[index];
         geocodeSearch(add);
         index++;
     }
     function geocodeSearch(add){
         if(index < adds.length){
             setTimeout(window.bdGEO,400);
         } 
         myGeo.getPoint(add, function(point){
             if (point) {
                 map.centerAndZoom(point, 16);
                 map.addOverlay(new BMap.Marker(point));
                 // document.getElementById("result").innerHTML +=  index + "、" + add + ":" + point.lng + "," + point.lat + "</br>";
                 // var address = new BMap.Point(point.lng, point.lat);
                 // addMarker(address,new BMap.Label(index+":"+add,{offset:new BMap.Size(20,-10)}));
             }
         }, "杭州");
     }
    }
    render(){
        return (
            <div className="content">
            <h3>添加机柜</h3>
           <div className="address">
             <h4 className="toptitle">租用场地</h4>
             <div className="addresswarp">
                {/*左边租用场地*/}
                <div className="wrapleft">
                    <div className="addaddress">
                        <span className="addtitle">添加地址：</span>
                        <Cascader defaultValue={['浙江', '杭州', '西湖']} options={this.state.options} onChange={this.onChange} />
                        
                      <Input className="detailaddress" placeholder="详细地址" />
                    </div>
                    <div className="item">
                        <div className="subitem">添加业主：<Input className="inputwidth" placeholder="输入业主姓名" /></div>

                        <div className="subitem">
                            业主证明：
                            <Upload {...this.state.props}>
                             <Button> <Icon type="upload" />点击上传照片</Button>
                            </Upload>
                        </div>
                        <div className="subitem">业主权限： <RangePicker size="small" className="rangpicker"/></div>
                    </div>
                    <div className="item">
                        <div className="subitem">联系人：<Input className="inputwidth" placeholder="输入联系人姓名" /></div>
                        <div className="subitem">手机：<Input className="inputwidth" placeholder="输入手机号" /></div>
                        <div className="subitem">电话： <Input className="inputwidth" placeholder="输入固定电话" /></div>
                    </div>
                    <div className="item">
                        <div className="subitem">租金：<Input className="width140"/> 元/年</div>
                        <div className="subitem">租期启止：<RangePicker size="small" className="rangpicker" /></div>
                        <div className="subitem">剩余日期：<Input className="width140"/>月</div>
                    </div>
                    <div className="item">
                        <div className="subitem">押金：<Input className="width140"/>元</div>
                        <div style={{'width':'50%'}} className="subitem">协议：
                            <Upload {...this.state.props}>
                             <Button> <Icon type="upload" />上传证件照</Button>
                             <Button> <Icon type="download" />下载协议</Button>
                            </Upload>
                        </div>
                        <div className="subitem">是否续签：<Select defaultValue="是否续签" style={{ width: 100 }} >
                                        <Option value="jack">是</Option>
                                        <Option value="lucy">否</Option>
                                 </Select></div>
                    </div>
                    <div className="item">
                        <div className="subitem">付款方式：<Select defaultValue="自动结算" style={{ width: 100 }} >
                                        <Option value="jack">自动结算</Option>
                                        <Option value="lucy">到期支付</Option>
                                    </Select></div>
                        <div className="subitem">计算方式：<Select defaultValue="月底付" style={{ width: 100 }} >
                                        <Option value="jack">月底付</Option>
                                        <Option value="jack">月初付</Option>
                                        <Option value="jack">季初付</Option>
                                        <Option value="jack">季底付</Option>
                                        <Option value="lucy">年付</Option>
                                    </Select></div>
                                    {/*<RadioGroup onChange={this.onChange} value={this.state.value}>
                                    <Radio value={1}>月底付</Radio>
                                    <Radio value={2}>月初付</Radio>
                                    <Radio value={3}>季初付</Radio>
                                    <Radio value={4}>季底付</Radio>
                                    <Radio value={4}>年付</Radio>
                                    </RadioGroup></div>*/}
                        <div className="subitem">是否自动续签：<RadioGroup onChange={this.onChange} value={this.state.value}>
                                    <Radio value={1}>是</Radio>
                                    <Radio value={2}>否</Radio>
                                    </RadioGroup></div>
                    </div>
                    
                </div>
                {/*右边地图*/}
                <div id='map' className="map" style={{ width:'30%',height:'350px' }}></div>
             </div>
           </div>
           <Button size="samll" type="primary" >保存</Button>
      </div>
        )
            
    }
}
export default AddOwner