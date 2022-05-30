import { Button, Divider, Space, Typography } from "antd";
import React, { useState } from "react";
import "./index.css";

const dataExample = {
  title: "Hướng dẫn đồ án tốt nghiệp",
  description: `Bố em tên là Nguyễn Hải Nam. Bố em năm nay đã 41 tuổi. Bố em làm nghề Marketing về ngành tự động hóa. Bố em hơi gầy nhưng trắng trẻo lại rất đẹp trai.

  Nhìn bề ngoài thì bố em rất khó tính và nghiêm khắc, nhưng thật ra thì lại rất dễ tính và tốt bụng. Mái tóc bố em đen nháy nhưng hơi dài và rẽ ngôi nhìn rất đẹp.
  
  Do tính chất công việc nên bố em đi làm từ rất sớm và về nhà cũng khá muộn. Tối nào cũng vậy, sau khi mẹ dạy em học bài xong thì bố em cũng đi làm về, lúc đó cũng đã gần 7 giờ tối. Em chạy ra ôm chầm lấy bố và hôn lấy hôn để. Bố em vào ra rồi đi tắm giặt, trong lúc đó, hai mẹ con em cùng nhau dọn mâm cơm ấm cúng để cùng nhau vui vẻ dùng bữa cơm tối. Vào thứ bảy, chủ nhật, bố em không phải đi gặp khách hàng thì bố luôn bên em chơi trò chơi, bố dạy em học tập cũng như ru em ngủ nữa đấy.
  
  Gia đình em luôn hạnh phúc và tràn ngập tiếng cười. Em luôn tự hứa với bản thân mình: phải cố gắng chăm ngoan học giỏi để không phụ lòng cha mẹ.
  
  Em rất yêu bố mẹ của mình!`,
  start_at: "",
  end_at: "",
};

const ROLE = 1;

import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

const DetailReport = () => {
  const [_report, _setReport] = useState(dataExample);
  return (
    <div
      style={{
        padding: 10,
        maxWidth: "900px",
      }}
    >
      <Space>
        <Typography.Title level={2}>{_report.title}</Typography.Title>
      </Space>
      <Typography.Paragraph
        style={{
          marginTop: "20px",
        }}
      >
        {_report.description}
      </Typography.Paragraph>
      <div className="submission_status">
        <Typography.Title
          style={{
            fontWeight: "400",
          }}
          level={3}
        >
          Submission status
        </Typography.Title>
        <table>
          <tbody>
            <tr>
              <th>Submission status</th>
              <td>No attempt</td>
            </tr>
            <tr>
              <th>Grading status</th>
              <td scope="row">Not graded</td>
            </tr>
            <tr>
              <th>Last modified</th>
              <td scope="row">-</td>
            </tr>
            <tr>
              <th>Submission comments</th>
              <td scope="row">-</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* check add submit */}
      <div
        style={{
          marginTop: "20px",
        }}
        className="feedback"
      >
        <Typography.Title
          style={{
            fontWeight: "400",
          }}
          level={3}
        >
          Feedback
        </Typography.Title>
        <table>
          <tbody>
            <tr>
              <th>Grade</th>
              <td>7.6</td>
            </tr>
            <tr>
              <th>Grade on</th>
              <td scope="row">Not graded</td>
            </tr>
            <tr>
              <th>Graded by</th>
              <td scope="row">-</td>
            </tr>
            <tr>
              <th>Feebacks comments</th>
              <td scope="row">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default DetailReport;

const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",

  onChange(info) {
    const { status } = info.file;

    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }

    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },

  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const EditSubmit = () => {
  return (
    <div style={{ margin: "20px 0" }} className="submission">
      <form>
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
        <div style={{ justifyContent: "center", display: "flex" }}>
          <Button
            style={{
              backgroundColor: "#00796a",
              marginTop: "20px",
              border: "none",
            }}
            type="primary"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
