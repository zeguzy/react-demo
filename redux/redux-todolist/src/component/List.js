import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {modifyOne,switchState,rmOne} from '../redux/action'
import Item from './item.js'
import './table.css'

function mapDoingToProps(state){
    return{
        doing:state.doing
    }
}
function mapDoneToProps(state){
    return{
        doing:state.done
    }
}

function mapDispacthToProps(dispatch){
    return bindActionCreators({modifyOne,switchState,rmOne},dispatch)
}

class List extends Component {
    state = {  }
    render() { 
        console.log('doing');
        console.log(this.props.doing);
        return ( <table>
            <thead>
                <tr>
                    <td>状态</td>
                    <td>内容</td>
                    <td>操作</td>
                </tr>
            </thead>
            <tbody>
                {this.props.doing.map(data=>{
                    return <Item data={data} key={data.id} save={this.props.modifyOne} switch={this.props.switchState} rm={this.props.rmOne}></Item>
                })}
            </tbody>
                
        </table> );
    }
}

const DoingList = connect(mapDoingToProps,mapDispacthToProps)(List)
const DoneList = connect(mapDoneToProps,mapDispacthToProps)(List)
 
export {DoingList,DoneList};