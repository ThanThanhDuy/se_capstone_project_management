import React, { useState } from "react";
import { Table, InputNumber, Button, Modal } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
function LectureGrade() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dataInput = [
    {
      MSSV: "SE140971",
      "Họ và tên": "Quách Đại Lợi",
      "Điểm 1": 5,
      "Điểm 2": 6,
      "Điểm 3": 7,
      "Điểm 4": 8,
      "Điểm 5": 9
    },
    {
      MSSV: "SE140972",
      "Họ và tên": "Thân Thanh Duy",
      "Điểm 1": 5,
      "Điểm 2": 6,
      "Điểm 3": 7,
      "Điểm 4": 8,
      "Điểm 5": 9
    },
    {
      MSSV: "SE140973",
      "Họ và tên": "Nguyễn Đăng Khoa",
      "Điểm 1": 5,
      "Điểm 2": 6,
      "Điểm 3": 7,
      "Điểm 4": 8,
      "Điểm 5": 9
    },
    {
      MSSV: "SE140974",
      "Họ và tên": "Đỗ Trọng Đạt",
      "Điểm 1": 5,
      "Điểm 2": 6,
      "Điểm 3": 7,
      "Điểm 4": 8,
      "Điểm 5": 9
    }
  ];

  const [datas, setDatas] = useState({
    dataTopic: [],
    dataGrade: dataInput
  });
  const _handleEditGrade = (e, key, index) => {
    {
      const newData = { ...datas };
      newData.dataGrade[index][key] = Number(e);
      setDatas(newData);
    }
  };
  const columns = [
    {
      title: "MSSV",
      dataIndex: "MSSV",
      key: "MSSV",
      width: 100,
      fixed: "left"
      // render: text => <Link to={`/admin/capstone-council/${text}`}>{text}</Link>
    },
    {
      title: "Họ và tên",
      dataIndex: "Họ và tên",
      key: "Họ và tên",
      width: 200,
      fixed: "left"
    },
    {
      title: "Điểm 1",
      dataIndex: "Điểm 1",
      key: "Điểm 1",
      width: 100,
      render: (text, record, index) => (
        <InputNumber
          min={0}
          max={10}
          value={text}
          onChange={e => _handleEditGrade(e, "Điểm 1", index)}
        />
      )
    },
    {
      title: "Điểm 2",
      dataIndex: "Điểm 2",
      key: "Điểm 2",
      width: 100,
      render: (text, record, index) => (
        <InputNumber
          min={0}
          max={10}
          value={text}
          onChange={e => _handleEditGrade(e, "Điểm 2", index)}
        />
      )
    },
    {
      title: "Điểm 3",
      dataIndex: "Điểm 3",
      key: "Điểm 3",
      width: 100,
      render: (text, record, index) => (
        <InputNumber
          min={0}
          max={10}
          value={text}
          onChange={e => _handleEditGrade(e, "Điểm 3", index)}
        />
      )
    },
    {
      title: "Điểm 4",
      dataIndex: "Điểm 4",
      key: "Điểm 4",
      width: 100,
      render: (text, record, index) => (
        <InputNumber
          min={0}
          max={10}
          value={text}
          onChange={e => _handleEditGrade(e, "Điểm 4", index)}
        />
      )
    },
    {
      title: "Điểm 5",
      dataIndex: "Điểm 5",
      key: "Điểm 5",
      width: 100,
      render: (text, record, index) => (
        <InputNumber
          min={0}
          max={10}
          value={text}
          onChange={e => _handleEditGrade(e, "Điểm 5", index)}
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
        dataSource={datas.dataGrade}
        rowKey={obj => obj.MSSV}
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
