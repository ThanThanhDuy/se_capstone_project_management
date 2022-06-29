import { Form, Input, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import UserReportItem from "./user_report_item";
import moment from "moment";
import reportService from "../../services/report";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

function UserReport() {
  const params = useParams();
  const [form] = Form.useForm();

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
      timeEnd: dateEnd
    };
    _setReports([..._reports, newReport]); // add new report
    form.resetFields();
    _setOpenDialogAdd(false);
  };

  const _onReset = () => {
    form.resetFields();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px"
      }}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>Report - {params.capstoneTeamId}</title>
      </Helmet>
      <div className="report" style={{ width: "100%", marginRight: 30 }}>
        {_reports &&
          _reports.map(report => (
            <UserReportItem key={report.id} report={report} />
          ))}
        {/* {_openDialogAdd && (
          <Form form={form} name="control-hooks" onFinish={_onFinish}>
            <div
              key={_reports.length + 1}
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
              <div className="report_item--right" style={{ width: "100%" }}>
                <Form.Item
                  name="subject"
                  style={{ marginBottom: 10 }}
                  rules={[{ required: true, message: "Please input subject!" }]}
                >
                  <Input
                    style={{ fontSize: 16, width: "100%" }}
                    placeholder="Subject"
                  />
                </Form.Item>
                <Form.Item
                  name="content"
                  style={{ marginBottom: 10 }}
                  rules={[{ required: true, message: "Please input detail!" }]}
                >
                  <TextArea rows={4} placeholder="Content" />
                </Form.Item>
                <Form.Item
                  name="date"
                  style={{ marginBottom: 30 }}
                  rules={[{ required: true, message: "Please choose date!" }]}
                >
                  <RangePicker
                    showTime={{
                      format: "HH:mm"
                    }}
                    format="YYYY-MM-DD HH:mm"
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <Button
                    htmlType="button"
                    onClick={_onReset}
                    style={{ marginLeft: 10 }}
                  >
                    Reset
                  </Button>
                  <Button
                    style={{ marginLeft: 10 }}
                    onClick={() => _setOpenDialogAdd(false)}
                  >
                    Cancel
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        )} */}
        {/* add item */}
        {/* <div className="report_add">
          <div
            style={{
              display: "flex",
              gap: 5,
              alignItems: "center",
              justifyContent: "center"
            }}
            onClick={() => _setOpenDialogAdd(true)}
          >
            {!_openDialogAdd && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ background: "#00796a", border: "none" }}
              >
                Add report
              </Button>
            )}
          </div>
        </div> */}
      </div>
      <div style={{ width: 350, height: "80vh" }}></div>
    </div>
  );
}

export default UserReport;
