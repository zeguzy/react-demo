import React, { Component } from 'react';
import './todo-list.css'

const levels = [
    {id:0,comment:'急迫'},
    {id:1,comment:'一般'},
    {id:2,comment:'悠闲'}
]

class TodoListItem extends Component {
    constructor(props){
        super(props)
        this.props = props
        this.state = {
            edit:this.props.text?false:true,
            id:props.id,
            level:props.level,
            text:props.text
        }
        this.changehandler= this.changehandler.bind(this)
        this.edit= this.edit.bind(this)
        this.rm = this.rm.bind(this)
    }
    changehandler(e){
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]:value
        })
    }

    save(){
        console.log(this.state);
        // 进行规则检验
        const {id,level,text} = this.state

        // 调用父组件的保存
        this.props.onSave( {id,level,text})
        this.setState({edit:false})

    }

    edit(){
        console.log('修改');
        this.setState({edit:true})
    }

    rm(){
        console.log('删除');
        this.props.onRm(this.state.id)
    }
    // shouldComponentUpdate(old,next){
    //     console.log(old);
    //     console.log(next);
    //     if(old.text === next.text)
    //         return false
    //     return true
    // }

    render() { 

        if (this.state.edit)
            return (<tr className='todo-item'>
                <td>{this.state.id}</td>
                <td>
                    <select value={this.state.level} onChange={this.changehandler} name="level">
                       { levels.map(level=>{
                           return <option value={level.id} key={level.id}>{level.comment}</option>
                       })}
                    </select>
                </td>
                <td><input type='text' name='text' value={this.state.text} onChange={this.changehandler}></input></td>
                <td>
                    <button onClick={this.save.bind(this)}>保存</button>
                    <button onClick={this.rm}>删除</button>
                </td>
            </tr>)
        return (<tr className='todo-item'>
            <td>{this.state.id}</td>
            <td>{levels[this.state.level].comment  }</td>
            <td>{this.state.text}</td>
            <td>
                <button onClick={this.edit}>修改</button>
                <button onClick={this.rm}>删除</button>
            </td>
        </tr>);
    }
}


class TodoList extends Component {

    // {id,level,text}
    

    constructor(props){
        super(props)
        const data = JSON.parse(localStorage.getItem('todoList'))  || []
        console.log(data);
        this.state = { todoList:[...data] ,data,addEnable:true,searchInput:""}
        this.find = this.find.bind(this)
    }

    addOne(e){
        console.log('add one ');
        const todoList  = this.state.todoList
        todoList.push({id:this.state.data.length+1,level:1,text:''})
        this.setState({todoList,addEnable:false})

    }
    changeHandler(e){
        const name = e.target.name
        const value = e.target.value

        this.setState({
            [name]:value
        })
    }


    find(){
        let todoList = [...this.state.data]
        let searchInput = this.state.searchInput
        let myRe = new RegExp('.*'+searchInput+'.*')
        
        todoList = todoList.filter(i=>{
            const testResult = myRe.test(i.text)
            if(testResult)
                return true
        })
        this.setState({todoList})
    }

    onSave(e){
        console.log(e);
        const data = this.state.data
        data.push(e)
        this.setState({data,addEnable:true})


        const datastr= JSON.stringify(this.state.data)
        localStorage.setItem('todoList', datastr);
    }
    onRm(id){
        console.log(id);
        // 删除todolist
        const todoList = this.state.todoList
        for(let i =0;i<todoList.length;i++){
            if(todoList[i].id == id){
                todoList.splice(i,1)
                break
            }
        }
        this.setState([todoList])
        const data = this.state.data
        for(let i =0;i<data.length;i++){
            if(data[i].id == id){
                data.splice(i,1)
                break
            }
        }
        this.setState({data})
        // 删除data
        const datastr= JSON.stringify(this.state.data)
        localStorage.setItem('todoList', datastr);
    }
    render() { 
        return ( <div className='todo-list'>

                    
                    <h1>zegu 的 todoList</h1>
                    <div className='opts'>
                        <button onClick={this.addOne.bind(this)} disabled={!this.state.addEnable} >添加</button>
                        <div className='search'>
                            <input type='text' name='searchInput' value={this.state.searchInput} onChange={this.changeHandler.bind(this)}/>
                            <button onClick={this.find}>查找</button>
                        </div>
                    </div>
                    <table className='list'>
                        <thead>
                            <td>编号</td>
                            <td>级别</td>
                            <td>内容</td>
                            <td>操作</td>
                        </thead>
                        {this.state.todoList.map(item=>{
                            return <TodoListItem id={item.id} level={item.level} text={item.text} key={item.id} onSave={this.onSave.bind(this)} onRm={this.onRm.bind(this)}></TodoListItem>
                        })}
                    </table>
        </div> );
    }
}
 
export default TodoList;