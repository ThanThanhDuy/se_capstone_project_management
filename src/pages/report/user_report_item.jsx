import React from "react";
import "../report/user_report.scss";
import { Avatar } from "antd";
import {
  BookOutlined,
  CheckOutlined,
  WechatOutlined,
  LockOutlined
} from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

function UserReportItem(props) {
  let params = useParams();
  const { report } = props;
  console.log(report);
  return (
    <div
      key={report.id}
      className="report_item"
      style={{
        display: "flex",
        gap: 10,
        marginBottom: 20,
        boxShadow: "0px 0px 10px #ccc",
        padding: "20px 30px",
        borderRadius: 5
      }}
    >
      <div className="report_item--left">
        <Avatar
          size={32}
          icon={<BookOutlined />}
          style={{ background: "#2a5699" }}
        />
      </div>
      <div className="report_item--right">
        <div className="report_item--title">
          <Link
            to={`/user/report/${report.id}/detail/${report.code}`}
            style={{ fontSize: 20, color: "#0065cc" }}
          >
            {report.name} - {params.capstoneTeamId}
          </Link>
        </div>
        <div
          className={
            report.submit_date
              ? "report_item--submit"
              : "report_item--notsubmit"
          }
        >
          {report.submit_date ? (
            <>
              <div>
                <CheckOutlined />
                <span>
                  Submit{" "}
                  <span style={{ textDecoration: "underline", marginLeft: 10 }}>
                    {moment(report.submit_date).format("YYYY MMM DD - HH:mm")}
                  </span>
                </span>
              </div>
            </>
          ) : (
            <>
              <div>
                <LockOutlined />
                <span>Not Submit </span>
                <span></span>
              </div>
            </>
          )}
        </div>
        {!report.submit_date && (
          <div style={{ marginTop: 5, marginBottom: 10 }}>
            <span>
              <span>Deadline from </span>
              <span
                style={{
                  textDecoration: "underline",
                  marginLeft: 10,
                  marginRight: 10
                }}
              >
                {moment(report.start_at).format("YYYY MMM DD - HH:mm")}
              </span>
              {" to "}
              <span style={{ textDecoration: "underline", marginLeft: 10 }}>
                {moment(report.end_at).format("YYYY MMM DD - HH:mm")}
              </span>
            </span>
          </div>
        )}
        <div className="report_item--feedback">
          <WechatOutlined />
          <span>Feedback</span>
        </div>
      </div>
    </div>
  );
}

export default UserReportItem;
