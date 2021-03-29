// store

import {createStore} from 'redux'
import {todoListReducer} from './reducer'


const store = createStore(todoListReducer)
store.subscribe(()=>{console.log(store.getState());})

export {store}