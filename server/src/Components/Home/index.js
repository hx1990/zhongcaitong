import React, { Component } from 'react';
import Head from '../Head'
// import Title from '../Title'
import Navlist from '../Navlist'
class Home extends Component{
    constructor(){
        super()
        this.state={}
    }
    render(){
        return(<div >
            <Head/>
            {/* <Title></Title> */}
            <Navlist></Navlist>
        </div>)
    }
}
export default Home