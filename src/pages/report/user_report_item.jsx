import React from "react";
import "../report/user_report.scss";
import { Avatar, Card, Col, Divider, Row, Typography } from "antd";
import {
  BookOutlined,
  CheckOutlined,
  WechatOutlined,
  LockOutlined
} from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { UilArrowRight, UilExclamationOctagon } from "@iconscout/react-unicons";
function UserReportItem(props) {
  let params = useParams();
  const { report } = props;
  console.log(report);
  return (
    // <div
    //   key={report.id}
    //   className="report_item"
    //   style={{
    //     display: "flex",
    //     gap: 10,
    //     marginBottom: 20,
    //     boxShadow:
    //       "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
    //     padding: "20px 30px",
    //     borderRadius: 10,
    //     backgroundColor: "#fff"
    //   }}
    // >
    //   {/* <div className="report_item--left">
    //     <Avatar
    //       size={32}
    //       icon={<BookOutlined />}
    //       style={{ background: "#2a5699" }}
    //     />
    //   </div> */}
    //   <div className="report_item--right">
    //     <div className="report_item--title">
    //       <Link
    //         to={`/user/report/${report.id}/detail/${report.code}`}
    //         style={{ fontSize: 20, color: "#0065cc" }}
    //       >
    //         {report.name} - {params.capstoneTeamId} -{" "}
    //         <span style={{ color: "#d4380d" }}>
    //           {moment(report.date_grade).format("YYYY MMM DD HH:mm")}
    //         </span>
    //       </Link>
    //     </div>
    // <div
    //   className={
    //     report.submit_date
    //       ? "report_item--submit"
    //       : "report_item--notsubmit"
    //   }
    // >
    //   {report.submit_date ? (
    //     <>
    //       <div>
    //         <CheckOutlined />
    //         <span>
    //           Submit{" "}
    //           <span style={{ textDecoration: "underline", marginLeft: 10 }}>
    //             {moment(report.submit_date).format("YYYY MMM DD - HH:mm")}
    //           </span>
    //         </span>
    //       </div>
    //     </>
    //   ) : (
    //     <>
    //       <div>
    //         <LockOutlined />
    //         <span>Not Submit </span>
    //         <span></span>
    //       </div>
    //     </>
    //   )}
    // </div>
    //     {!report.submit_date && (
    //       <div style={{ marginBottom: 10 }}>
    //         <span>
    //           <span>Deadline submit from </span>
    //           <span
    //             style={{
    //               textDecoration: "underline",
    //               marginLeft: 10,
    //               marginRight: 10
    //             }}
    //           >
    //             {moment(report.start_at).format("YYYY MMM DD - HH:mm")}
    //           </span>
    //           {" to "}
    //           <span style={{ textDecoration: "underline", marginLeft: 10 }}>
    //             {moment(report.end_at).format("YYYY MMM DD - HH:mm")}
    //           </span>
    //         </span>
    //       </div>
    //     )}

    //     <div className="report_item--feedback">
    //       <WechatOutlined />
    //       <span>Feedback</span>
    //     </div>
    //   </div>
    // </div>
    <Card
      className="card"
      extra={
        <div
          className={
            report.submit_date
              ? "report_item--submit"
              : "report_item--notsubmit"
          }
          style={{ display: "flex", alignItems: "center", marginBottom: 68 }}
        >
          {report.submit_date ? (
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
                fontWeight: 400
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
              gap: 5
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
        marginBottom: 30
      }}
    >
      <Row>
        <Col span={4}>
          <div>
            <div style={{ marginBottom: 3 }}>
              <span style={{ fontSize: 14, opacity: 0.7 }}>Submit</span>
            </div>
            <div>
              <span style={{ fontSize: 16 }}>
                {report.submit_date ? (
                  <span style={{ color: "#1ea53d" }}>
                    {moment(report.submit_date).format("YYYY MMM DD - HH:mm")}
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
            height: 50
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
                justifyContent: "center"
              }}
            >
              <p
                style={{
                  fontSize: 16,
                  marginRight: 5,
                  marginBottom: 0,
                  textDecoration: "underline"
                }}
              >
                {moment(report.start_at).format("YYYY MMM DD - HH:mm")}
              </p>
              <UilArrowRight />
              <p
                style={{
                  fontSize: 16,
                  margin: 0,
                  marginLeft: 5,
                  textDecoration: "underline"
                }}
              >
                {moment(report.end_at).format("YYYY MMM DD - HH:mm")}
              </p>
            </div>
          </div>
        </Col>
        <Divider
          style={{
            borderLeft: "2px solid rgba(0,0,0,0.5)",
            borderRadius: 5,
            height: 50
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
                justifyContent: "center"
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
                  color: "#c93745"
                }}
              >
                <span>
                  {moment(report.start_at).format("YYYY MMM DD - HH:mm")}
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
            height: 50
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
    </Card>
  );
}

export default UserReportItem;
