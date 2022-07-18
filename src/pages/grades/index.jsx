import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Spin,
  Table,
  Typography,
} from "antd";
import { QuestionCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import openNotification from "../../components/common/notification";
import gradeService from "../../services/grade";
import { Helmet } from "react-helmet";

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

const Grades = () => {
  const originData = [];

  for (let i = 0; i < 5; i++) {
    originData.push({
      key: i.toString(),
      id: `Edrward ${i}`,
      namae: 32,
      value: `London Park no. ${i}`,
    });
  }
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonSubmit, setButtonSubmit] = useState(false);
  const [buttonAdd, setButtonAdd] = useState(false);

  async function _fetchData() {
    setLoading(true);
    const res = await gradeService.getDetailGrades();
    if (res) {
      for (const item of res) {
        item.key = item.id;
      }
    }
    setTimeout(() => {
      setData(res);
      setLoading(false);
    }, 1000);
    console.log(res);
  }

  useEffect(() => {
    _fetchData();
  }, []);

  const handleUpdateGrade = async dataInsert => {
    if (!dataInsert) {
      let total = data?.reduce((total, item) => (total += item.value), 0);
      if (total === 1) {
        const res = await gradeService.updateGradeDetail(data);
        if (res && res.code === 200) {
          setTimeout(() => {
            openNotification("success", res.message);
          }, 1000);
          _fetchData();
        } else {
          setTimeout(() => {
            openNotification("error", res.message);
          }, 200);
        }
      } else {
        setTimeout(() => {
          openNotification(
            "error",
            `Please check value again! Total must be 1`
          );
        }, 200);
      }
    } else {
      const res = await gradeService.updateGradeDetail(dataInsert);
      if (res && res.code === 200) {
        setTimeout(() => {
          openNotification("success", res.message);
        }, 1000);
        _fetchData();
      } else {
        setTimeout(() => {
          openNotification("error", res.message);
        }, 200);
      }
    }
  };

  const handleDeleteMark = async index => {
    const id = data[index].id;
    const res = await gradeService.deleteGradeDetail(id);
    if (res && res.code === 200) {
      setTimeout(() => {
        openNotification("success", res.message);
      }, 1000);
      _fetchData();
    } else {
      setTimeout(() => {
        openNotification("error", res.message);
      }, 200);
    }
  };

  const onFinish = values => {
    const newData = [...data, values];
    handleUpdateGrade(newData);
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  const isEditing = record => record.id === editingKey;

  const edit = record => {
    form.setFieldsValue({
      id: "",
      name: "",
      value: "",
      ...record,
    });
    setEditingKey(record.key);
    setButtonSubmit(true);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async key => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
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

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      width: "25%",
      editable: false,
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "15%",
      editable: false,
    },
    {
      title: "Value",
      dataIndex: "value",
      width: "20%",
      editable: true,
    },
    {
      title: "Edit",
      dataIndex: "Edit",
      width: "30%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "Delete",
      width: "30%",
      render: (_, record, index) => {
        const editable = isEditing(record);
        return (
          <span>
            <Popconfirm
              style={{ width: 300 }}
              title="Are you sure？"
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
              onConfirm={() => handleDeleteMark(index)}
            >
              <a href="#">Delete</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === "value" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <>
      <Spin spinning={loading}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <Helmet>
            <meta charSet="utf-8" />
            <title>Detail Grade</title>
          </Helmet>
        </div>
        {!buttonAdd && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ marginBottom: 20 }}
            onClick={() => setButtonAdd(true)}
          >
            Add mark
          </Button>
        )}
        {buttonAdd && (
          <div>
            <Form
              name="basic"
              labelCol={{
                span: 2,
              }}
              wrapperCol={{
                span: 4,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input name!",
                  },
                ]}
              >
                <Input placeholder="Name" />
              </Form.Item>

              <Form.Item
                name="value"
                rules={[
                  {
                    required: true,
                    message: `Please input value!`,
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Value"
                  min={0}
                  max={1}
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  wrapperCol: {
                    offset: 8,
                    span: 16,
                  },
                }}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button
                  onClick={() => setButtonAdd(false)}
                  style={{ marginLeft: 15 }}
                  htmlType="button"
                >
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
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
            pagination={false}
          />
        </Form>
        {buttonSubmit && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              disabled={editingKey !== ""}
              style={{
                backgroundColor: "#00796a",
                color: "#fff",
                height: "45px",
                width: "150px",
                borderRadius: "10px",
                fontSize: 16,
                marginTop: "20px",
              }}
              onClick={() => handleUpdateGrade()}
            >
              Save Change
            </Button>
          </div>
        )}
      </Spin>
    </>
  );
};

export default Grades;
