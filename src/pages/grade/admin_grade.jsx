import React, { useState } from "react";
import { Typography, Table, message, Row } from "antd";
import convertCSV from "../../utils/convertCSV/convertCSV";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  dataResultState,
  rowSelectedCapstoneCouncilState,
} from "../../../store/table/table";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase/firebase.utils";
import { useNavigate, useParams } from "react-router-dom";
import { DownloadOutlined } from "@ant-design/icons";
import capstoneTeamService from "../../services/capstone_team";
import { useEffect } from "react";
import moment from "moment";
function AdminGrade() {
  const [url, setUrl] = useState("");
  // State to store uploaded file
  const [file, setFile] = useState("");
  let { teamCode } = useParams();
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
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
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
      "Đỗ Trọng Đạt": 9,
    },
    {
      "Giảng viên": "HoangNT",
      "Quách Đại Lợi": 9,
      "Thân Thanh Duy": 8,
      "Nguyễn Đăng Khoa": 10,
      "Đỗ Trọng Đạt": 9,
    },
    {
      "Giảng viên": "AnNDH",
      "Quách Đại Lợi": 9,
      "Thân Thanh Duy": 8,
      "Nguyễn Đăng Khoa": 10,
      "Đỗ Trọng Đạt": 9,
    },
    {
      "Giảng viên": "KiemHH",
      "Quách Đại Lợi": 9,
      "Thân Thanh Duy": 8,
      "Nguyễn Đăng Khoa": 10,
      "Đỗ Trọng Đạt": 9,
    },
    {
      "Giảng viên": "Total",
      "Quách Đại Lợi": 9,
      "Thân Thanh Duy": 8,
      "Nguyễn Đăng Khoa": 10,
      "Đỗ Trọng Đạt": 9,
    },
  ];
  const { Title } = Typography;
  const [_data, _setData] = useState(data);
  const [_dataResult, _setDataResult] = useRecoilState(dataResultState);
  const columns = [
    {
      title: "Student",
      dataIndex: "name",
      key: "Student",
      width: 140,
      fixed: "left",
    },
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
      reader.onload = (e) => {
        const objectCSV = convertCSV(e.target.result);
        let objData = [];
        _setDataResult(objectCSV);
        objectCSV.forEach((item) => {
          objData.push(item.council);
        });
        _setData(objData);
      };
      reader.readAsText(file);
      return false;
    },
  };

  const setRowSelectedCapstoneCouncil = useSetRecoilState(
    rowSelectedCapstoneCouncilState
  );
  let navigate = useNavigate();
  const [_topic, _setTopic] = useState(null);
  const [_members, _setMembers] = useState(null);
  const [_reports, _setReports] = useState([]);
  const _fetchData = async () => {
    console.log(teamCode);
    var data = await capstoneTeamService.getDetailCaptoneTeams(teamCode);
    _setTopic(data.infor);
    _setMembers(data.members);
    _setReports(data?.reports);
    console.log(data);
    console.log(_topic);
    return data;
  };
  useEffect(() => {
    _fetchData();
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
        <Title level={2} style={{ marginTop: 20, fontWeight: 500 }}>
          {teamCode} -{_topic?.topic_name}
        </Title>

        {/* <div>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div> */}
      </div>
      <Typography.Paragraph
        style={{
          marginTop: "0px",
          marginBottom: "50px",
        }}
      >
        {_topic?.topic_description}
      </Typography.Paragraph>
      {_reports?.map((report) => {
        console.log(report);
        console.log(report.councils);
        let _columns = columns.concat(report.councils);
        console.log(_columns);
        _columns = _columns.concat({
          title: "Total Grade",
          dataIndex: "totalGrade",
          key: "stotal_grade",
          width: 140,
        });
        let _rows = [];
        report?.students.forEach((student) => {
          console.log(student);
          let row = {
            name: student.name,
          };
          student.marks?.forEach((mark) => {
            row[mark.grade_by] = mark.totalGrade;
            row["totalGrade"] = student.totalGrade;
          });
          _rows.push(row);
        });
        console.log("rows");
        console.log(_rows);
        return (
          <div>
            <Typography.Title
              level={3}
              style={{ marginTop: 20, fontWeight: 500 }}
            >
              {report.report_name} #{report.report_type}
            </Typography.Title>
            <Typography.Text>
              Date Graded:{" "}
              {report?.date_grade
                ? moment(report.date_grade).format("DD/MM/YYYY HH:mm")
                : "-"}
            </Typography.Text>
            <Table
              style={{ cursor: "pointer", marginTop: "10px" }}
              columns={_columns}
              rowKey={(record) => record["index"]}
              scroll={{ x: 1800 }}
              bordered
              dataSource={_rows}
              pagination={false}
            />
            <Row
              style={{
                padding: "20px 0px",
              }}
            >
              {report?.files.map((file) => {
                if (file.file_status) {
                  return (
                    <div
                      className="file"
                      onClick={() => {
                        window.open(file.file_path);
                      }}
                      style={{
                        border: "1px solid #ccc",
                        width: 200,
                        height: 150,
                        marginRight: "20px",
                        borderRadius: 5,
                        display: "block",
                        cursor: "pointer",
                        boxShadow:
                          "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "70%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <DownloadOutlined
                          style={{
                            fontSize: 50,
                            color: "#295294",
                          }}
                        />{" "}
                      </div>
                      <div
                        style={{
                          width: "100%",
                          height: "30%",
                          borderTop: "1px solid #ccc",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {file.file_name}
                      </div>
                    </div>
                  );
                }
              })}
            </Row>
          </div>
        );
      })}

      {/* <div style={{ marginTop: 30 }}>
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
      </div> */}
    </>
  );
}

export default AdminGrade;
