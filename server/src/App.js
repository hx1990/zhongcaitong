import React, { Component } from 'react';

import './App.css';
import Login from './Components/Login'
import Home from './Components/Home'


const log=console.log.bind(console)



class App extends Component {
  constructor(){
    super()
    this.state={
      bshow:true
    }
  }
  fnCallback(e){
    log('返回e',e)
    this.setState({
      bshow:e.bshow,
      load:e.load,
    })
    sessionStorage.setItem('key',JSON.stringify(e));
  }
  
  render() {
    if(sessionStorage.getItem('key')){
      let data1 = JSON.parse(sessionStorage.getItem('key'));
      if(data1.load){
        return(
          <div>  
           <Home />
        </div>)
      }
    }
    
    if(this.state.bshow){
       return (<div>
          <Login msg={this.fnCallback.bind(this)} />
       </div>)
    }else{
       return(
           <div>  
            <Home />
          </div>
    )
    }
  }
}

export default App;
