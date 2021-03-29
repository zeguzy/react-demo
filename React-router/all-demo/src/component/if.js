/**
 * 一个if条件渲染和列表渲染的demo
 */
 import {Component} from 'react'
 import './if.css'

 function StudentItem(props){
     return <tr>
             <td>{props.index}</td>
             <td> {props.userName}</td>
             <td> {props.grade}   </td>
     </tr>
 }
 
class StudentList extends Component{
     constructor(props){
         super(props)
         this.studentList =[
                 {userName:'张三',grade:46},
                 {userName:'里斯',grade:12},
                 {userName:'王五',grade:47},
                 {userName:'赵六',grade:42},
                 {userName:'陈七',grade:67},
                 {userName:'邓八',grade:99},
                 {userName:'苏九',grade:67},
                 {userName:'卢十',grade:12},
                 {userName:'钱十一',grade:23},
                 {userName:'曾十二',grade:45},
             ] 
         this.state =  {
             showList:this.studentList,
             all:true,
             pass:false,
             notPass:false
         }
 
         this.showAll = this.showAll.bind(this)
     }
 
     showAll(){
         this.setState({showList:this.studentList})
         this.setState({all:true,notPass:false,pass:false})
     }
     showPass(){
         let showList = this.studentList.filter(e=>{
             if(e.grade >45){
                 return true
             }
         })
         this.setState({showList,all:false,pass:true,notPass:false})
         
     }
 
     showNotPass(){
         let showList = this.studentList.filter(e=>{
             if(e.grade <45){
                 return true
             }
         })
         this.setState({showList,all:false,pass:false,notPass:true})
     }
 
 
     render(){
         return (
         <div className='box'>
             <h1>
                 {this.state.all && '全部清单'}
                 {this.state.pass && '及格清单'}
                 {this.state.notPass && '不及格清单'}
                 
             </h1>
             <table>
                 <thead>
                     <td>编号</td>
                     <td>姓名</td>
                     <td>成绩</td>
                 </thead>
                 <tbody>
                     {this.state.showList.map((e,index)=>{
                     return <StudentItem  index={index} userName={e.userName} grade={e.grade} key={index}/>
                 })}
                 </tbody>
             </table>
 
     <div className='btn'>
          <button onClick={this.showAll}>显示全部</button>
         <button onClick={()=>this.showPass()}>显示及格</button>
         <button onClick={()=>this.showNotPass()}>显示不及格</button>
     </div>
        
         </div>)
     }
 
 }

 export {StudentList}
