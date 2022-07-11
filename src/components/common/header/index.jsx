import React from "react";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Avatar, Popover, Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/logo_fpt.png";
const { Header } = Layout;
import "./index.scss";
import { useSetRecoilState } from "recoil";
import { userLogoutState } from "../../../../store/user/user";
import checkURL from "../../../utils/checkURL/checkURL";
const HeaderAdmin = () => {
  let navigate = useNavigate();
  const setUserLogout = useSetRecoilState(userLogoutState);
  const userAuth = JSON.parse(localStorage.getItem("data"));
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: "0 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        borderBottom: "2px solid #e8e8e8",
      }}
    >
      <div>
        {location.pathname.includes("admin") ? (
          <Link to="/admin/capstone-team">
            <img src={logo} style={{ width: 100 }} alt="logo_fpt" />
          </Link>
        ) : (
          <Link to="/user/home">
            <img src={logo} style={{ width: 100 }} alt="logo_fpt" />
          </Link>
        )}
      </div>

      <div style={{ cursor: "pointer" }}>
        <span
          style={{
            color: "#000",
            marginRight: 15,
            fontSize: 16,
          }}
        >
          Support
        </span>
        <span
          style={{
            color: "#000",
            marginRight: 15,
            fontSize: 16,
          }}
        >
          User Guide
        </span>
        <Popover
          content={
            <div style={{ padding: "0 10px", width: 350 }}>
              {location.pathname.includes("admin") ? (
                <Link className="link_profile" to="/admin/profile">
                  <Avatar
                    size="medium"
                    style={{ backgroundColor: "#000" }}
                    icon={<UserOutlined />}
                  />

                  {userAuth ? userAuth.User.Email.toUpperCase() : ""}
                </Link>
              ) : (
                <Link className="link_profile" to="/user/profile">
                  <Avatar
                    size="medium"
                    style={{ backgroundColor: "#000" }}
                    icon={<UserOutlined />}
                  />
                  {userAuth ? userAuth.User.Email.toUpperCase() : ""}
                </Link>
              )}
              <Divider style={{ margin: 15 }} />
              <a
                onClick={() => {
                  setUserLogout(true);
                  localStorage.removeItem("roleTopic");
                  setTimeout(() => {
                    localStorage.removeItem("data");
                    setUserLogout(false);
                    navigate("/");
                  }, 2000);
                }}
                className="link_profile"
                style={{ color: "#d4380d", fontSize: 16, fontWeight: 500 }}
              >
                <LogoutOutlined />
                {"Log out".toUpperCase()}
              </a>
            </div>
          }
        >
          <Avatar
            size="large"
            style={{ backgroundColor: "#000" }}
            icon={<UserOutlined />}
          />
        </Popover>
      </div>
    </Header>
  );
};
export default HeaderAdmin;
