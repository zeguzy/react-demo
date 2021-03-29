import React, { Component } from 'react';

class RefTest extends Component {
    state = { }
    render() { 
        return ( <div>
            <input ref={input=>this.state.input=input}  onChange={(e)=>this.inputHandler(e)}/>
        </div> );
    }
    inputHandler(e){
        console.log('input change');
        console.log( this.state.input);
    }

}
 
export default RefTest;