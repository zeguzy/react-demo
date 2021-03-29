import React, { Component } from 'react';
import Tab from './tab.js'
import TabItem from './tabItem'
import Operate from './oprate'
import {DoneList,DoingList} from './List'
import "./todo.css"


class ToDoList extends Component {
    state = {  }
    render() { 
        return ( <div>
            <p className='title'>ToDoList</p>
            <Tab default='DOING' operate={<Operate/>}>
                <TabItem lable='进行中...'>
                    <DoingList/>
                </TabItem>
                <TabItem lable='已完成...'>
                    <div>
                        <DoneList/>
                    </div>
                </TabItem>
            </Tab>
        </div> );
    }
}
 
export default ToDoList;