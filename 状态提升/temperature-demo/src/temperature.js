import {Component} from 'react'


function TemperatureInput(props){
    let lable = ""
    if(props.type==='f'){
        lable = '华氏度'
    }else{
        lable = '摄氏度'
    }
    return <div>
        <span>{lable}</span>
        {/* <span>{props.num}</span> */}
        <input value={props.num}  type='number'  onChange={props.inputChange} />
    </div>
}


function Result(props){
    if(props.celsius >100){
        return <p className='result'>水开了</p>
    }
    return <p className='result'>水没开</p>
}

class Temperature extends  Component{
    constructor(props){
        super(props)
        this.state ={
            celsius:0
        }

        this.cChange = this.cChange.bind(this)
        this.fChange = this.fChange.bind(this)
    }

    toCelsius(fahrenheit) {
        return (fahrenheit - 32) * 5 / 9;
      }
      
    toFahrenheit(celsius) {
        return (celsius * 9 / 5) + 32;
      }
    cChange(e){
        console.log('c change');
        const  celsius = e.target.value
        this.setState({celsius})
    }

    fChange(e){
        console.log('f change');
        const  celsius = this.toCelsius(e.target.value) 
        this.setState({celsius})
    }

    render(){
        return <div className='box'>
            <Result celsius={this.state.celsius} />
            <TemperatureInput type='c' inputChange={this.cChange} num={this.state.celsius}/>
            <TemperatureInput type='f' inputChange={this.fChange} num={this.toFahrenheit(this.state.celsius)}/>
        </div>
    }
}

export default Temperature