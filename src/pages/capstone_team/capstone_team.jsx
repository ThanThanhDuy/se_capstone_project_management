import React from "react";
import {
  Breadcrumb,
  Typography,
  Table,
  Tag,
  Button,
  message,
  Upload
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import convertCSV from "../../utils/convertCSV/convertCSV";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { dataCapstoneTeamState } from "../../../store/table/table";
// import { Helmet } from "react-helmet";

function capstone_team() {
  const { Title } = Typography;
  const [_data, _setData] = useRecoilState(dataCapstoneTeamState);

  const columns = [
    {
      title: "Code Team",
      dataIndex: "code",
      key: "code",
      width: 120,
      fixed: "left",
      render: text => <a>{text}</a>
    },
    {
      title: "Semeter",
      dataIndex: "semeter",
      key: "semeter",
      width: 100,
      fixed: "left"
    },
    {
      title: "Status",
      key: "status",
      width: 100,
      dataIndex: "status",
      fixed: "left",
      render: (_, record) => (
        <>
          <Tag
            color={
              record.status.length >= 8
                ? record.status === "not pass"
                  ? "volcano"
                  : "geekblue"
                : "green"
            }
          >
            {record.status.toUpperCase()}
          </Tag>
        </>
      )
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
      width: 600,
      fixed: "left"
    },
    {
      title: "Mentor 1",
      dataIndex: "mentor1",
      key: "mentor1",
      width: 200
    },
    {
      title: "Mentor 2",
      dataIndex: "mentor2",
      key: "mentor2",
      width: 200
    },
    {
      title: "Member 1",
      dataIndex: "member1",
      key: "member",
      width: 200
    },
    {
      title: "Member 2",
      dataIndex: "member2",
      key: "member2",
      width: 200
    },
    {
      title: "Member 3",
      dataIndex: "member3",
      key: "member3",
      width: 200
    },
    {
      title: "Member 4",
      dataIndex: "member4",
      key: "member4",
      width: 200
    },
    {
      title: "Member 5",
      dataIndex: "member5",
      key: "member5",
      width: 200
    }
  ];

  const key = [
    "code",
    "semeter",
    "status",
    "topic",
    "mentor1",
    "mentor2",
    "member1",
    "member2",
    "member3",
    "member4",
    "member5"
  ];
  const props = {
    name: "file",
    action: "http://localhost:3000/",
    accept: ".csv",

    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
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
        const objectCSV = convertCSV(e.target.result, key);
        if (objectCSV) {
          _setData(objectCSV);
        }
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
        {/* <Helmet>
          <meta charSet="utf-8" />
          <title>Casptone Team</title>
        </Helmet> */}
        <Title level={3} style={{ marginTop: 20, fontWeight: 500 }}>
          {/* Capstone Project Team List */}
        </Title>
        <div>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={_data}
        rowKey={obj => obj.code}
        scroll={{ x: 1800 }}
      />
    </>
  );
}

export default capstone_team;
