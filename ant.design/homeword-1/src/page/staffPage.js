import React, { Component } from "react";
import "antd/dist/antd.css";
import "./staffPage.css";
import { Input, Button, Space } from "antd";
import { EditableTable } from "../component/Editable";
import { connect } from "react-redux";
import { addStaff,modifyStaff,deleteStaff ,search} from "../redux/action";
import { bindActionCreators } from "redux";

const { Search } = Input;

function mapStatetoProps(state) {
  return {
    originData: state.originData,
    showList:state.showList,
  };
}

function mapDispatchtoProps(dispatch) {
  return bindActionCreators({ addStaff ,modifyStaff,deleteStaff,search}, dispatch);
}

class StaffPage extends Component {
  state = {
    searchValue:"",
    edit:""
  };

  onSearch(value) {
    console.log('search');
    value = value.target.value
    console.log(value);

    this.setState({
      searchValue:value
    })

    this.props.search(value)
  }

  add() {
    console.log("add");
    const originData = this.props.originData
    const key =originData.length>0? originData[originData.length-1].key+1:0
    this.props.addStaff({ key ,name:"",department:"",id:""})
    this.setState({
      searchValue:"",
      edit:key
    })
  }

  modify(data){
    console.log('modify');
    console.log(data);
    this.props.modifyStaff(data)
    this.setState({
      searchValue:"",
      edit:"" 
    })
  }title

  rm(data){
    console.log('rm');
    this.props.deleteStaff(data)
    this.setState({
      searchValue:"",
      edit:""
    })
  }
  
  render() {
    console.log(this.props.originData);
    return (
      <div>
        <p className="title">成员管理</p>
        <Space direction="vertical" width="100%" align="start">
          <Space size="middle">
            <Search
              placeholder="搜索员工姓名"
              onChange={(value) => this.onSearch(value)}
              // onSearch={(value) => this.onSearch(value)}
              value={this.state.searchValue}
              style={{ width: 200 }}
            />
            <Button type="primary" onClick={() => this.add()}>
              + 新增成员
            </Button>
          </Space>
          <div className="table">
            <EditableTable data={this.props.showList} edit={this.state.edit} modify={(data)=>this.modify(data)} rm={(data)=>this.rm(data)}/>
          </div>
        </Space>
      </div>
    );
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(StaffPage);
