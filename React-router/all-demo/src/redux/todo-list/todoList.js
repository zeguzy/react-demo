
function getDoing(all){
    if(all){
        return all.filter(e=>{
            if(!e.state){
                return true
            }
            return false
        })
    }
    return []
}


function getDone(all){
    if(all){
        return all.filter(e=>{
            if(e.state){
                return true
            }
            return false
        })
    }
    return []
}

function saveData(all){
    const dataStr = JSON.stringify(all)
    localStorage.setItem('todos',dataStr)
}

const initaltion = {doing:[],done:[],all:[]}


// 存储
const localData = localStorage.getItem('todos')
if (localData){
    const all = JSON.parse(localData)
    initaltion.all = all
    initaltion.doing = getDoing(all)
    initaltion.done = getDone(all)
}


const todoListReducer = (state=initaltion,action)=>{
    switch(action.type){
        case "NEW_ONE":{
            const data = action.payload
            const id = state.all.length+1
            data.id = id
            const all = [
                ...state.all,
                data
            ]
            //持久化 。。。
            saveData(all)
            return {
                doing:[
                    ...state.doing,
                    data
                ],
                done:state.done,
                all
            }
        }
        case "MODIFY_ONE":{
            const all = state.all
            console.log('modify');
            console.log(action);
            for(let i=0;i<all.length;i++){
                if(all[i].id == action.payload.id){
                    all[i].text =action.payload.text
                    break
                }
            }

            //持久化 。。。
            saveData(all)
            return {
                all:[...all],
                done:getDone(all),
                doing:getDoing(all)
            }
        }
        case "SWITCH_STATE":{
            const all = state.all
            console.log('SWITCH_STATE');
            for(let i=0;i<all.length;i++){
                if(all[i].id == action.payload.id){
                    all[i].state =!all[i].state
                    break
                }
            }

            //持久化 。。。
            saveData(all)
            return {
                all:[...all],
                done:getDone(all),
                doing:getDoing(all)
            }
        }
        case 'RM_ONE':{
            const all = state.all
            console.log('RM_ONE');
            for(let i=0;i<all.length;i++){
                if(all[i].id == action.payload.id){
                    all.splice(i,1)
                    break
                }
            }

            //持久化 。。。
            saveData(all)
            return {
                all:[...all],
                done:getDone(all),
                doing:getDoing(all)
            }
        }
        default:{
            return state
        }
    }
}


function newOne(data){
    return {
        type:'NEW_ONE',
        payload:data
    }
}
function modifyOne(data){
    return {
        type:'MODIFY_ONE',
        payload:data
    }
}
function switchState(data){
    return {
        type:'SWITCH_STATE',
        payload:data
    }
}
function rmOne(data){
    return {
        type:'RM_ONE',
        payload:data
    }
}


export {todoListReducer,newOne,modifyOne,switchState,rmOne}

