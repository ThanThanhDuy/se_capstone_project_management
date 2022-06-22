import React, { useEffect, useState } from "react";
import { Typography, Table, Button, message, Upload, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import convertCSV from "../../utils/convertCSV/convertCSV";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  dataCapstoneCouncilState,
  dataResultState,
  rowSelectedCapstoneCouncilState
} from "../../../store/table/table";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function capstone_council() {
  const { Title } = Typography;
  const [_data, _setData] = useRecoilState(dataCapstoneCouncilState);
  const [_dataResult, _setDataResult] = useRecoilState(dataResultState);
  const setRowSelectedCapstoneCouncil = useSetRecoilState(
    rowSelectedCapstoneCouncilState
  );
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const columns = [
    {
      title: "Council Id",
      dataIndex: "capstone_council_code",
      key: "capstone_council_code",
      width: 100,
      fixed: "left",
      render: text => <Link to={`/admin/capstone-council/${text}`}>{text}</Link>
    },
    {
      title: "Semester",
      dataIndex: "semeter_name",
      key: "semeter_name",
      width: 80,
      fixed: "left"
    },
    {
      title: "Chairperson",
      dataIndex: "chairman",
      key: "chairman",
      width: 180
    },
    {
      title: "Secretary",
      dataIndex: "secretary",
      key: "secretary",
      width: 180
    },
    {
      title: "Members",
      dataIndex: "member",
      key: "member",
      width: 180
    }
  ];
  async function getCaptoneCouncil() {
    const res = await axios.get(
      "http://localhost:8081/admin/get-captone-council"
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
      reader.onload = async e => {
        const objectCSV = convertCSV(e.target.result);
        // console.log(objectCSV);
        const res = await axios.post(
          "http://localhost:8081/admin/insert-capstone-council",
          {
            data: objectCSV
          }
        );
        if (res.data.code === 200) {
          setLoading(true);
          getCaptoneCouncil();
        }
      };
      reader.readAsText(file);
      return false;
    }
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
      <Spin spinning={loading} delay={500}>
        <Table
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                setRowSelectedCapstoneCouncil(_dataResult[rowIndex]);
                navigate(
                  `/admin/capstone-council/${record["capstone_council_code"]}`
                );
              }
            };
          }}
          style={{ cursor: "pointer" }}
          columns={columns}
          dataSource={_data}
          rowKey={record => record["index"]}
          scroll={{ x: 1800 }}
        />
      </Spin>
    </>
  );
}

export default capstone_council;
