import React, { useState } from "react";
import { Typography, Table, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import convertCSV from "../../utils/convertCSV/convertCSV";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  dataCapstoneCouncilState,
  dataResultState,
  rowSelectedCapstoneCouncilState
} from "../../../store/table/table";
import { Link, useNavigate } from "react-router-dom";

function capstone_council() {
  const { Title } = Typography;
  const [_data, _setData] = useRecoilState(dataCapstoneCouncilState);
  const [_dataResult, _setDataResult] = useRecoilState(dataResultState);
  const setRowSelectedCapstoneCouncil = useSetRecoilState(
    rowSelectedCapstoneCouncilState
  );
  let navigate = useNavigate();

  const columns = [
    {
      title: "Mã hội đồng",
      dataIndex: "Mã hội đồng",
      key: "Mã Hội Đồng",
      width: 100,
      fixed: "left",
      render: text => <Link to={`/admin/capstone-council/${text}`}>{text}</Link>
    },
    {
      title: "Học kì",
      dataIndex: "Học kì",
      key: "Học Kì",
      width: 80,
      fixed: "left"
    },
    {
      title: "Chủ tịch",
      dataIndex: "Chủ tịch",
      key: "Chủ tịch",
      width: 180
    },
    {
      title: "Thư kí",
      dataIndex: "Thư kí",
      key: "Thư kí",
      width: 180
    },
    {
      title: "Thành viên",
      dataIndex: "Thành viên",
      key: "Thành viên",
      width: 180
    }
  ];

  const props = {
    name: "file",
    action: "http://localhost:3000/",
    accept: ".csv",

    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload(file) {
      const reader = new FileReader();
      reader.onload = e => {
        const objectCSV = convertCSV(e.target.result);
        let objData = [];
        _setDataResult(objectCSV);
        objectCSV.forEach(item => {
          objData.push(item.council);
        });
        _setData(objData);
      };
      reader.readAsText(file);
      return false;
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30
        }}
      >
        <Title level={3} style={{ marginTop: 20, fontWeight: 500 }}>
          {/* Capstone Project Council List */}
        </Title>
        <div>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
      </div>
      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setRowSelectedCapstoneCouncil(_dataResult[rowIndex]);
              navigate(`/admin/capstone-council/${record["Mã hội đồng"]}`);
            }
          };
        }}
        style={{ cursor: "pointer" }}
        columns={columns}
        dataSource={_data}
        rowKey={record => record["index"]}
        scroll={{ x: 1800 }}
      />
    </>
  );
}

export default capstone_council;
