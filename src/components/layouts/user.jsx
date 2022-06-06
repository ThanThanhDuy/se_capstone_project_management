import React from "react";
import HeaderAdmin from "../common/header/index";
import { Layout } from "antd";
import UserSidebar from "../common/user_sidebar";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { HOME_URL, REPORT_URL } from "../../constant/url";
import Home from "../../pages/home/";
import UserReport from "../../pages/report/user_report";
const { Content } = Layout;

const UserLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }} theme="light">
      <HeaderAdmin />
      <Layout className="site-layout" style={{ backgroundColor: "#fff" }}>
        <UserSidebar />
        <Content style={{ margin: "0 16px" }}>
          <Outlet />
          {/* <Routes>
            <Route path={HOME_URL} element={<Home />} />
            <Route path={REPORT_URL} element={<UserReport />} />
            <Route path="*" element={<Navigate to="home" replace />} />
          </Routes> */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout;
