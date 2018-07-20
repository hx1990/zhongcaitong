import React, { Component } from 'react';
import {
     Router,
    Route,
    NavLink
  } from 'react-router-dom';
import createHistory from 'history/createHashHistory'

import "./index.css"

//引入icon图片
import userUrl from "../../images/user.png"
// import ExpressUrl from "../../images/express.png"
import ExpressDoorUrl from "../../images/company.png"
// import companyUrl from "../../images/company.png"
// import mailUrl from "../../images/mail.png"
// import agentUrl from "../../images/agent.png"
// // import accountUrl from "../../images/account.png"
// import authorityUrl from "../../images/authority.png"
// import SetingUrl from "../../images/set.png"

//引入组件



// import Authority from "../Authority"


import ExpressDoor from "../EXpressDoor"

import UserInfo from "../UserInfo"
import UserDetail from "../UserDetail"
import AddDoor from "../AddDoor"


import RunningWater from '../RunningWater'
import IncomeList from '../IncomeList'
import WithdrawalList from '../WithdrawalList'
import DivideInto from '../DivideInto'
import DistributionWithMoeny from '../DistributionWithMoeny'
import Owner from '../Owner'
import AddOwner from '../AddOwner'



//添加
import CourierList from '../CourierList'
import CourierAudit from '../CourierAudit'
import PartnerAudit from '../PartnerAudit'
import NetpointAudit from '../NetpointAudit'
import Partner from '../Partner'
import Netpoint from '../Netpoint'
import ProductLsit from '../ProductLsit'
import AddProduct from '../AddProduct'
import PartnerDetail from '../PartnerDetail'
import ShareProfitSet from '../ShareProfitSet'
import ShareProfitList from '../ShareProfitList'

import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

const history = createHistory()

class Navlist extends Component{
    constructor(){
        super()
        this.state={
        }
    }
    render(){
        return(<div className="nav">
            <Router history={history}> 
                <div className="routerWrap" > 
                    <ul className="linkList"> 
                        <li>
                            <NavLink activeClassName="activeRoute" to="/userInfo">
                              <img alt='img' src={userUrl}/>
                              <span>用户管理</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink activeClassName="activeRoute" to="/partner">
                               <img alt='img' src={ExpressDoorUrl}/>
                               <span >合伙人管理</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink activeClassName="activeRoute" to="/netpoint">
                               <img alt='img' src={ExpressDoorUrl}/>
                               <span >网点管理</span>
                            </NavLink>
                        </li>

                        <li>
                          <NavLink activeClassName="activeRoute" to="/courierList">
                              <img alt='img' src={userUrl}/>
                              <span>送票员管理</span>
                           </NavLink>  
                        </li>

                        

                        
                        <li>
                            <NavLink activeClassName="activeRoute" to="/shareProfitSet">
                               <img alt='img' src={ExpressDoorUrl}/>
                               <span >分润设置</span>
                            </NavLink>
                        </li>


                        <li>
                            <Menu onClick={this.handleClick} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" >
                                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>机柜管理</span></span>}>
                                    <NavLink activeClassName="activeRoute" to="/expressDoor">
                                       <Menu.Item key="5" className="subtitle">机柜列表</Menu.Item>
                                    </NavLink>
                                     <NavLink activeClassName="activeRoute" to="/addDoor">
                                       <Menu.Item key="6" className="subtitle">添加机柜</Menu.Item>
                                    </NavLink> 
                                </SubMenu>
                            </Menu>  
                        </li>

                        <li>
                            <Menu onClick={this.handleClick} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" >
                                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>审核认证</span></span>}>
                                    
                                    <NavLink activeClassName="activeRoute" to="/partnerAudit">
                                        <Menu.Item key="7" className="subtitle">合伙人审核</Menu.Item>
                                    </NavLink>
                                    <NavLink activeClassName="activeRoute" to="/netpointAudit">
                                        <Menu.Item key="8" className="subtitle">网点审核</Menu.Item>
                                    </NavLink>
                                    <NavLink activeClassName="activeRoute" to="/courierAudit">
                                       <Menu.Item key="5" className="subtitle">送票员审核</Menu.Item>
                                    </NavLink>
                                </SubMenu>
                            </Menu>
                        </li>
                       
                        <li>
                           <Menu onClick={this.handleClick} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" >
                                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>彩种管理</span></span>}>
                                    <NavLink activeClassName="activeRoute" to="/productList">
                                       <Menu.Item key="5" className="subtitle">彩种列表</Menu.Item>
                                    </NavLink>
                                    <NavLink activeClassName="activeRoute" to="/addProduct">
                                        <Menu.Item key="7" className="subtitle">添加彩种</Menu.Item>
                                    </NavLink>
                                    
                                </SubMenu>
                            </Menu>
                        </li>

                        <li>
                            <Menu onClick={this.handleClick} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" >
                                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>财务管理</span></span>}>
                                    <NavLink activeClassName="activeRoute" to="/runningWater">
                                    <Menu.Item key="5" className="subtitle">流水表</Menu.Item>
                                    </NavLink>
                                    
                                    <NavLink activeClassName="activeRoute" to="/shareProfitList">
                                    <Menu.Item key="6" className="subtitle">分润列表</Menu.Item>
                                    </NavLink>
                                       
                                </SubMenu>
                            </Menu>
                        </li> 
                        
                    </ul> 
                    <Route path="/" exact component={UserInfo}/>
                    <Route path="/userInfo" component={UserInfo}/> 
                    <Route path="/expressDoor" component={ExpressDoor}/>
                    <Route path="/userDetail" component={UserDetail}/>
                    <Route path="/addDoor" component={AddDoor}/>
                    <Route path="/partner" component={Partner}/>
                    {/* <Route path="/expressCost" component={ExpressCost}/> */}
                    <Route path="/runningWater" component={RunningWater}/>
                    <Route path="/incomeList" component={IncomeList}/>
                    <Route path="/withdrawalList" component={WithdrawalList}/>
                    <Route path="/distributionWithMoeny" component={DistributionWithMoeny}/>
                    <Route path="/divideInto" component={DivideInto}/>
                    <Route path="/owner" component={Owner}/>
                    <Route path="/addOwner" component={AddOwner}/>
                    <Route path="/courierList" component={CourierList}/>
                    <Route path="/courierAudit" component={CourierAudit}/>
                    <Route path="/partnerAudit" component={PartnerAudit}/>
                    <Route path="/netpointAudit" component={NetpointAudit}/>
                    <Route path="/netpoint" component={Netpoint}/>
                    <Route path="/productList" component={ProductLsit}/>
                    <Route path="/addProduct" component={AddProduct}/>
                    <Route path="/partnerDetail" component={PartnerDetail}/>
                    <Route path="/shareProfitSet" component={ShareProfitSet}/>
                    <Route path="/shareProfitList" component={ShareProfitList}/>
                </div>
            </Router>
        </div>)
    }
}

export default Navlist