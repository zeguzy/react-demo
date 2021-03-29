import {} from "redux";

const originData = [];
// for (let i = 0; i < 5; i++) {
//   originData.push({
//     key: i.toString(),
//     name: `Edrward ${i}`,
//     id: 32,
//     department: `London Park no. ${i}`,
//   });
// }
const initaltion = {
  originData,
  showList: [...originData],
};

const generateShowList=(source,target)=>{
  console.log('target');
  console.log(target);
    if(target === '')
        return source
    const rex = new RegExp(`.*${target}.*`)
    if(source instanceof Array){
        return source.filter(e=>{
            if(rex.test(e.name))
                return true
            return false
        })
    }
}

const staffReducer = (state = initaltion, action) => {
  switch (action.type) {
    case "ADD_STARFF": {
      return {
        originData: [...state.originData, action.payload],
        showList: [...state.originData, action.payload],
      };
    }
    case "MODIFY_STAFF": {
      let originData =[...state.originData] ;
      for (let i = 0; i < originData.length; i++) {
        if (originData[i].key === action.payload.key) {
          originData.splice(i, 1, action.payload);
          break;
        }
      }
      return {
        originData: originData,
        showList: originData,
      };
    }
    case "DELETE_STAFF": {
      let originData =[...state.originData] ;
      for (let i = 0; i < originData.length; i++) {
        if (originData[i].key === action.payload) {
          originData.splice(i, 1);
          break;
        }
      }
      return {
        originData:originData,
        showList: originData,
      };
    }
    case "SEARCH":{
      let originData =[...state.originData] ;
        return {
            originData: [...state.originData],
            showList:generateShowList(originData,action.payload.search),
        }
    }
    default: {
      return state;
    }
  }
};

const addStaff = function (data) {
  return {
    type: "ADD_STARFF",
    payload: data,
  };
};

const modifyStaff = function (data) {
  return {
    type: "MODIFY_STAFF",
    payload: data,
  };
};

const search = function (search) {
    return {
      type: "SEARCH",
      payload: {search},
    };
};

const deleteStaff = function (key) {
  return {
    type: "DELETE_STAFF",
    payload: key,
  };
};

export { addStaff, staffReducer, modifyStaff, deleteStaff,search };
