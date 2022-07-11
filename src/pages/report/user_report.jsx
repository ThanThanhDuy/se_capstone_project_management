import { Form, Input, DatePicker, PageHeader } from "antd";
import React, { useEffect, useState } from "react";
import UserReportItem from "./user_report_item";
import moment from "moment";
import reportService from "../../services/report";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

function UserReport() {
  const params = useParams();
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const [_openDialogAdd, _setOpenDialogAdd] = useState(false);
  const [_reports, _setReports] = useState(null);
  const [model, setModel] = useState("hello");
  const handleModelChange = model => {
    setModel(model);
  };
  useEffect(() => {
    _fecthData(params.capstoneTeamId);
  }, []);

  const _fecthData = async code => {
    const result = await reportService.getReportByCapstoneTeamCode(code);
    console.log(result);
    _setReports(result);
  };
  const _onFinish = values => {
    console.log(values);
    const { subject, content, date } = values;
    const dateStart = moment(date[0]).format();
    const dateEnd = moment(date[1]).format();
    const newReport = {
      id: _reports.length + 1,
      title: subject,
      content: content,
      dateSubmitted: "",
      statusSubmmission: false,
      timeStart: dateStart,
      timeEnd: dateEnd,
    };
    _setReports([..._reports, newReport]); // add new report
    form.resetFields();
    _setOpenDialogAdd(false);
  };

  const _onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <PageHeader
        style={{ padding: "16px 30px 0px" }}
        onBack={() => navigate("/user/home")}
        title="Home"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <Helmet>
          <meta charSet="utf-8" />
          <title>Report - {params.capstoneTeamId}</title>
        </Helmet>

        <div className="report" style={{ width: "100%", marginRight: 30 }}>
          {_reports &&
            _reports?.map(report => (
              <UserReportItem key={report.id} report={report} />
            ))}
        </div>
        {/* <div style={{ width: 350, height: "80vh" }}></div> */}
      </div>
    </>
  );
}

export default UserReport;
