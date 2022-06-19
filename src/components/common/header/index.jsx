import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Avatar, Popover } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAuthState } from "../../../../store/user/user";

const { Header } = Layout;
const Content = (
  <div style={{ padding: "0 10px" }}>
    {location.pathname.includes("admin") ? (
      <Link
        style={{ display: "block", marginBottom: 10, fontSize: 16 }}
        to="/admin/profile"
      >
        View Profile
      </Link>
    ) : (
      <Link
        style={{ display: "block", marginBottom: 10, fontSize: 16 }}
        to="/user/profile"
      >
        View Profile
      </Link>
    )}

    <a href="" style={{ color: "#d4380d", fontSize: 16 }}>
      Log out
    </a>
  </div>
);

const HeaderAdmin = () => {
  const userAuth = useRecoilValue(userAuthState);
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: "0 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#00796a"
      }}
    >
      <div>
        <span style={{ color: "#fff", fontSize: 28 }}>
          FAP - FPT University
        </span>
      </div>
      <div style={{ cursor: "pointer" }}>
        <Popover content={Content}>
          <span style={{ color: "#fff", marginRight: 10, fontSize: 16 }}>
            {userAuth.User.Name}
          </span>
          <Avatar size="large" icon={<UserOutlined />} />
        </Popover>
      </div>
    </Header>
  );
};
export default HeaderAdmin;
