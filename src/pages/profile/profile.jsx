import React from "react";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";

function Profile() {
  return (
    <div
      style={{
        padding: 20,
        display: "flex",
        justifyContent: "center",
        fontSize: 16,
        height: "80vh",
        alignItems: "flex-start"
      }}
    >
      <div
        style={{
          width: 600
        }}
      >
        <div style={{ display: "flex", marginBottom: 30 }}>
          <Avatar size={52} icon={<UserOutlined />} />
          <div
            style={{ display: "flex", flexDirection: "column", marginLeft: 15 }}
          >
            <span
              style={{
                fontSize: 18,
                marginRight: 5,
                fontWeight: 500
              }}
            >
              Nguyễn Đăng Khoa
            </span>
            <span>SE140977</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 15
          }}
        >
          <span style={{ color: "#707070" }}>Gender</span>
          <span style={{ fontWeight: 500, color: "#000" }}>Male</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 15
          }}
        >
          <span style={{ color: "#707070" }}>Email</span>
          <span style={{ fontWeight: 500, color: "#000" }}>
            nguyendangkhoase140977@fpt.edu.vn
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 15
          }}
        >
          <span style={{ color: "#707070" }}>Phone</span>
          <span style={{ fontWeight: 500, color: "#000" }}>0999999999</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 15
          }}
        >
          <span style={{ color: "#707070" }}>Birthday</span>
          <span style={{ fontWeight: 500, color: "#000" }}>2000 - 01 - 01</span>
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <Button type="primary" icon={<EditOutlined />}>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
