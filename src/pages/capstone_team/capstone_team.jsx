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
import convertCSV from "../../utils/convertCSV/convertCSV_team";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  dataCapstoneTeamState,
  rowSelectedCapstoneTeamState
} from "../../../store/table/table";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import STATUS_MAPPING from "../../constant/color";
// import { Helmet } from "react-helmet";

function capstone_team() {
  const { Title } = Typography;
  const [_data, _setData] = useRecoilState(dataCapstoneTeamState);
  const [url, setUrl] = useState("");
  const setRowSelectedCapstoneTeam = useSetRecoilState(
    rowSelectedCapstoneTeamState
  );
  let navigate = useNavigate();
  const columns = [
    {
      title: "Team Coce",
      dataIndex: "Mã nhóm",
      key: "Mã nhóm",
      width: 120,
      fixed: "left",
      render: text => <a>{text}</a>
    },
    {
      title: "Semeter",
      dataIndex: "Học kì",
      key: "Học kì",
      width: 100,
      fixed: "left"
    },
    {
      title: "Status",
      key: "Trạng thái",
      width: 120,
      dataIndex: "Trạng thái",
      fixed: "left",
      render: (_, record, index) => (
        <>
          <Tag key={index} color={STATUS_MAPPING[record["Trạng thái"]].color}>
            {STATUS_MAPPING[record["Trạng thái"]].text.toUpperCase()}
          </Tag>
        </>
      )
    },
    {
      title: "Topic",
      dataIndex: "Đề tài",
      key: "Đề tài",
      width: 300,
      fixed: "left"
    },
    {
      title: "Mentor",
      dataIndex: "Giảng viên hướng dẫn",
      key: "Giảng viên hướng dẫn",
      width: 200
    },
    {
      title: "Leader",
      dataIndex: "Trưởng nhóm",
      key: "Trưởng nhóm",
      width: 200
    },
    {
      title: "Member",
      dataIndex: "Thành viên",
      key: "Thành viên",
      width: 200
    },
    {
      title: "Date",
      dataIndex: "Ngày",
      key: "Ngày",
      width: 200
    },
    {
      title: "Time",
      dataIndex: "Giờ",
      key: "Giờ",
      width: 200
    },
    {
      title: "Location",
      dataIndex: "Phòng",
      key: "Phòng",
      width: 200
    }
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
        const objectCSV = convertCSV(e.target.result);
        console.log(objectCSV);
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
        <Title level={3} style={{ marginTop: 0, fontWeight: 500 }}>
          {/* Capstone Project Team List */}
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
              setRowSelectedCapstoneTeam(_data[rowIndex]);
              navigate(`/admin/capstone-team/${record["Mã nhóm"]}`);
            }
          };
        }}
        columns={columns}
        dataSource={_data}
        style={{ cursor: "pointer" }}
        rowKey={obj => obj.code}
        scroll={{ x: 1800 }}
      />
    </>
  );
}

export default capstone_team;
