import {
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  InputNumber,
  Spin
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import gradeService from "../../services/grade";
const EditableContext = React.createContext(null);
import "./lecture_grade.scss";
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          }
        ]}
      >
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          max={10}
          ref={inputRef}
          onChange={save}
          onBlur={save}
          type="number"
        />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const App = () => {
  let params = useParams();
  const [defaultColumns, setDefaultColumns] = useState([]);
  const [dataSource, setDataSource] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    let res = await gradeService.getGradeByReportCode(params.reportCode);
    let columns = [
      {
        title: "Code",
        dataIndex: "code",
        fixed: "left",
        width: 150
      },
      {
        title: "Name",
        dataIndex: "name",
        width: 300
      }
    ];
    if (res) {
      for (let i of res.mark_columns) {
        columns.push({
          title: i.name,
          dataIndex: i.id,
          width: 170,
          editable: true
        });
      }
    }
    setDefaultColumns(columns);
    res?.rows.forEach(item => {
      for (let i of item.marks) {
        item[i.id] = i.mark;
      }
    });
    setDataSource(res.rows);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmitGrade = async () => {
    let res = await gradeService.submitGrade({
      code: params.reportCode,
      details: dataSource
    });
    fetchData();
  };

  const handleSave = row => {
    // console.log(row);
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    newData.forEach((rowNew, i) => {
      if (i === index) {
        for (let item of rowNew.marks) {
          item["mark"] = row[item.id];
        }
      }
    });
    console.log(newData);
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  };
  const columns = defaultColumns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      })
    };
  });
  return (
    <Spin spinning={loading}>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Grade - {params.reportCode.toUpperCase()}</title>
        </Helmet>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource?.sort(function (a, b) {
            return a.id - b.id;
          })}
          columns={columns}
          rowKey={obj => obj.id}
          scroll={{ x: 1100 }}
          pagination={false}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleSubmitGrade}
            type="primary"
            style={{
              backgroundColor: "#00796a",
              marginTop: "20px",
              border: "none"
            }}
          >
            Submit grade
          </Button>
        </div>
      </div>
    </Spin>
  );
};

export default App;
