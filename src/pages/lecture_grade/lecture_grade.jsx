import React, { useState } from "react";
import { Table, InputNumber, Button, Modal } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import data from "./lecture.json";
import { useEffect } from "react";

function LectureGrade() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [datas, setDatas] = useState({});

  useEffect(() => {
    const dataInput = JSON.parse(JSON.stringify(data));

    dataInput.data.rows.forEach(row => {
      for (let item of row.marks) {
        row[item.code] = item.mark;
      }
    });
    console.log(dataInput);
    setDatas(dataInput);
  }, []);
  const _handleEditGrade = (e, key, index) => {
    {
      let newData = {};
      newData = Object.assign(newData, datas);
      newData.data.rows[index][key] = Number(e);
      newData.data.rows.forEach((row, i) => {
        if (i === index) {
          for (let item of row.marks) {
            if (item.code === key) {
              item.mark = Number(e);
            }
          }
        }
      });
      console.log(newData);
      setDatas(newData);
    }
  };
  const columns = [
    {
      title: "MSSV",
      dataIndex: "code",
      key: "code",
      width: 100,
      fixed: "left"
      // render: text => <Link to={`/admin/capstone-council/${text}`}>{text}</Link>
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      fixed: "left"
    },
    {
      title: datas.data?.mark_columns[0].name,
      dataIndex: datas.data?.mark_columns[0].code,
      key: datas.data?.mark_columns[0].code,
      width: 100,
      render: (text, record, index) => (
        <InputNumber
          min={0}
          max={10}
          value={text}
          onChange={e =>
            _handleEditGrade(e, datas.data.mark_columns[0].code, index)
          }
        />
      )
    },
    {
      title: datas.data?.mark_columns[1].name,
      dataIndex: datas.data?.mark_columns[1].code,
      key: datas.data?.mark_columns[1].code,
      width: 100,
      render: (text, record, index) => (
        <InputNumber
          min={0}
          max={10}
          value={text}
          onChange={e =>
            _handleEditGrade(e, datas.data.mark_columns[1].code, index)
          }
        />
      )
    },
    {
      title: datas.data?.mark_columns[2].name,
      dataIndex: datas.data?.mark_columns[2].code,
      key: datas.data?.mark_columns[2].code,
      width: 100,
      render: (text, record, index) => (
        <InputNumber
          min={0}
          max={10}
          value={text}
          onChange={e =>
            _handleEditGrade(e, datas.data.mark_columns[2].code, index)
          }
        />
      )
    },
    {
      title: datas.data?.mark_columns[3].name,
      dataIndex: datas.data?.mark_columns[3].code,
      key: datas.data?.mark_columns[3].code,
      width: 100,
      render: (text, record, index) => (
        <InputNumber
          min={0}
          max={10}
          value={text}
          onChange={e =>
            _handleEditGrade(e, datas.data.mark_columns[3].code, index)
          }
        />
      )
    },
    {
      title: datas.data?.mark_columns[4].name,
      dataIndex: datas.data?.mark_columns[4].code,
      key: datas.data?.mark_columns[4].code,
      width: 100,
      render: (text, record, index) => (
        <InputNumber
          min={0}
          max={10}
          value={text}
          onChange={e =>
            _handleEditGrade(e, datas.data.mark_columns[4].code, index)
          }
        />
      )
    }
  ];
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div style={{ paddingTop: 20 }}>
      <Table
        columns={columns}
        dataSource={datas.data?.rows}
        rowKey={obj => obj.code}
        scroll={{ x: 1000 }}
        pagination={false}
      />
      <Button type="primary" style={{ marginTop: 30 }} onClick={showModal}>
        Submit Grade
      </Button>
      <div style={{ marginTop: 30 }}>
        <span style={{ fontSize: 16 }}>Document: </span>
        <a
          style={{ fontSize: 16 }}
          href="https://firebasestorage.googleapis.com/v0/b/se-capstone-project-management.appspot.com/o/files%2FReport%20example.docx?alt=media&token=cb1b05c0-1fb0-465e-9387-7f50a127b99d"
        >
          Report example.docx
          <span style={{ marginLeft: 5 }}>
            <DownloadOutlined />
          </span>
        </a>
      </div>
      <div style={{ marginTop: 30 }}>
        <span style={{ fontSize: 16 }}>Meeting minutes: </span>
        <a
          style={{ fontSize: 16 }}
          href="https://firebasestorage.googleapis.com/v0/b/se-capstone-project-management.appspot.com/o/files%2FReport%20example.docx?alt=media&token=cb1b05c0-1fb0-465e-9387-7f50a127b99d"
        >
          Meeting minutes.docx
          <span style={{ marginLeft: 5 }}>
            <DownloadOutlined />
          </span>
        </a>
      </div>
      <Modal
        title="Submit Grade"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </div>
  );
}

export default LectureGrade;
