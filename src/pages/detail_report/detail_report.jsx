import { Button, Space, Typography, Tag, message, Upload, Spin } from "antd";
import React, { useEffect, useState } from "react";
import "./index.scss";
const ROLE = 1;
import { InboxOutlined } from "@ant-design/icons";
import ROLES from "../../constant/role";
import moment from "moment";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase/firebase.utils";
import { useNavigate, useParams } from "react-router-dom";
import reportService from "../../services/report";
import fileService from "../../services/file";
import { Helmet } from "react-helmet";
const { Dragger } = Upload;

const DetailReport = () => {
  const [_report, _setReport] = useState({});
  const [_isEditting, _setIsEditting] = useState(false);
  const userAuth = JSON.parse(localStorage.getItem("data"));
  const [file, setFile] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    _fetchData(params.reportCode);
  }, [params.reportCode]);

  // get detail report
  const _fetchData = async code => {
    const result = await reportService.getDetailReportByReportCode(code);
    console.log(result);
    _setReport(result);
  };

  const handleUpload = async () => {
    setLoading(true);
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      error => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(downloadURL => {
            return downloadURL;
          })
          .then(url => {
            let type = false; // teacher
            if (
              userAuth.User.Roles.find(user =>
                [ROLES.STUDENT].includes(user.RoleId)
              )
            ) {
              type = true; //student
            }
            const infoFile = {
              code: params.reportCode,
              path: url,
              name: file.name,
              type
            };
            return infoFile;
          })
          .then(infoFile => {
            return fileService.submitFile(infoFile);
          })
          .then(res => {
            _fetchData(params.reportCode);
            console.log(res);
            setLoading(false);
          });
      }
    );
  };

  const props = {
    name: "file",
    action: "http://localhost:3000/",
    headers: {
      authorization: "authorization-text"
    },

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

    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068"
      },
      strokeWidth: 3,
      format: percent => percent && `${parseFloat(percent.toFixed(2))}%`
    },
    beforeUpload: file => {
      setFile(file);
      return false;
    }
  };

  return (
    <Spin spinning={loading} delay={500}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Report Detail - {params.reportCode}</title>
      </Helmet>
      <div
        style={{
          padding: 10,
          maxWidth: "900px"
        }}
      >
        <Space>
          <Typography.Title level={2}>{_report.topic?.name}</Typography.Title>
        </Space>
        <Typography.Paragraph
          style={{
            marginTop: "20px"
          }}
        >
          {_report.topic?.description}
        </Typography.Paragraph>
        <div className="submission_status">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10
            }}
          >
            <Typography.Title
              style={{
                fontWeight: "400"
              }}
              level={3}
            >
              Submission status
            </Typography.Title>
            <Button
              type="primary"
              style={{
                backgroundColor: "#ffccc7",
                color: "#a8071a",
                border: "1px solid #a8071a"
              }}
              onClick={() =>
                navigate(`/user/lecture-grade/${params.reportCode}`)
              }
            >
              Grade Team
            </Button>
          </div>
          <table>
            <tbody>
              <tr>
                <th>Submission status</th>
                <td>
                  {_report.report?.submit_date ? (
                    <Tag color="green">Attempt</Tag>
                  ) : (
                    <Tag color="volcano">No attempt</Tag>
                  )}
                </td>
              </tr>
              <tr>
                <th>Grading status</th>
                <td scope="row">Not graded</td>
              </tr>
              <tr>
                <th>Last modified</th>
                <td scope="row">
                  {_report.report?.submit_date
                    ? moment(_report.report.submit_date).format(
                        "DD/MM/YYYY HH:mm"
                      )
                    : "-"}
                </td>
              </tr>
              <tr>
                <th>Attach file</th>
                <td scope="row">
                  {_report?.submition?.map((item, index) => {
                    if (
                      item.type === true &&
                      userAuth?.User?.Roles?.find(role =>
                        [ROLES.STUDENT]?.includes(role.RoleId)
                      )
                    ) {
                      return (
                        <div key={index}>
                          <a href={item.path}>{item.name}</a>
                        </div>
                      );
                    }
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* check add submit */}
        <div style={{ marginTop: 30 }}>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. If you have more, you can
              compress file zip
            </p>
          </Dragger>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="primary"
              onClick={handleUpload}
              style={{
                backgroundColor: "#00796a",
                marginTop: "20px",
                border: "none"
              }}
            >
              {_report.report?.submit_date ? "Save changes" : "Submit"}
            </Button>
          </div>
        </div>
        {/* <EditSubmit /> */}
        {/* <div
        style={{
          marginTop: "20px"
        }}
        className="feedback"
      >
        <SubmitGradeForm />
      </div> */}
      </div>
    </Spin>
  );
};
export default DetailReport;
