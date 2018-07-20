import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios'
import Qs from 'qs'
import './index.css'
const FormItem = Form.Item;
const log=console.log.bind(console)
const host =window.config.host
class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    let that=this
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        log('用户信息',values)
        axios.post(host+'/admin/user/login', Qs.stringify({
          phone:values.userName,
          password:values.password
        }),{
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded', 
        },
      }).then(res=>{
        if(res.data.code===200){
          let loginInfo={
              load:true,
              bshow:false,
              name:res.data.data.name
          }
          log(res.data.data)
          that.props.msg(loginInfo)
          
        }else{
          alert(res.data.message)
        }
        
      })
        
        
      }
    });
  }
  constructor(){
    super()
    this.state={
    
    }
    
  }
  // componentDidMount(){
  //   // ('aaaa')
  //   console.log()
  // }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="logi">
      <Form onSubmit={this.handleSubmit} className="login-form" >
        <h3>中彩通管理后台</h3>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入用户密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住密码</Checkbox>
          )}
          <a className="login-form-forgot" href="">忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
         
        </FormItem>
      </Form>
      </div>
    );
  }
}

const Login = Form.create()(NormalLoginForm);



export default Login

