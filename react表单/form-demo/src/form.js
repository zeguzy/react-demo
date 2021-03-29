/**
 * 表单demo
 */

import {Component} from 'react'


class Form extends Component{
    constructor(props){
        super(props)
        this.fruits = [{name:'香蕉',id:0},{name:'苹果',id:1},{name:'梨子',id:2},{name:"荔枝",id:3},{name:"芒果",id:4}]

        this.state= {
            value:'',
            text:"",
            fruitLike:0,
            file:null,
            max:'',
            min:'',
        }
        this.submithandler= this.submithandler.bind(this)
        this.changehandler = this.changehandler.bind(this)
        this.fileHandler = this.fileHandler.bind(this)
    }

    //处理提交事件
    submithandler(e){
        e.preventDefault()
        console.log('submit!!!');
        console.log(e);
        console.log('\n');

        setTimeout(()=>{
            console.log(this.state);  //setState 已经完成
        },5000)
    }

    // 文本输入框更新事件处理
    changehandler(e){
        console.log('change!!!');
        console.log(e.target.value);
        const value= e.target .value
        this.setState({value})
        console.log('\n');
    }

    // 处理文本域更新事件
    textareaChange(e){
        console.log('textArea change !!!');
        const  text = e.target.value
        this.setState({text})
    }

    // 处理select change
    selecthandler(e){
        console.log('select change!!!');
        const fruitLike = e.target.value
        console.log(fruitLike);
        this.setState({fruitLike})
    }

    // 处理文佳
    fileHandler(e){
        console.log('file change!!');
        const file = e.target.files[0]
        this.setState({file})
        console.log(file);
        console.log(this.state);   //这里state内部的file为null  因为setstate 可能会合并  可能是异步的

        setTimeout(()=>{
            console.log(this.state);  //setState 已经完成
        },5000)

    }

    // 处理多多个输入
    textHandler(e){
        const name = e.target.name
        const value = e.target.value

        this.setState({
            [name]:value
        })
    }

    render(){
        return <form onSubmit={this.submithandler}>
            <input type='text' onChange={this.changehandler} value={this.state.value}/>
            <textarea value={this.state.text} onChange={this.textareaChange.bind(this)}/>  //采用第二种方式事件绑定的调用
            <select value={this.state.fruitLike} onChange={(e)=>this.selecthandler(e)}>
                {
                    this.fruits.map(fruit => {
                        return <option value={fruit.id}>{fruit.name}</option>
                    })
                }
            </select>

            <input type='file'   onChange={this.fileHandler}/>

            {/* 处理 多个输入 */}
            <input type='text'  name="min" onChange={this.textHandler.bind(this)}/>
            <input type='text'  name="max" onChange={this.textHandler.bind(this)}/>


            <input type='submit' />
        </form>
    }
}

export default Form
