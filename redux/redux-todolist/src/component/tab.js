import React, { Component } from 'react';
import './tab.css'
class Tab extends Component {
    constructor(props){
        super(props)
        console.log(props.children);
        const lables = this.getLable(props.children)
        const now = this.getContent(props.children,props.default)
        this.state = {
            lables,
            default:props.default ?props.default:lables[0],
            now,
        }
        this.toggleLable = this.toggleLable.bind(this)
    }

    // 获取标签名
    getLable(childrens){
        if(childrens instanceof Array){
            return childrens.map(e=>{
                // console.log(e);
                return e.props.lable
            })
        }

        if(childrens && childrens.props){
            let lable = childrens.props.lable
            return [lable]
        }
        return []
    }

    // 获取 显示的内容
    getContent(source,target){
        console.log(target);
        if(source instanceof Array){
            if(!target){
                return source[0]
            }
            for(let i=0;i<source.length;i++){
                // console.log(source[i].props.lable);
                if(source[i].props.lable === target)
                    return source[i]
            }
            console.log('default值找不到');
            return source[0]
        }
        
        return source
    }

    // 切换标签
    toggleLable(l){
        // console.log(l);
        const now = this.getContent(this.props.children,l)
        this.setState({now})
    }


    render() { 
        return (<div className='tab'>
            <div className="lable">
                {this.state.lables.map(l=>{
                    return <span className={this.state.now.props.lable==l?"slected":""} key={l} onClick={()=>this.toggleLable(l)}>
                        {l}
                    </span>
                })}
            </div>
            {
                this.state.now
            }

            <div className='opt'>
                {this.props.operate}
            </div>
        </div>  );
    }
}
 
export default Tab;