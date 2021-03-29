import React, { Component } from 'react';
import {createStore ,bindActionCreators} from 'redux'
import {connect} from 'react-redux'

const initialState = {count:0}


const counter = (state=initialState,action)=>{
    switch (action.type){
        case "PLUSONE":{
            return {count:state.count+1}
        }
        case "MINUSONE":{
            return {count:state.count-1}
        }
    }
    return state
}

function plusOne(){
    return {
        type:'PLUSONE'
    }
}
function minusOne(){
    return {
        type:'MINUSONE'
    }
}

const store = createStore(counter)


function mapStatetoProps(state){
    return{
        count:state.count
    }
}

function mapDispacthToProps(dispatch){
    // console.log(bindActionCreators({plusOne,minusOne},dispatch));
    // console.log(store.dispatch(plusOne()));
    return  bindActionCreators({plusOne,minusOne},dispatch)
}



class Counter extends Component {
    state = {  }
    render() { 
        const {count,plusOne,minusOne} = this.props
        return ( <div>
            <button onClick={plusOne}>+</button>
            <span>{count}</span>
            <button onClick={minusOne}>-</button>
        </div>);
    }
}


Counter = connect(mapStatetoProps,mapDispacthToProps)(Counter)

 
export {Counter,store} 