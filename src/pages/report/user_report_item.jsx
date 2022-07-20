import React, { useState } from "react";
import "../report/user_report.scss";
import { Avatar, Card, Col, Divider, Row, Space, Typography } from "antd";
import {
  BookOutlined,
  CheckOutlined,
  WechatOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { UilArrowRight, UilExclamationOctagon } from "@iconscout/react-unicons";
import DetailReport from "../detail_report/detail_report";
import { useEffect } from "react";
import reportService from "../../services/report";

function UserReportItem(props) {
  let params = useParams();
  const { report } = props;
  const roleTopic = JSON.parse(localStorage.getItem("roleTopic"));
  const [_report, _setReport] = useState({});
  const [roleUser, setRoleUser] = useState(null);
  let navigate = useNavigate();

  const fetchData = async () => {
    const result = await reportService.getDetailReportByReportCode(report.code);
    const roleU = roleTopic.find(tp => tp.topic_code === result.topic.code);
    setRoleUser(roleU.role);
    _setReport(result);
  };

  const handleGrade = () => {
    let reportGrade = {
      capstoneTeamId: params.capstoneTeamId,
      reportCode: report.code,
      reportType: report.type,
      reportName: report.name,
      reportDescription: report.description,
      topicDescription: _report.topic.description,
      topicCode: _report.topic.code,
      topicName: _report.topic.name,
    };
    localStorage.setItem("reportGrade", JSON.stringify(reportGrade));
    navigate(`/user/lecture-grade/${report.code}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card
      className="card"
      extra={
        <div
          className={
            _report?.report?.submit_date
              ? "report_item--submit"
              : "report_item--notsubmit"
          }
          style={{ display: "flex", alignItems: "center", marginBottom: 68 }}
        >
          {_report?.report?.submit_date ? (
            <>
              <div>
                <CheckOutlined />
                <span style={{ marginLeft: 5 }}>Submited</span>
              </div>
            </>
          ) : (
            <>
              <div>
                <LockOutlined />
                <span style={{ marginLeft: 5 }}>Not Submit </span>
              </div>
            </>
          )}
        </div>
      }
      title={
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            className="report_item--title"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Link
              to={`/user/report/${report.id}/detail/${report.code}`}
              style={{
                fontSize: 13,
                color: "#008172",
                backgroundColor: "#deeeec",
                padding: "2px 5px",
                borderRadius: 5,
                fontWeight: 400,
              }}
            >
              {params.capstoneTeamId} -{" "}
              <span>{report.code?.toUpperCase()}</span>
            </Link>
          </div>
          <div
            style={{
              marginTop: 5,
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <div style={{ fontSize: 20, color: "#44494d" }}>#{report.type}</div>
            <Link
              to={`/user/report/${report.id}/detail/${report.code}`}
              style={{ fontSize: 20, color: "#44494d" }}
            >
              {report.name}
            </Link>
          </div>
          {/* <p className="card_description">{report.description}</p> */}
          <div className="card_description">{report.description}</div>
        </div>
      }
      style={{
        borderRadius: 10,
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
        marginBottom: 30,
      }}
    >
      <div style={{ marginBottom: 5 }}></div>
      <Space>
        <Typography.Title
          level={4}
          style={{ display: "flex", alignItems: "center" }}
        >
          Topic: {_report.topic?.name}
          <span
            style={{
              fontSize: 16,
              color: "#008172",

              padding: "5px 10px",
              borderRadius: 5,
              fontWeight: 400,
              marginLeft: 5,
            }}
          >
            <span>{_report.topic?.code?.toUpperCase()}</span>
          </span>
        </Typography.Title>
      </Space>
      <Typography.Paragraph
        style={{
          marginTop: "0px",
          marginBottom: "50px",
        }}
      >
        {_report.topic?.description}
      </Typography.Paragraph>
      <Row>
        <Col span={4}>
          <div>
            <div style={{ marginBottom: 3 }}>
              <span style={{ fontSize: 14, opacity: 0.7 }}>Submit</span>
            </div>
            <div>
              <span style={{ fontSize: 16 }}>
                {_report?.report?.submit_date ? (
                  <span style={{ color: "#1ea53d" }}>
                    {moment(_report?.report?.submit_date).format(
                      "DD/MM/YYYY - HH:mm"
                    )}
                  </span>
                ) : (
                  <span style={{ color: "#caa20c" }}>Not yet</span>
                )}
              </span>
            </div>
          </div>
        </Col>
        <Divider
          style={{
            borderLeft: "2px solid rgba(0,0,0,0.5)",
            borderRadius: 5,
            height: 50,
          }}
          type="vertical"
        />

        <Col span={9}>
          <div style={{ textAlign: "center" }}>
            <div style={{ marginBottom: 3 }}>
              <span style={{ fontSize: 14, opacity: 0.7 }}>Deadline</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  fontSize: 16,
                  marginRight: 5,
                  marginBottom: 0,
                  textDecoration: "underline",
                }}
              >
                {moment(report.start_at).format("DD/MM/YYYY - HH:mm")}
              </p>
              <UilArrowRight />
              <p
                style={{
                  fontSize: 16,
                  margin: 0,
                  marginLeft: 5,
                  textDecoration: "underline",
                }}
              >
                {moment(report.end_at).format("DD/MM/YYYY - HH:mm")}
              </p>
            </div>
          </div>
        </Col>
        <Divider
          style={{
            borderLeft: "2px solid rgba(0,0,0,0.5)",
            borderRadius: 5,
            height: 50,
          }}
          type="vertical"
        />
        <Col span={6}>
          <div style={{ textAlign: "center" }}>
            <div style={{ marginBottom: 3 }}>
              <span style={{ fontSize: 14, opacity: 0.7 }}>
                Project grading date
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  fontSize: 16,
                  marginRight: 5,
                  marginBottom: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  color: "#c93745",
                }}
              >
                <span>
                  {moment(report.date_grade).format("DD/MM/YYYY - HH:mm")}
                </span>

                <UilExclamationOctagon />
              </p>
            </div>
          </div>
        </Col>
        <Divider
          style={{
            borderLeft: "2px solid rgba(0,0,0,0.5)",
            borderRadius: 5,
            height: 50,
          }}
          type="vertical"
        />
        <Col span={3} style={{ width: "100%" }}>
          <div className="report_item--feedback">
            <WechatOutlined />
            <span>Feedback</span>
          </div>
        </Col>
      </Row>
      <DetailReport
        dateStart={report.start_at}
        dateEnd={report.end_at}
        dateGrade={report.date_grade}
        reportCode={report.code}
        roleUser={roleUser}
        _report={_report}
        fetchData={fetchData}
        handleGrade={handleGrade}
      />
    </Card>
  );
}

export default UserReportItem;
