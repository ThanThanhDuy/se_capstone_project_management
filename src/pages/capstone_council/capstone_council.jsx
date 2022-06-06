import React from "react";
import { Typography, Table, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import convertCSV from "../../utils/convertCSV/convertCSV";
import { useRecoilState } from "recoil";
import { dataCapstoneCouncilState } from "../../../store/table/table";

function capstone_council() {
  const { Title } = Typography;
  const [_data, _setData] = useRecoilState(dataCapstoneCouncilState);

  const columns = [
    {
      title: "Code Council",
      dataIndex: "code",
      key: "code",
      width: 100,
      fixed: "left",
      render: text => <a>{text}</a>
    },
    {
      title: "Semeter",
      dataIndex: "semeter",
      key: "semeter",
      width: 80,
      fixed: "left"
    },
    {
      title: "Chairman",
      dataIndex: "chairman",
      key: "mentor1",
      width: 180
    },
    {
      title: "Secretary",
      dataIndex: "secretary",
      key: "mentor2",
      width: 180
    },
    {
      title: "Member 1",
      dataIndex: "member1",
      key: "member",
      width: 180
    },
    {
      title: "Member 2",
      dataIndex: "member2",
      key: "member2",
      width: 180
    },
    {
      title: "Member 3",
      dataIndex: "member3",
      key: "member3",
      width: 180
    },
    {
      title: "Member 4",
      dataIndex: "member4",
      key: "member4",
      width: 180
    }
  ];

  const key = [
    "code",
    "semeter",
    "chairman",
    "secretary",
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
        columns={columns}
        dataSource={_data}
        rowKey={obj => obj.code}
        scroll={{ x: 1800 }}
      />
    </>
  );
}

export default capstone_council;
