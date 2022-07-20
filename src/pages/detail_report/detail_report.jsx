import { Button, Space, Typography, Tag, message, Upload, Spin } from "antd";
import React, { useEffect, useState } from "react";
import "./index.scss";
const ROLE = 1;
import { InboxOutlined } from "@ant-design/icons";
import ROLES from "../../constant/role";
import moment from "moment";
import { UilPaperclip } from "@iconscout/react-unicons";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase/firebase.utils";
import { useNavigate, useParams } from "react-router-dom";
import reportService from "../../services/report";
import fileService from "../../services/file";

import { Helmet } from "react-helmet";
const { Dragger } = Upload;

import ROLESRE from "../../constant/roleRe";

const DetailReport = ({
  reportCode,
  roleUser,
  _report,
  fetchData,
  handleGrade,
  dateStart,
  dateEnd,
  dateGrade,
}) => {
  // const [_report, _setReport] = useState({});
  // const [roleUser, setRoleUser] = useState(null);
  const [_isEditting, _setIsEditting] = useState(false);
  const userAuth = JSON.parse(localStorage.getItem("data"));
  const roleTopic = JSON.parse(localStorage.getItem("roleTopic"));
  const [file, setFile] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();
  let navigate = useNavigate();
  let checkDateStart = moment(new Date()).isSameOrAfter(dateStart, "minute");
  let checkDateEnd = moment(new Date()).isSameOrBefore(dateEnd, "minute");
  let checkDateGrade = moment(new Date()).isSame(dateGrade, "day");
  // useEffect(() => {
  //   _fetchData(reportCode);
  // }, [reportCode]);

  // get detail report
  // const _fetchData = async code => {
  //   const result = await reportService.getDetailReportByReportCode(code);
  //   const roleU = roleTopic.find(tp => tp.topic_code === result.topic.code);
  //   console.log("37", _roleUser);
  //   console.log("38", report);
  //   setRoleUser(_roleUser);
  //   _setReport(report);
  // };

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
        setLoading(false);
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
              code: reportCode,
              path: url,
              name: file.name,
              type,
            };
            console.log("info file", infoFile);
            return infoFile;
          })
          .then(infoFile => {
            const res = fileService.submitFile(infoFile);
            return res;
          })
          .then(res => {
            // _fetchData(reportCode);
            fetchData();
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
      authorization: "authorization-text",
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
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: percent => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
    beforeUpload: file => {
      setFile(file);
      return false;
    },
  };

  return (
    <Spin spinning={loading} delay={500}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Report Detail - {reportCode.toUpperCase()}</title>
      </Helmet>
      <div style={{ marginTop: 30 }}>
        <div className="submission_status">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Typography.Title
              style={{
                fontWeight: "400",
              }}
              level={3}
            >
              Submission status
            </Typography.Title>
            {[ROLES.CHAIRMAN, ROLES.MEMBERCOUNCIL, ROLES.SECRETARY].includes(
              roleUser
            ) && (
              <Button
                type="primary"
                style={{
                  backgroundColor: "#ffccc7",
                  color: "#a8071a",
                  border: "2px solid #a8071a",
                  borderRadius: 5,
                }}
                onClick={() => handleGrade()}
              >
                Grade Team
              </Button>
            )}
          </div>
          <table>
            <tbody>
              <tr>
                <th>Submission status</th>
                <td>
                  {_report.report?.submit_date ? (
                    <Tag color="green">Attempt</Tag>
                  ) : (
                    <Tag color="gold">No attempt</Tag>
                  )}
                </td>
              </tr>
              {[ROLES.LEADER, ROLES.MEMBER, ROLES.STUDENT].includes(
                roleUser
              ) && (
                <tr>
                  <th>Grade</th>
                  <td scope="row">
                    {_report?.grades?.totalGrade
                      ? _report?.grades?.totalGrade
                      : "Not grade"}
                  </td>
                </tr>
              )}
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
                <th>Attach file document</th>
                <td scope="row">
                  {_report?.submition?.map((item, index) => {
                    if (item.type === true) {
                      return (
                        <div key={index}>
                          <a
                            href={item.path}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <UilPaperclip size="14" />
                            <span>{item.name}</span>
                          </a>
                        </div>
                      );
                    }
                  })}
                </td>
              </tr>
              <tr>
                <th>Attach file meeting</th>
                <td scope="row">
                  {_report?.submition?.map((item, index) => {
                    if (item.type === false) {
                      return (
                        <div key={index}>
                          <a
                            href={item.path}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <UilPaperclip size="14" />
                            <span>{item.name}</span>
                          </a>
                        </div>
                      );
                    }
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {[ROLES.LEADER, ROLES.MEMBER].includes(roleUser) &&
          checkDateEnd &&
          checkDateStart && (
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
                  onClick={handleUpload}
                  style={{
                    backgroundColor: "#00796a",
                    color: "#fff",
                    height: "45px",
                    width: "150px",
                    borderRadius: "10px",
                    fontSize: 16,
                    marginTop: "20px",
                  }}
                >
                  {_report.report?.submit_date ? "Save changes" : "Submit"}
                </Button>
              </div>
            </div>
          )}
        {[ROLES.SECRETARY].includes(roleUser) && checkDateGrade && (
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
                onClick={handleUpload}
                style={{
                  backgroundColor: "#00796a",
                  color: "#fff",
                  height: "45px",
                  width: "150px",
                  borderRadius: "10px",
                  fontSize: 16,
                  marginTop: "20px",
                }}
              >
                {_report.report?.submit_date ? "Save changes" : "Submit"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Spin>
  );
};
export default DetailReport;
