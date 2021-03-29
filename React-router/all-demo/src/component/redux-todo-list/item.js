import React, { Component } from 'react';
import "./item.css"
class Item extends Component {
    constructor(props){
        super(props)
        const {state,text,id}= props.data
        this.state = { edit:false,state,text,id }
        this.handInputChange = this.handInputChange.bind(this)
        this.kaigaunChange = this.kaigaunChange.bind(this)
        this.editHandler = this.editHandler.bind(this)
        this.saveHandler = this.saveHandler.bind(this)
        this.rmHandler = this.rmHandler.bind(this)
    }

    handInputChange(e){
        const name = e.target.name
        const value = e.target.value
 
        this.setState({
            [name]:value
        })
    }
    kaigaunChange(){
        this.setState({
            state:!this.state.state
        })

        this.props.switch(this.state)
    }

    editHandler(){
        this.setState({
            edit:true
        })
    }
    saveHandler(){
        this.setState({
            edit:false
        })

        console.log('save');
        console.log(this.props.save);
        this.props.save(this.state)
        
    }
    rmHandler(){
        this.setState({
            edit:false
        })
        this.props.rm(this.state)
    }
    
    render() { 
        return (<tr>
            <td>
                <span className={this.state.state?"kai":"guan"}  onClick={this.kaigaunChange} ></span>
            </td>
            <td>
                
                {!this.state.edit && <span className='text'>{this.state.text} </span>}
                {this.state.edit && <input  name="text" type="text" value={this.state.text} onChange={this.handInputChange}/>}
            </td>
            <td>
                {!this.state.edit && <button onClick={this.editHandler}>修改</button>}
                { this.state.edit && <button onClick={this.saveHandler}>保存</button>}
                { this.state.edit && <button onClick={this.rmHandler}>删除</button>}
            </td>
        </tr>);
    }
}
 
export default Item;