import React, { useEffect } from "react";
import { UserOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Divider, Layout, Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CAPSTONE_TEAM_URL, CAPSTONE_COUNCIL_URL } from "../../../constant/url";
import { useSetRecoilState } from "recoil";
import { locationState } from "../../../../store/location/location";
import "./index.css";
import { userLogoutState } from "../../../../store/user/user";
const { Sider } = Layout;

const Sidebar = () => {
  let navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("1");
  const setLocation = useSetRecoilState(locationState);
  const handleSelectItem = e => {
    setCurrent(e.key);
  };
  const setUserLogout = useSetRecoilState(userLogoutState);
  let location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("home")) {
      setCurrent("1");
    } else if (location.pathname.includes("profile")) {
      setCurrent("2");
    }
    setLocation(location);
  }, [location]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
      theme="light"
    >
      <div className="logo" />
      <Menu
        theme="light"
        mode="inline"
        onClick={handleSelectItem}
        selectedKeys={current}
      >
        <Menu.Item
          key="1"
          style={{
            height: 64,
            fontSize: 16,
            margin: 0,
            display: "flex",
            alignItems: "center"
          }}
        >
          <HomeOutlined />
          <span>Home</span>
          <Link to="home" />
        </Menu.Item>
        <Menu.Item key="2" style={{ height: 64, fontSize: 16, margin: 0 }}>
          <UserOutlined />
          <span>Profile</span>
          <Link to="profile" />
        </Menu.Item>
        <Divider />
        <Menu.Item
          className="log_out"
          style={{ height: 64, fontSize: 16, margin: 0 }}
          onClick={() => {
            setUserLogout(true);
            localStorage.removeItem("data");
            localStorage.removeItem("roleTopic");
            setTimeout(() => {
              setUserLogout(false);
              navigate("/");
            }, 2000);
          }}
        >
          <LogoutOutlined style={{ color: "#d4380d" }} />
          <span style={{ color: "#d4380d" }}>Log Out</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
export default Sidebar;
