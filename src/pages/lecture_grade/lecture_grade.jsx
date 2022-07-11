import {
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  InputNumber,
  Spin,
  PageHeader,
  Space,
  Typography,
  Divider,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate, useParams } from "react-router-dom";
import gradeService from "../../services/grade";
import openNotification from "../../components/common/notification/index";
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

  // const toggleEdit = () => {
  //   setEditing(!editing);
  //   form.setFieldsValue({
  //     [dataIndex]: record[dataIndex],
  //   });
  // };

  const save = async () => {
    try {
      const values = await form.validateFields();
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
    childNode = (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          max={10}
          ref={inputRef}
          // onBlur={save}
          onChange={save}
          type="number"
        />
      </Form.Item>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const App = () => {
  let params = useParams();
  const {
    capstoneTeamId,
    reportCode,
    reportType,
    reportName,
    reportDescription,
    topicDescription,
    topicCode,
    topicName,
  } = JSON.parse(localStorage.getItem("reportGrade"));
  const [defaultColumns, setDefaultColumns] = useState([]);
  const [dataSource, setDataSource] = useState(null);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const fetchData = async () => {
    setLoading(true);
    let res = await gradeService.getGradeByReportCode(params.reportCode);
    let columns = [
      {
        title: "Code",
        dataIndex: "code",
        fixed: "left",
        width: 150,
        editable: false,
      },
      {
        title: "Name",
        dataIndex: "name",
        width: 250,
        editable: false,
      },
    ];
    if (res) {
      for (let i of res.mark_columns) {
        columns.push({
          title: i.name,
          dataIndex: i.id,
          width: 170,
          editable: true,
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
      details: dataSource,
    });
    if (res.code === 200) {
      setTimeout(() => {
        openNotification("success", res.message);
      }, 1000);
    } else if (res.code === 500) {
      setTimeout(() => {
        openNotification("error", res.message);
      }, 1000);
    }
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
      cell: EditableCell,
    },
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
        handleSave,
      }),
    };
  });
  return (
    <Spin spinning={loading}>
      <div>
        <PageHeader
          style={{ padding: "16px 30px 0px" }}
          onBack={() => navigate(`/user/report/${capstoneTeamId}`)}
          title={`${reportCode[0].toUpperCase()}${reportCode.substring(1)}`}
        />
        <Helmet>
          <meta charSet="utf-8" />
          <title>Grade - {params.reportCode.toUpperCase()}</title>
        </Helmet>
        <div style={{ padding: "16px 30px 0px", marginBottom: 10 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              className="report_item--title"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span
                style={{
                  fontSize: 13,
                  color: "#008172",
                  backgroundColor: "#deeeec",
                  padding: "2px 5px",
                  borderRadius: 5,
                  fontWeight: 400,
                }}
              >
                {capstoneTeamId} - <span>{reportCode?.toUpperCase()}</span>
              </span>
            </div>
            <div
              style={{
                marginTop: 5,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <div style={{ fontSize: 20, color: "#44494d" }}>
                #{reportType}
              </div>
              <span style={{ fontSize: 20, color: "#44494d" }}>
                {reportName}
              </span>
            </div>
            {/* <p className="card_description">{report.description}</p> */}
            <div className="card_description">{reportDescription}</div>
          </div>
        </div>

        <div style={{ padding: "16px 30px 0px", marginBottom: 10 }}>
          <Space>
            <Typography.Title
              level={4}
              style={{ display: "flex", alignItems: "center" }}
            >
              Topic: {topicName}
              <span
                style={{
                  fontSize: 16,
                  color: "#008172",

                  padding: "5px 10px",
                  borderRadius: 5,
                  fontWeight: 400,
                  marginLeft: 5,
                }}
              >
                <span>{topicCode?.toUpperCase()}</span>
              </span>
            </Typography.Title>
          </Space>
          <Typography.Paragraph
            style={{
              marginTop: "0px",
              marginBottom: "50px",
            }}
          >
            {topicDescription}
          </Typography.Paragraph>
        </div>
        <Divider />
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource?.sort(function (a, b) {
            return a.id - b.id;
          })}
          columns={columns}
          rowKey={obj => obj.id}
          scroll={{ x: 1200 }}
          pagination={false}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{
              backgroundColor: "#00796a",
              color: "#fff",
              height: "45px",
              width: "150px",
              borderRadius: "10px",
              fontSize: 16,
              marginTop: "20px",
            }}
            onClick={handleSubmitGrade}
          >
            Submit grade
          </Button>
        </div>
      </div>
    </Spin>
  );
};

export default App;
