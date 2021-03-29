import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Space,
} from "antd";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  // console.log(children);

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

let EditableTable = (props) => {
  const [form] = Form.useForm();
  let [data, setData] = useState(props.data);

  const [editingKey, setEditingKey] = useState(props.edit);

  const isEditing = (record) => record.key === editingKey;


  const edit = (record) => {
    console.log("record");
    console.log(record);
    setEditingKey(record.key);
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    
  };
  useEffect(() => {
    setData(props.data);
    if(props.edit !== ""){
      setEditingKey(props.edit);
    }
  });

  // useEffect(() => {
  //   console.log('editingKey update');
  //   setEditingKey("");
  //   if (data.length > 0 && data[data.length - 1].name === "") {
  //     console.log("data");
  //     console.log(data[data.length - 1]);
  //     edit(data[data.length - 1]);
  //   }
  // },[editingKey]);

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        row.key = key;
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        props.modify(row);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleDelete = (key) => {
    console.log("delete");
    console.log(key);
    props.rm(key);
    setEditingKey("");
  };

  const columns = [
    {
      title: "成员姓名",
      dataIndex: "name",
      width: "25%",
      editable: true,
    },
    {
      title: "工号",
      dataIndex: "id",
      width: "15%",
      editable: true,
    },
    {
      title: "所属部门",
      dataIndex: "department",
      width: "40%",
      editable: true,
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Popconfirm title="确定保存?" onConfirm={() => save(record.key)}>
              <a>保存</a>
            </Popconfirm>
            <Popconfirm title="确定取消?" onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </Space>
        ) : (
          <Space>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              修改
            </Typography.Link>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <a>删除</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
          position: ["none", "none"],
        }}
      />
    </Form>
  );
};
export { EditableTable };
