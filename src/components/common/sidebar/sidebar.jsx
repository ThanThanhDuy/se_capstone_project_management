import React, { useEffect } from "react";
import { TeamOutlined, AuditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { CAPSTONE_TEAM_URL, CAPSTONE_COUNCIL_URL } from "../../../constant/url";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("1");

  const handleSelectItem = e => {
    setCurrent(e.key);
  };

  let location = useLocation();

  useEffect(() => {
    if (location.pathname.includes(CAPSTONE_TEAM_URL)) {
      setCurrent("1");
    } else if (location.pathname.includes(CAPSTONE_COUNCIL_URL)) {
      setCurrent("2");
    } else if (location.pathname.includes("profile")) {
      setCurrent("3");
    }
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
          <TeamOutlined />
          <span>Capstone Team</span>
          <Link to={CAPSTONE_TEAM_URL} />
        </Menu.Item>
        <Menu.Item key="2" style={{ height: 64, fontSize: 16, margin: 0 }}>
          <AuditOutlined />
          <span>Capstone Council</span>
          <Link to={CAPSTONE_COUNCIL_URL} />
        </Menu.Item>
        <Menu.Item key="3" style={{ height: 64, fontSize: 16, margin: 0 }}>
          <TeamOutlined />
          <span>Profile</span>
          <Link to="profile" />
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
export default Sidebar;
