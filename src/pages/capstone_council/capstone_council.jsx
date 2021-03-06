import React, { useEffect, useState } from "react";
import { Typography, Table, Button, message, Upload, Spin } from "antd";
import { DownCircleFilled, UploadOutlined } from "@ant-design/icons";
import convertCSV from "../../utils/convertCSV/convertCSV";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  dataCapstoneCouncilState,
  dataResultState,
  rowSelectedCapstoneCouncilState,
} from "../../../store/table/table";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import Papa from "papaparse";
import openNotification from "../../components/common/notification";

function capstone_council() {
  const { Title } = Typography;
  const [_data, _setData] = useRecoilState(dataCapstoneCouncilState);
  const [_dataResult, _setDataResult] = useRecoilState(dataResultState);
  const setRowSelectedCapstoneCouncil = useSetRecoilState(
    rowSelectedCapstoneCouncilState
  );
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const defaultTemplate =
    "https://firebasestorage.googleapis.com/v0/b/se-capstone-project-management.appspot.com/o/template%2FTemplate_Council.csv?alt=media&token=0fe729cd-4c83-4e19-be40-29c6a85c97ce";
  const columns = [
    {
      title: "Council Id",
      dataIndex: "capstone_council_code",
      key: "capstone_council_code",
      width: 100,
      fixed: "left",
      render: (text) => (
        <Link to={`/admin/capstone-council/${text}`}>{text}</Link>
      ),
    },
    {
      title: "Chairperson",
      dataIndex: "chairman",
      key: "chairman",
      width: 180,
    },
    {
      title: "Secretary",
      dataIndex: "secretary",
      key: "secretary",
      width: 180,
    },
    {
      title: "Members",
      dataIndex: "member",
      key: "member",
      width: 180,
    },
  ];
  async function getCaptoneCouncil() {
    const data = JSON.parse(localStorage.getItem("data"));
    const res = await axios.get(
      "http://localhost:8081/admin/get-captone-council",
      {
        headers: {
          Authorization: `Bearer ${data?.AccessToken}`,
        },
      }
    );
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
      reader.onload = async (e) => {
        const files = e.target.result;
        if (files) {
          Papa.parse(files, {
            header: true,
            complete: async function (results) {
              const data = JSON.parse(localStorage.getItem("data"));
              const res = await axios.post(
                "http://localhost:8081/admin/insert-capstone-council",
                {
                  councils: results.data,
                },
                {
                  headers: {
                    Authorization: `Bearer ${data?.AccessToken}`,
                  },
                }
              );
              console.log(res);
              if (res.data.code === 200) {
                console.log(res);
                setLoading(true);
                openNotification(
                  res.data.data.count !== 0 ? "success" : "warning",
                  res.data.data.count !== 0
                    ? "Import successfully"
                    : "Import Failed",
                  `${res.data.data.count} row is accepted`
                );
                getCaptoneCouncil();
              }
            },
          });
        }
      };
      reader.readAsText(file);
      return false;
    },
  };
  useEffect(() => {
    setLoading(true);
    getCaptoneCouncil();
  }, []);
  return (
    <>
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
          <title>Casptone council</title>
        </Helmet>
        <Title level={3} style={{ marginTop: 20, fontWeight: 500 }}>
          {/* Capstone Project Council List */}
        </Title>
        <div className="">
          <Button
            onClick={() => {
              window.open(defaultTemplate);
            }}
            style={{
              marginRight: 20,
            }}
            icon={<DownCircleFilled />}
          >
            {" "}
            Template CSV
          </Button>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Import CSV</Button>
          </Upload>
        </div>
      </div>
      <Spin spinning={loading} delay={500}>
        <Table
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelectedCapstoneCouncil(_dataResult[rowIndex]);
                navigate(
                  `/admin/capstone-council/${record["capstone_council_code"]}`
                );
              },
            };
          }}
          style={{ cursor: "pointer" }}
          columns={columns}
          dataSource={_data}
          rowKey={(record) => record["index"]}
          scroll={{ x: 1800 }}
        />
      </Spin>
    </>
  );
}

export default capstone_council;
