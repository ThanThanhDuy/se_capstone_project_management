import React from "react";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import { userAuthState } from "../../../store/user/user";
import { useRecoilValue } from "recoil";
import moment from "moment";
import { Helmet } from "react-helmet";

function Profile() {
  const { User } = useRecoilValue(userAuthState);
  console.log(User);
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile</title>
      </Helmet>
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
              {User.Name}
            </span>
            <span>{User.Code}</span>
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
          <span style={{ fontWeight: 500, color: "#000" }}>
            {User.Gender ? "Male" : "Female"}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 15
          }}
        >
          <span style={{ color: "#707070" }}>Email</span>
          <span style={{ fontWeight: 500, color: "#000" }}>{User.Email}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 15
          }}
        >
          <span style={{ color: "#707070" }}>Phone</span>
          <span style={{ fontWeight: 500, color: "#000" }}>{User.Phone}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 15
          }}
        >
          <span style={{ color: "#707070" }}>Birthday</span>
          <span style={{ fontWeight: 500, color: "#000" }}>
            {moment(User.Birthday).format("YYYY - MMM - DD")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
