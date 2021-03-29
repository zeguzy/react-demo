/**
 * 这是一个关于state 和 生命周期的小demo
 */

 import {Component} from 'react'

 class Clock extends Component {
     constructor(props){
         super(props)
         this.state = { date :new Date()}
     }
 
     componentDidMount(){
         console.log('componentDidMount');
         this.timer = setInterval(()=>{
             // this.state.date = new Date()
             // this.state = {data:new Date()}
             // 必须使用setState方法修改state的值
             this.setState({
                 date:new Date()
             })
         },1000)
     }
     
     componentWillUnmount(){
         clearInterval(this.timer)
     }
 
     render(){
         return <div>
             hello word !,
             现在是   {this.state.date.toLocaleTimeString()}
         </div>
     }
 }
 
 
 export default Clock