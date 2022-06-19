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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase/firebase.utils";
import { Link, useNavigate } from "react-router-dom";
import { DownloadOutlined } from "@ant-design/icons";
function AdminGrade() {
  const [url, setUrl] = useState("");
  // State to store uploaded file
  const [file, setFile] = useState("");

  // progress
  const [percent, setPercent] = useState(0);

  // Handle file upload event and update state
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/files/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      snapshot => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      err => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          console.log("URL: ", url);
          setUrl(url);
        });
      }
    );
  };
  const data = [
    {
      "Giảng viên": "TaiNT",
      "Quách Đại Lợi": 9,
      "Thân Thanh Duy": 8,
      "Nguyễn Đăng Khoa": 10,
      "Đỗ Trọng Đạt": 9
    },
    {
      "Giảng viên": "HoangNT",
      "Quách Đại Lợi": 9,
      "Thân Thanh Duy": 8,
      "Nguyễn Đăng Khoa": 10,
      "Đỗ Trọng Đạt": 9
    },
    {
      "Giảng viên": "AnNDH",
      "Quách Đại Lợi": 9,
      "Thân Thanh Duy": 8,
      "Nguyễn Đăng Khoa": 10,
      "Đỗ Trọng Đạt": 9
    },
    {
      "Giảng viên": "KiemHH",
      "Quách Đại Lợi": 9,
      "Thân Thanh Duy": 8,
      "Nguyễn Đăng Khoa": 10,
      "Đỗ Trọng Đạt": 9
    },
    {
      "Giảng viên": "Total",
      "Quách Đại Lợi": 9,
      "Thân Thanh Duy": 8,
      "Nguyễn Đăng Khoa": 10,
      "Đỗ Trọng Đạt": 9
    }
  ];
  const { Title } = Typography;
  const [_data, _setData] = useState(data);
  const [_dataResult, _setDataResult] = useRecoilState(dataResultState);
  const setRowSelectedCapstoneCouncil = useSetRecoilState(
    rowSelectedCapstoneCouncilState
  );
  let navigate = useNavigate();

  const columns = [
    {
      title: "Giảng viên",
      dataIndex: "Giảng viên",
      key: "Giảng viên",
      width: 140,
      fixed: "left"
    },
    {
      title: "Quách Đại Lợi",
      dataIndex: "Quách Đại Lợi",
      key: "Quách Đại Lợi",
      width: 100,
      fixed: "left"
    },
    {
      title: "Thân Thanh Duy",
      dataIndex: "Thân Thanh Duy",
      key: "Thân Thanh Duy",
      width: 100
    },
    {
      title: "Nguyễn Đăng Khoa",
      dataIndex: "Nguyễn Đăng Khoa",
      key: "Nguyễn Đăng Khoa",
      width: 100
    },
    {
      title: "Đỗ Trọng Đạt",
      dataIndex: "Đỗ Trọng Đạt",
      key: "Đỗ Trọng Đạt",
      width: 100
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
        {/* <div>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div> */}
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
        pagination={false}
      />
      {/* <div>
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload to Firebase</button>
        <p>{percent} "% done"</p>
      </div> */}
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
    </>
  );
}

export default AdminGrade;
