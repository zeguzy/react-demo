import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import './opt.css'

import {newOne} from '../redux/action'


function mapStateToProps(state){
    return {
        doing:state.doing
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({newOne},dispatch)
}

class Operate extends Component {
    
    constructor(props){
        super(props)
        this.state = { text:"" }
        this.submitHandler = this.submitHandler.bind(this)
        this.handInputChange = this.handInputChange.bind(this)
    }

    
    handInputChange(e){
        const name = e.target.name
        const text = e.target.value
        
        this.setState({
            [name]:text
        })
    }

    // 提交
    submitHandler(e){
        e.preventDefault()
        const data = this.state
        const date = Date.now()
        const state = false    //0 正在进行 1 已完成
        data.date = date
        data.state = state
        console.log(data);


        // console.log('save');
        // console.log(this.props.newOne);
        this.props.newOne(data)
    }
    render() { 
        return ( 
                <form onSubmit={this.submitHandler}>
                    <input type='text' name="text" value={this.state.text} onChange={this.handInputChange} />
                    <input type='submit' value="新建" />
                </form>
         );
    }


}

 
export default connect(mapStateToProps,mapDispatchToProps)(Operate);
// export default Operate 