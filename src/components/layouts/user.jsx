import React from "react";
import HeaderAdmin from "../common/header/index";
import { Layout } from "antd";
import UserSidebar from "../common/user_sidebar";
import { Outlet } from "react-router-dom";
const { Content, Footer } = Layout;

const UserLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }} theme="light">
      <HeaderAdmin />
      <Layout className="site-layout" style={{ backgroundColor: "#fff" }}>
        <UserSidebar />
        <Layout style={{ backgroundColor: "#fff" }}>
          <Content style={{ margin: "0 16px" }}>
            <Outlet />
          </Content>
          <Footer
            style={{
              textAlign: "center"
            }}
          >
            FPT University HCM ©2022 Created by Group 2 SWP
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default UserLayout;
