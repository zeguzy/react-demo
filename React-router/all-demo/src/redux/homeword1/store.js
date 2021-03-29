import {createStore} from 'redux'
import {staffReducer} from './redxer'

const store = createStore(staffReducer)

store.subscribe(()=>{console.log(store.getState());})


export {store}