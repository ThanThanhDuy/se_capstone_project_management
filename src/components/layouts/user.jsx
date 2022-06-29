import React from "react";
import HeaderAdmin from "../common/header/index";
import { Layout, Spin } from "antd";
import UserSidebar from "../common/user_sidebar";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userLogoutState } from "../../../store/user/user";
const { Content, Footer } = Layout;

const UserLayout = () => {
  const loading = useRecoilValue(userLogoutState);
  return (
    <Spin spinning={loading} delay={100}>
      <Layout style={{ minHeight: "100vh" }} theme="light">
        <HeaderAdmin />
        <Layout className="site-layout" style={{ backgroundColor: "#fff" }}>
          <UserSidebar />
          <Layout style={{ backgroundColor: "#fff" }}>
            <Content style={{ margin: "0 16px", padding: "10px 10px 0 10px" }}>
              <Outlet />
            </Content>
            <Footer
              style={{
                height: 45,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
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

export default UserLayout;
