import React, { Component } from "react";
import "antd/dist/antd.css";
import "./staffPage.css";
import { Input, Button, Space } from "antd";
import { EditableTable } from "./Editable";
import { connect } from "react-redux";
import { addStaff,modifyStaff,deleteStaff ,search} from "../../redux/homeword1/action";
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
    showList:this.props.originData,
  };

  onSearch(value) {
    console.log(value);
    this.props.search(value)
  }
  add() {
    console.log("add");
    this.props.addStaff({ key: this.props.originData.length + 1 ,name:"",department:"",id:""})
  }

  modify(data){
    console.log('modify');
    console.log(data);
    this.props.modifyStaff(data)
  }title

  rm(data){
    console.log('rm');
    this.props.deleteStaff(data)
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
              onSearch={(value) => this.onSearch(value)}
              style={{ width: 200 }}
            />
            <Button type="primary" onClick={() => this.add()}>
              + 新增成员
            </Button>
          </Space>
          <div className="table">
            <EditableTable data={this.props.showList} modify={(data)=>this.modify(data)} rm={(data)=>this.rm(data)}/>
          </div>
        </Space>
      </div>
    );
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(StaffPage);
