import React from "react";
import SidebarAdmin from "../common/sidebar/sidebar";
import HeaderAdmin from "../common/header/index";
import BreadCrumbAdmin from "../common/breadcrumb/breadcrumb_admin";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Content, Footer } = Layout;

const AdminLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }} theme="light">
      <HeaderAdmin />
      <Layout className="site-layout" style={{ backgroundColor: "#fff" }}>
        <SidebarAdmin />
        <Layout style={{ backgroundColor: "#fff" }}>
          <Content style={{ margin: "0 16px" }}>
            <BreadCrumbAdmin />
            <div
              className="site-layout-background"
              style={{
                minHeight: 360
              }}
            >
              <Outlet />
            </div>
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

export default AdminLayout;
