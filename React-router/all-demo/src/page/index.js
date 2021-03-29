import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Link,
  NavLink,
  Route,
} from "react-router-dom";
import {Provider} from 'react-redux'
import { StudentList } from "../component/if";
import Temperature from '../component/状态提升'
import Form from '../component/表单'
import './page.css'
import {Counter,store} from '../component/react-redux'
import ReduxToDo from '../component/redux-todo-list/ToDoList'
import {store as store2} from '../redux/todo-list/store'
import {store as store3} from '../redux/homeword1/store'
import RefTest from '../component/ref'
import Clock from '../component/生命周期demo'
import TodoList from '../component/todo-list/todoList'
import FirstAntd  from '../component/antd.design/first-demo'
import StaffPage from '../component/homeword1/staffPage'
// import Params from '../component/params'

class Params extends Component {
    state = {  }
    render() { 
        console.log(this.props)
        return <p>params is {this.props.match.params.id }</p>;
    }
}

class Params2 extends Component {
    state = {  }
    render() { 
        console.log(this.props)
        return <Router>
            <p>父</p>
            <NavLink to='/嵌套路由/test'>嵌套路由/test</NavLink>
            <Route path="/嵌套路由/test" component={Params3}></Route>
        </Router>
    }
}

class Params3 extends Component {
    state = {  }
    render() { 
        console.log(this.props)
        return <Router>
            <p>子</p>
            <NavLink to='/嵌套路由/test/hhh'>hhh</NavLink>
            <Route path="/嵌套路由/test/hhh" component={Params}></Route>
        </Router>
    }
}


class DemoList extends Component {
  state = {};
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="page">
            <div className="nav">
              <NavLink activeClassName='selected' to="/if">if 条件渲染</NavLink>
              <NavLink activeClassName='selected' to="/状态提升">状态提升</NavLink>
              <NavLink activeClassName='selected' to="/表单">表单</NavLink>
              <NavLink activeClassName='selected' to="/redux">redux</NavLink>
              <NavLink activeClassName='selected' to="/RefTest">RefTest</NavLink>
              <NavLink activeClassName='selected' to="/redux-todo-list">todo-list</NavLink>
              <NavLink activeClassName='selected' to="/Clock">Clock</NavLink>
              <NavLink activeClassName='selected' to="/TodoList">TodoList</NavLink>
              <NavLink activeClassName='selected' to="/FirstAntd">FirstAntd</NavLink>
              <NavLink activeClassName='selected' to="/homeword1">homeword1</NavLink>
              <NavLink activeClassName='selected' to="/param/1/">/param/1</NavLink>
              <NavLink activeClassName='selected' to="/param/100000000/">/param/10000000</NavLink>
              <NavLink activeClassName='selected' to="/嵌套路由">/嵌套路由</NavLink>


            </div>
            <div className="context">
              <Route path="/if" component={StudentList} />
              <Route path="/状态提升" component={Temperature} />
              <Route path="/表单" component={Form} />
              <Route path="/redux" component={Counter} />
              <Route path="/RefTest" component={RefTest} />
              <Route path="/Clock" component={Clock} />
              <Route path="/TodoList" component={TodoList} />
              <Route path="/FirstAntd" component={FirstAntd} />
              <Route path="/param/:id" component={Params} />
              <Route path="/嵌套路由" component={Params2} />
              <Provider store={store2}>
                <Route path="/redux-todo-list" component={ReduxToDo} />
              </Provider>
              <Provider store={store3}>
                <Route path="/homeword1" component={StaffPage} />
              </Provider>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default DemoList;
