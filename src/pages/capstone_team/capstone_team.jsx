import React, { useEffect } from "react";
import {
  Breadcrumb,
  Typography,
  Table,
  Tag,
  Button,
  message,
  Upload,
  Spin
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
import axios from "axios";
// import { Helmet } from "react-helmet";

function capstone_team() {
  const { Title } = Typography;
  const [_data, _setData] = useRecoilState(dataCapstoneTeamState);
  const setRowSelectedCapstoneTeam = useSetRecoilState(
    rowSelectedCapstoneTeamState
  );
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const columns = [
    {
      title: "Team Coce",
      dataIndex: "capstone_team_code",
      key: "capstone_team_code",
      width: 120,
      fixed: "left",
      render: text => <a>{text}</a>
    },
    {
      title: "Semeter",
      dataIndex: "semeter_name",
      key: "semeter_name",
      width: 130,
      fixed: "left"
    },
    {
      title: "Status",
      key: "capstone_team_status",
      width: 120,
      dataIndex: "capstone_team_status",
      fixed: "left",
      render: (_, record, index) => (
        <>
          <Tag
            key={index}
            color={STATUS_MAPPING[record["capstone_team_status"]].color}
          >
            {STATUS_MAPPING[record["capstone_team_status"]].text.toUpperCase()}
          </Tag>
        </>
      )
    },
    {
      title: "Topic",
      dataIndex: "topic_name",
      key: "topic_name",
      width: 300,
      fixed: "left"
    },
    {
      title: "Mentor",
      dataIndex: "mentor_name",
      key: "mentor_name",
      width: 200
    },
    {
      title: "Leader",
      dataIndex: "leader_name",
      key: "leader_name",
      width: 200
    },
    {
      title: "Member",
      dataIndex: "member_name",
      key: "member_name",
      width: 200
    }
    // {
    //   title: "Date",
    //   dataIndex: "Ngày",
    //   key: "Ngày",
    //   width: 200
    // },
    // {
    //   title: "Time",
    //   dataIndex: "Giờ",
    //   key: "Giờ",
    //   width: 200
    // },
    // {
    //   title: "Location",
    //   dataIndex: "Phòng",
    //   key: "Phòng",
    //   width: 200
    // }
  ];
  async function getCaptoneTeam() {
    const res = await axios.get("http://localhost:8081/admin/get-captone-team");
    if (res.data.code === 200) {
      setTimeout(() => {
        _setData(res.data.data);
        setLoading(false);
      }, 1000);
    }
  }
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
      reader.onload = async e => {
        const objectCSV = convertCSV(e.target.result);
        const res = await axios.post(
          "http://localhost:8081/admin/insert-capstone-team",
          {
            data: objectCSV
          }
        );

        if (res.data.code === 200) {
          setLoading(true);
          getCaptoneTeam();
        }
      };
      reader.readAsText(file);
      return false;
    }
  };

  useEffect(() => {
    setLoading(true);
    getCaptoneTeam();
  }, []);

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
      <Spin spinning={loading} delay={500}>
        <Table
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                setRowSelectedCapstoneTeam(_data[rowIndex]);
                navigate(
                  `/admin/capstone-team/${record["capstone_team_code"]}`
                );
              }
            };
          }}
          columns={columns}
          dataSource={_data}
          style={{ cursor: "pointer" }}
          rowKey={obj => obj.code}
          scroll={{ x: 1800 }}
        />
      </Spin>
    </>
  );
}

export default capstone_team;
