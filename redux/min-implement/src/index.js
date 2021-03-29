import {createStore,bindActionCreators,combineReducers} from 'redux'

window.run =function   (){
    // store
    const initalState = {count:0}

    // reducer
    const counter = (state=initalState,action)=>{
        switch(action.type){
            case "PLUS_ONE":{
                return{count:state.count+1}
            }
            case "COSTOM_COUNT":{
                return {count:state.count+action.payload.count}
            }
            default:
                break
        }

        return state
    }

    // 第二个reducer
    const todos = (state={})=>state

    // create store
    const store = createStore(combineReducers({
        todos,counter
    }))


    function plusOne(){
        return {
            type:'PLUS_ONE',
            
        }
    }

    function costomCount(count){
        return{
            type:"COSTOM_COUNT",
            payload:{count}
        }
    }

    plusOne =  bindActionCreators(plusOne,store.dispatch)
    costomCount= bindActionCreators(costomCount,store.dispatch)

    store.subscribe(()=>{console.log(store.getState());})
    // store.dispatch(plusOne())
    // store.dispatch(costomCount(5))
    plusOne()
    costomCount(3)
}


// document.getElementById('btr').addEventListener('click',run)