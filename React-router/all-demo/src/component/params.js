import React, { Component } from 'react';

function  Params(props){
    return <p>
        params is {props.match.params}
    </p>
}


export default Params