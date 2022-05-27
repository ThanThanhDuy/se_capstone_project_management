import React from "react";
import { Form, Input, Typography, Breadcrumb } from "antd";
import AddForm from "./add.form";

const AddExaminationCouncil = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Application Center</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Application List</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>An Application</Breadcrumb.Item>
      </Breadcrumb>
      <Typography.Title
        style={{
          fontSize: 24,
          marginTop: 40,
        }}
      >
        Tạo mới hội đồng chấm đồ án
      </Typography.Title>

      <AddForm />
    </div>
  );
};

export default AddExaminationCouncil;
