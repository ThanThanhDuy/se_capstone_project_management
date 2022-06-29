import React from "react";
import SidebarAdmin from "../common/sidebar/sidebar";
import HeaderAdmin from "../common/header/index";
import BreadCrumbAdmin from "../common/breadcrumb/breadcrumb_admin";
import { Layout, Spin } from "antd";
import { Outlet } from "react-router-dom";
import { userLogoutState } from "../../../store/user/user";
import { useRecoilValue } from "recoil";

const { Content, Footer } = Layout;

const AdminLayout = () => {
  const loading = useRecoilValue(userLogoutState);
  return (
    <Spin spinning={loading} delay={100}>
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
    </Spin>
  );
};

export default AdminLayout;
