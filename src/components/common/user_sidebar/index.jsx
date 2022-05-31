import React from "react";
import { TeamOutlined, AuditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { HOME_URL } from "../../../constant/url";

const { Sider } = Layout;

const UserSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      style={{
        width: "100%",
      }}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      theme="light"
    >
      <div className="logo" />
      <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item
          key="1"
          style={{
            height: 64,
            fontSize: 16,
            margin: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <TeamOutlined />
          <span>Home</span>
          <Link to={"/user" + HOME_URL} />
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
export default UserSidebar;
